"use client"

import * as React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const JoinRoom = () => {
    return (
        <Card className="w-[500px] h-[450px] bg-black shadow-lg rounded-4xl p-6 flex flex-col relative">
            <CardHeader className="p-0 mb-4 mt-5 text-center w-full">
                <CardTitle className="text-white text-2xl font-semibold">
                    Join a Room
                </CardTitle>
                <CardDescription className="mt-6 text-2xl text-white font-semibold">
                    Enter Your RoomID
                </CardDescription>
                <CardContent>
                    <input type="text"
                    className=" mt-15 w-[300px] h-[50px] rounded-full bg-gray-200 text-black px-4 text-lg outline-none focus:ring-2 focus:ring-gray-400">
                    </input>
                    <br/><br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <motion.button 
                        whileTap={{ scale: 0.95, x: -5}}
                        whileHover={{ scale: 1.09, x:-5 }}
                        transition={{ type: "spring", stiffness: 500, damping: 12}}
                        className="w-[110px] h-[50px] rounded-4xl text-white bg-red-800 cursor-pointer font-semibold ml-80">
                        Join Room
                    </motion.button>
                </CardContent>
            </CardHeader>
        </Card>
    )
}