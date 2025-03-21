"use client";

import * as React from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Send, Copy, LogOut } from "lucide-react";
import { io, Socket } from "socket.io-client";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Toaster } from "../ui/sonner";

// 🔥 Global Socket Instance (Singleton)
const socket = io("http://localhost:8080", { autoConnect: false });

export const ChatUI = () => {
  const router = useRouter();
  const [isCopied, setIsCopied] = React.useState(false);
  const [messages, setMessages] = React.useState<Array<{ message: string }>>([]);
  const [newMessage, setNewMessage] = React.useState<string>("");
  const [roomname, setRoomname] = React.useState<string>("");
  const searchParams = useSearchParams();
  const roomCode = searchParams.get("room");

  React.useEffect(() => {
    if (!socket.connected) socket.connect(); 

    socket.on("roomMessage", (room: { message: string }) => {
      setMessages((prev) => [...prev, room]);
    });

    socket.on("roomCreated", (data: { roomname: string }) => {
      setRoomname(data.roomname);
      console.log("Room name received:", data.roomname);
    });

    return () => {
      socket.off("roomMessage");
      socket.off("roomCreated");
    };
  }, []);

  const handleCopyRoomID = () => {
    if (!roomCode) {
      toast("Room ID is not available");
      return;
    }
    navigator.clipboard.writeText(roomCode);
    setIsCopied(true);
    toast("Room ID Copied Successfully");
    setTimeout(() => setIsCopied(false), 3000);
  };

  const handleMessageSend = () => {
    if (newMessage.trim()) {
      socket.emit("roomMessage", {
        message: newMessage,
        roomCode,
      });
      setMessages((prev) => [...prev, { message: newMessage }]);
      setNewMessage("");
    } else {
      toast("Message cannot be empty");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleMessageSend();
    }
  };

  const LeaveHandler = () => {
    router.push("/");
  };

  return (
    <>
      <Toaster />
      <Card className="w-[650px] h-[500px] bg-black shadow-lg rounded-xl p-4 flex flex-col relative text-white">
        <div className="flex justify-between items-center px-4 py-2">
          <Button
            className="bg-red-600 text-white px-4 py-1 rounded-lg text-sm font-semibold hover:cursor-pointer"
            onClick={LeaveHandler}
          >
            <LogOut size={16} className="inline-block mr-2" />
            Leave
          </Button>
          <CardTitle className="text-lg font-bold">{roomname}</CardTitle>
          <Button
            className="bg-red-600 text-white px-4 py-1 rounded-lg text-sm font-semibold hover:cursor-pointer"
            onClick={handleCopyRoomID}
          >
            <Copy size={16} className="inline-block mr-2" />
            Copy RoomID
          </Button>
        </div>
        <CardContent className="flex-1 overflow-auto p-4 my-2 bg-gray-900 rounded-lg">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 h-full flex items-center justify-center">
              No messages yet. Start a conversation!
            </div>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className="mb-2 p-2 rounded-lg bg-red-700 max-w-[80%] ml-auto"
              >
                <div className="text-xs font-bold mb-1">{msg.message}</div>
                <div>{msg.message}</div>
              </div>
            ))
          )}
        </CardContent>
        <div className="flex items-center p-4">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 h-[40px] rounded-full bg-gray-300 text-black px-4 text-sm outline-none"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Button
            className="ml-2 bg-red-600 text-white rounded-full p-3 hover:cursor-pointer"
            onClick={handleMessageSend}
          >
            <Send size={20} />
          </Button>
        </div>
      </Card>
    </>
  );
};
