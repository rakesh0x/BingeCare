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

const socket = io("http://localhost:8080");

export const JoinRoom = () => {
  const router = useRouter();
  const [roomId, setRoomId] = React.useState("");

  const handleJoinRoomEvent = () => {
    if (roomId.trim()) {
      socket.emit("join", { roomId });
      router.push("/chat");
    } else {
      alert("Please enter a valid Room ID");
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
            onClick={handleJoinRoomEvent}
          >
            Join Room
          </motion.button>
        </CardContent>
      </CardHeader>
    </Card>
  );
};