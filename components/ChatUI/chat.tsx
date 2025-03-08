"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Send, Copy, LogOut } from "lucide-react";
import { io } from "socket.io-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Toaster } from "../ui/sonner";

export const ChatUI = () => {
  const router = useRouter();
  const [socketId, setSocketId] = React.useState<string>("");
  const [isCopied, setIsCopied] = React.useState(false);
  const [newMessage, setNewMessage] = React.useState("");

  React.useEffect(() => {
    const socket = io("http://localhost:8080");

    socket.on("connect", () => {
      const socketid = socket.id
      if( socketid){
        setSocketId(socketid)
      }
      console.log("Connected with socket ID:", socket.id);
    });

    return () => {
      socket.disconnect(); 
    };
  }, []);

  const handleCopyRoomID = () => {
    try {
      if (socketId) {
        navigator.clipboard.writeText(socketId);
        setIsCopied(true);
        toast("Room ID Copied Successfully");

        setTimeout(() => {
          setIsCopied(false);
        }, 3000);
      }
    } catch (error) {
      console.error("Error copying the roomId:", error);
    }
  };

  const handleMessageSend = () => {
    const socket = io("http://localhost:8080");
    if (newMessage.trim() && socketId) {
      socket.emit("roomMessage", { message: newMessage, room: socketId });
      setNewMessage(""); 
    }
  };

  return (
    <Card className="w-[650px] h-[500px] bg-black shadow-lg rounded-xl p-4 flex flex-col relative text-white">
      <Toaster />
      <div className="flex justify-between items-center px-4 py-2">
        <Button className="bg-red-600 text-white px-4 py-1 rounded-lg text-sm font-semibold hover:cursor-pointer">
          <LogOut size={16} className="inline-block mr-2" /> Leave
        </Button>
        <CardTitle className="text-lg font-bold">Room ID: {socketId}</CardTitle>
        <Button
          className="bg-red-600 text-white px-4 py-1 rounded-lg text-sm font-semibold hover:cursor-pointer"
          onClick={handleCopyRoomID}
        >
          <Copy size={16} className="inline-block mr-2" /> Copy RoomID
        </Button>
      </div>
      <CardContent className="flex-1 overflow-auto p-4"></CardContent>
      <div className="flex items-center p-4">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 h-[40px] rounded-full bg-gray-300 text-black px-4 text-sm outline-none"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <Button
          className="ml-2 bg-red-600 text-white rounded-full p-3 hover:cursor-pointer"
          onClick={handleMessageSend}
        >
          <Send size={20} />
        </Button>
      </div>
    </Card>
  );
};
