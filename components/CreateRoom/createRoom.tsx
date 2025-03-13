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
import { io, Socket } from "socket.io-client";


interface RoomData {
  roomname: string
}

export const CreateRoom = () => {
  const router = useRouter();
  const [roomname, setRoomName] = React.useState("");
  const [socketId, setSocketId] = React.useState<string>();
  const [ socket, setSocket ] = React.useState<Socket | null>(null);

  React.useEffect(() => {
    const socket = io("http://localhost:8080");
    setSocket(socket);  

    socket.on("connect", () => {
      setSocketId(socket.id);
      console.log("Connected to socket", socket.id);
    });

    socket.on("roomCreated", ({roomname, socketId}) => {
      console.log("Room created successfully with event", `${socketId} ${roomname}`);
      router.push(`/chat/${roomname}`);
    });

    socket.on("join", (data: RoomData) => {
      console.log("Join event received", data);
    });

    return () => {
      socket.off("roomCreated");
      socket.off("connect");
      socket.off("join");
      socket.disconnect();
    };
  }, []);


  const handleRoomEvent = () => {
    if ( roomname.trim() && socket ) {
      console.log("Sending room creation request...");
      socket.emit("create", { roomname }); 
    } else {
      alert("Please enter your username and room name");
    }

  };

  return (
    <Card className="w-[500px] h-[450px] bg-black shadow-lg rounded-4xl p-6 flex flex-col relative">
      <CardHeader className="p-0 mb-4 mt-5 text-center w-full">
        <button
          className="rounded-xl w-[20px] h-[30px] bg-black hover:cursor-pointer flex items-center"
          onClick={() => router.back()} 
        >
          <ArrowLeft size={16} />
        </button>
        <CardTitle className="text-white text-2xl font-semibold">
          Create a Room
        </CardTitle>
        <CardDescription className="mt-6 text-xl text-white font-semibold">
          Username
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <input
          type="text"
          placeholder="Enter Username"
          className="mt-3 w-[300px] h-[40px] rounded-full bg-gray-200 text-black px-4 text-lg outline-none focus:ring-2 focus:ring-gray-400"
        />
        
        <div className="mt-8 text-xl text-white font-semibold">
          Enter Room Name
        </div>
        <input
          type="text"
          placeholder="Enter Room Name"
          onChange={(e) => setRoomName(e.target.value)}
          value={roomname}
          className="mt-5 w-[300px] h-[40px] rounded-full bg-gray-200 text-black px-4 text-lg outline-none focus:ring-2 focus:ring-gray-400"
        />

        <motion.button
          whileTap={{ scale: 0.95, x: -5 }}
          whileHover={{ scale: 1.09, x: -5 }}
          transition={{ type: "spring", stiffness: 500, damping: 12 }}
          className="w-[110px] h-[50px] rounded-4xl text-white bg-red-800 cursor-pointer font-semibold mt-9"
          onClick={handleRoomEvent}
        >
          Enter Room
        </motion.button>
      </CardContent>
    </Card>
  );
};
