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

export const CardWithForm = () => {
  const router = useRouter();

  return (
    <Card className="w-[500px] bg-black shadow-lg rounded-3xl p-6 h-[450px] flex flex-col">
      <CardHeader className="p-0 mb-4 text-center w-full">
        <CardTitle className="text-white text-2xl font-bold">
          Join or Create Room
        </CardTitle>
        <CardDescription className="text-lg text-white font-bold mt-2">
          Connect with your Friends Seamlessly
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col space-y-4 flex-grow justify-center">
        <motion.button
          whileTap={{ scale: 0.95, x: -5 }}
          whileHover={{ scale: 1.09, x: -5 }}
          transition={{ type: "spring", stiffness: 500, damping: 12 }}
          className="rounded-full text-xl font-semibold bg-white text-black py-3 hover:bg-red-500 transition-colors hover:cursor-pointer shadow-md w-full"
          onClick={() => router.push("/join")} 
        >
          Join a Room
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95, x: -5 }}
          whileHover={{ scale: 1.09, x: -5 }}
          transition={{ type: "spring", stiffness: 500, damping: 12 }}
          className="rounded-full text-xl font-semibold bg-white text-black py-3 hover:bg-red-500 transition-colors hover:cursor-pointer shadow-md w-full"
          onClick={() => router.push("/create")}
        >
          Create a Room
        </motion.button>
      </CardContent>
    </Card>
  );
};
