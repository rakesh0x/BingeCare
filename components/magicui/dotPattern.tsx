"use client";

import { cn } from "../../lib/utils";
import { DotPattern } from "../magicui/dot-pattern";

export function DotPatternDemo({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background bg-black">
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
        )}
      />
      <div className="relative z-10 w-full">{children}</div> 
    </div>
  );
} 
