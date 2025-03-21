"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { io } from "socket.io-client";
import { Socket } from "socket.io-client";

export const JoinRoom = () => {
  const router = useRouter();
  const [roomId, setRoomId] = React.useState("");
  const socketRef = React.useRef<Socket | null>(null);
  const [ roomname, setRoomName ] = React.useState('')

  React.useEffect(() => {
    socketRef.current = io("http://localhost:8080");
    const socket = socketRef.current;

    // Connect event handler
    socket.on("connect", () => {
      if (roomId) {
        socket.emit("join", { data: JSON.stringify({ roomId }) });
      }
    });

    socket.on("joined-room", (data) => {
      console.log("Joined the room with roomname", data);
      // Handle successful join here
    });

    socket.on("error", (error) => {
      console.error("Socket error:", error);
      // Handle error here
    });

    return () => {
      if (socket) {
        socket.off("connect");
        socket.off("joined-room");
        socket.off("error");
        socket.disconnect();
      }
    };
  }, [roomId]);

  const handleJoinRoom = () => {
    if (roomId && socketRef.current) {
      const socket = socketRef.current;
      
      socket.emit("join", { data: { roomId } });
      console.log("Sent join request to socket", roomId);
      router.push(`/chat?room=${roomId}`);
    }
  };

  return (
    <Card className="w-[500px] h-[450px] bg-black shadow-lg rounded-4xl p-6 flex flex-col relative">
      <CardHeader className="p-0 mb-4 mt-5 text-center w-full">
        <button
          className="rounded-xl w-[20px] h-[30px] bg-black hover:cursor-pointer flex"
          onClick={() => router.back()}
        >
          <ArrowLeft size={16} className="text-white" />
        </button>
        <CardTitle className="text-white text-2xl font-semibold mt-4">
          Join a Room
        </CardTitle>
        <CardDescription className="mt-6 text-xl text-white font-semibold">
          Enter Your Room ID
        </CardDescription>
        <CardContent className="p-0">
          <input
            type="text"
            value={roomname}
            onChange={(e) => setRoomName(e.target.value)}
            className="mt-12 w-[300px] h-[50px] rounded-full bg-gray-200 text-black px-4 text-lg outline-none focus:ring-2 focus:ring-gray-400"
            placeholder="Roomname to Join"
          />
          <br/>
          <br/>
          <input
            type="text"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="mt-12 w-[300px] h-[50px] rounded-full bg-gray-200 text-black px-4 text-lg outline-none focus:ring-2 focus:ring-gray-400"
            placeholder="Room ID"
          />
          <motion.button
            whileTap={{ scale: 0.95, x: -5 }}
            whileHover={{ scale: 1.09, x: -5 }}
            transition={{ type: "spring", stiffness: 500, damping: 12 }}
            className="w-[110px] h-[50px] rounded-4xl text-white bg-red-800 cursor-pointer font-semibold ml-80 mt-9"
            onClick={handleJoinRoom}
          >
            Join Room
          </motion.button>
        </CardContent>
      </CardHeader>
    </Card>
  );
};