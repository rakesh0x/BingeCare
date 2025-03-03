import Image from "next/image";

export const Grid = () => {
  return (
    <div className="bg-black h-screen w-screen flex items-center justify-center relative overflow-hidden">
      <Image
        src="/assets/Grid.png"
        alt="Grid Image"
        layout="fill" 
        objectFit="cover"
        quality={100}
      />
    </div>
  );
};
