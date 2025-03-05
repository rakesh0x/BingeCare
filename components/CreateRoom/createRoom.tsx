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
import { useRouter } from "next/navigation";

export const CreateRoom = () => {
    const router = useRouter();
    return (
        <Card className="w-[500px] h-[450px] bg-black shadow-lg rounded-4xl p-6 flex flex-col relative">
            <CardHeader className="p-0 mb-4 mt-5 text-center w-full">
                <CardTitle className="text-white text-2xl font-semibold">
                    Create a Room
                </CardTitle>
                <CardDescription className="mt-6 text-xl text-white font-semibold">
                    Enter Your Name
                </CardDescription>
                <CardContent>
                    <input type="text"
                    className=" mt-3 w-[300px] h-[40px] rounded-full bg-gray-200 text-black px-4 text-lg outline-none focus:ring-2 focus:ring-gray-400">
                    </input>
                 
                    <div className="mt-8 text-  xl text-white font-semibold">
                        Enter Room Name
                    </div>
                    <input type="text"
                    className=" mt-5 w-[300px] h-[40px] rounded-full bg-gray-200 text-black px-4 text-lg outline-none focus:ring-2 focus:ring-gray-400">
                    </input>
                    <motion.button 
                        whileTap={{ scale: 0.95, x: -5}}
                        whileHover={{ scale: 1.09, x:-5 }}
                        transition={{ type: "spring", stiffness: 500, damping: 12}}
                        className="w-[110px] h-[50px] rounded-4xl text-white bg-red-800 cursor-pointer font-semibold ml-80 mt-9"
                        onClick={() => router.push('/chat')}
                    >
                        Enter Room
                    </motion.button>
                </CardContent>
            </CardHeader>
        </Card>
    )
}