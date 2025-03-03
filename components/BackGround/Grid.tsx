import Image from "next/image";
import { CardWithForm } from "../Landing/Container" 

export const Grid = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-black h-screen w-screen flex items-center justify-center relative overflow-hidden">
      <Image
        src="/assets/Grid.png"
        alt="Grid Image"
        layout="fill"
        objectFit="cover"
        quality={100}
      />
      <div className="absolute flex justify-center items-center w-full h-full">
        <CardWithForm>{children}</CardWithForm>
      </div>
    </div>
  );
};