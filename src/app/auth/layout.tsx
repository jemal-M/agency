import React, { ReactNode } from "react";
import Image from "next/image";
import { ToastProvider } from "@radix-ui/react-toast";
interface LayoutProps {
  readonly children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <main>
      <div className="container relative h-screen mt-24 flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-white p-10 text-white lg:flex">
          <Image 
          width={500}
           height={400} 
           alt="" 
           src='/images/banner.jpg'
          />
        </div>
        <div className="flex h-full lg:p-8">{children}</div>
      </div>
    </main>
  );
}
