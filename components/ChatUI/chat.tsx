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
import { useRouter } from "next/navigation";
import { toast } from "sonner"
import { Toaster } from "../ui/sonner";

interface types {
  socketId: string
}

const socket = io("http://localhost:8080"); 
export const ChatUI = () => {
  const router = useRouter();
  const [ socketId, setsocketId ] = React.useState<string>("")
  const [ isCopied, setisCopied ] = React.useState(false)
  const [ newMessage, setnewMessage ] = React.useState("")

  const CopyButtonComp = (textToCopy:any) => {
    try{
      const socketid = socket.id
      if( socketid ) {
        setsocketId(socketId)
      }
      navigator.clipboard.writeText(textToCopy)
      setisCopied(true)
      toast("RoomId Copying Successful")
      setTimeout(() => {
        setisCopied(false)
      }, 3000);
    } catch(error){
      console.error("error copying the roomId");
    }

    const MessageHandler = () => {
      const socketId = socket.id
      socket.emit("roomMessage", { message: newMessage, room: socketId })
    }
  }

  return (
    <Card className="w-[650px] h-[500px] bg-black shadow-lg rounded-xl p-4 flex flex-col relative text-white">
    <Toaster/>
      <div className="flex justify-between items-center px-4 py-2 ">
        <Button className="bg-red-600 text-white px-4 py-1 rounded-lg text-sm font-semibold hover:cursor-pointer">
          <LogOut size={16} className="inline-block mr-2"/>Leave
        </Button>
        <CardTitle className="text-lg font-bold">Room Name</CardTitle>
        <Button className="bg-red-600 text-white px-4 py-1 rounded-lg text-sm font-semibold hover:cursor-pointer "
        onClick={CopyButtonComp}
        >
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
          onInput={(e) => setnewMessage(newMessage)}
        />
        <Button className="ml-2 bg-red-600 text-white rounded-full p-3 hover:cursor-pointer ">
          <Send size={20} />
        </Button>
      </div>
    </Card>
  );
};