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
        <Card className="w-[500px] bg-black shadow-lg rounded-3xl p-6 h-[450] flex flex-col relative">
            <CardHeader className="p-0 mb-4 text-center w-full">
                <CardTitle className="text-white text-2xl font-semibold">
                    Join a Room
                </CardTitle>
            </CardHeader>
        </Card>
    )
}