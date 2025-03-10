"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Send, Copy, LogOut } from "lucide-react";
import { io, Socket } from "socket.io-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Toaster } from "../ui/sonner";

// Define types for messages and events
interface Message {
  room: string;
  message: string;
  sender: string;
  timestamp?: string;
  isOwnMessage?: boolean;
}

interface RoomUsers {
  room: string;
  users: string[];
}

interface RoomCreated {
  room: string;
  roomId: string;
}

interface UserJoined {
  room: string;
  user: string;
}

// Define server to client events
interface ServerToClientEvents {
  connect: () => void;
  disconnect: () => void;
  roomMessage: (data: Message) => void;
  error: (message: string) => void;
  roomUsers: (data: RoomUsers) => void;
  roomCreated: (data: RoomCreated) => void;
  roomList: (rooms: string[]) => void;
  userJoined: (data: UserJoined | string) => void;
  userLeft: (username: string) => void;
  userLeftRoom: (data: UserJoined) => void;
}

// Define client to server events
interface ClientToServerEvents {
  join: (data: { roomname: string }) => void;
  create: (roomname: string) => void;
  getRooms: () => void;
  roomMessage: (data: { message: string; room: string }) => void;
  leaveRoom: (roomname: string) => void;
}

export const ChatUI: React.FC = () => {
  const router = useRouter();
  const [socket, setSocket] = React.useState<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null);
  const [socketId, setSocketId] = React.useState<string>("");
  const [isCopied, setIsCopied] = React.useState<boolean>(false);
  const [newMessage, setNewMessage] = React.useState<string>("");
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [roomname, setRoomName] = React.useState<string>("");
  const [username, setUsername] = React.useState<string>("");
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages
  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  React.useEffect(() => {
    // Get username and roomname from localStorage or query params
    const storedUsername = localStorage.getItem("username") || "";
    const storedRoomname = localStorage.getItem("roomname") || "";
    
    setUsername(storedUsername);
    setRoomName(storedRoomname);
    
    // Initialize socket connection
    const newSocket: Socket<ServerToClientEvents, ClientToServerEvents> = io("http://localhost:8080", {
      query: { username: storedUsername }
    });
    
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected with socket ID:", newSocket.id);
      setSocketId(newSocket.id);
      
      // Join the room if roomname exists
      if (storedRoomname) {
        newSocket.emit("join", { roomname: storedRoomname });
      }
    });

    // Listen for incoming messages
    newSocket.on("roomMessage", (data: Message) => {
      setMessages(prev => [...prev, data]);
    });

    // Handle errors
    newSocket.on("error", (error: string) => {
      toast.error(error);
    });

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, []);

  const handleCopyRoomID = (): void => {
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
      toast.error("Failed to copy Room ID");
    }
  };

  const handleMessageSend = (): void => {
    if (newMessage.trim() && socket && roomname) {
      socket.emit("roomMessage", { 
        message: newMessage, 
        room: roomname
      });
      
      // Add message to local state immediately for better UX
      setMessages(prev => [...prev, {
        room: roomname,
        message: newMessage,
        sender: username,
        isOwnMessage: true
      }]);
      
      setNewMessage("");
    } else if (!roomname) {
      toast.error("No room selected");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleMessageSend();
    }
  };

  const handleLeave = (): void => {
    if (socket && roomname) {
      socket.emit("leaveRoom", roomname);
      
      // Remove room info from localStorage when leaving
      localStorage.removeItem("roomname");
    }
    router.push("/");
  };

  return (
    <Card className="w-[650px] h-[500px] bg-black shadow-lg rounded-xl p-4 flex flex-col relative text-white">
      <Toaster />
      <div className="flex justify-between items-center px-4 py-2">
        <Button 
          className="bg-red-600 text-white px-4 py-1 rounded-lg text-sm font-semibold hover:cursor-pointer"
          onClick={handleLeave}
        >
          <LogOut size={16} className="inline-block mr-2"/>Leave
        </Button>
        <CardTitle className="text-lg font-bold">
          {roomname || "No Room Selected"}
        </CardTitle>
        <Button
          className="bg-red-600 text-white px-4 py-1 rounded-lg text-sm font-semibold hover:cursor-pointer"
          onClick={handleCopyRoomID}
          disabled={!socketId}
        >
          <Copy size={16} className="inline-block mr-2" />Copy RoomID
        </Button>
      </div>
      <CardContent className="flex-1 overflow-auto p-4 space-y-2">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map((msg, index) => (
            <div 
              key={index} 
              className={`p-2 rounded-lg max-w-[80%] ${msg.sender === username || msg.isOwnMessage ? 'bg-red-600 ml-auto' : 'bg-gray-700 mr-auto'}`}
            >
              <div className="text-xs font-semibold">{msg.sender}</div>
              <div className="text-sm break-words">{msg.message}</div>
              {msg.timestamp && (
                <div className="text-xs text-gray-300 mt-1">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </div>
              )}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </CardContent>
      <div className="flex items-center p-4">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 h-[40px] rounded-full bg-gray-300 text-black px-4 text-sm outline-none"
          value={newMessage}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={!socket || !roomname}
        />
        <Button
          className="ml-2 bg-red-600 text-white rounded-full p-3 hover:cursor-pointer"
          onClick={handleMessageSend}
          disabled={!socket || !roomname || !newMessage.trim()}
        >
          <Send size={20} />
        </Button>
      </div>
    </Card>
  );
};