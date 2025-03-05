import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const CardWithForm = () => {
  return (
    <Card className="w-[500px] bg-black shadow-lg rounded-3xl p-6 h-[450px] flex flex-col ">
      <CardHeader className="p-0 mb-4 text-center w-full">
        <CardTitle className="text-white text-2xl font-bold">
          Join or Create Room
        </CardTitle>
        <CardDescription className="text-lg text-white font-bold mt-2 ">
          Connect with your Girlfriends Seamlessly
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col space-y-4 flex-grow justify-center">
        <button className="rounded-full text-xl font-semibold bg-white text-black py-3 hover:bg-gray-200 transition-colors">
          Join a Room
        </button>
        <button className="rounded-full text-xl font-semibold bg-white text-black py-3 hover:bg-gray-200 transition-colors">
          Create a Room
        </button>
      </CardContent>
    </Card>
  );
};