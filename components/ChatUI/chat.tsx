"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Send, Copy, LogOut } from "lucide-react";
import { io } from "socket.io-client"
import { useRouter } from "next/router";

const socket = io("http://localhost:8080"); 

export const ChatUI = () => {
  const router = useRouter();
  return (
    <Card className="w-[650px] h-[500px] bg-black shadow-lg rounded-xl p-4 flex flex-col relative text-white">
      <div className="flex justify-between items-center px-4 py-2 ">
        <Button className="bg-red-600 text-white px-4 py-1 rounded-lg text-sm font-semibold hover:cursor-pointer">
          <LogOut size={16} className="inline-block mr-2"/>Leave
        </Button>
        <CardTitle className="text-lg font-bold">Room Name</CardTitle>
        <Button className="bg-red-600 text-white px-4 py-1 rounded-lg text-sm font-semibold hover:cursor-pointer ">
          <Copy size={16} className="inline-block mr-2"

          /> Copy RoomID
        </Button>
      </div>

      <CardContent className="flex-1 overflow-auto p-4"></CardContent>

      <div className="flex items-center p-4">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 h-[40px] rounded-full bg-gray-300 text-black px-4 text-sm outline-none"
          onChange={(e) => }
        />
        <Button className="ml-2 bg-red-600 text-white rounded-full p-3 hover:cursor-pointer ">
          <Send size={20} />
        </Button>
      </div>
    </Card>
  );
};