"use client";

import React from "react";

import Link from "next/link";

import LoginForm from "./components/LoginForm";
import Image from "next/image";
import { Fullscreen } from "lucide-react";
export default function page() {
  return (
    <div className=" ">


      <LoginForm />
      <p className="px-8 text-center text-sm text-muted-foreground">
        By clicking continue, you agree to our{" "}
        <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
          Privacy Policy
        </Link>
      </p>
    </div>
  );
}
