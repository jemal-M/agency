"use client";

import React, { useState, useEffect } from "react";
import { LoaderCircle } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { loginRequest, resetloginState } from "@/lib/reducers/authreducer";
import { Login } from "@/types/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function LoginForm() {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.auth.status);
  const error = useAppSelector((state) => state.auth.error);
  const { toast } = useToast()
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<Partial<Login>>({});
  // React Hook Form setup
  const form = useForm<Login>({
    defaultValues: {
      email_or_phone: "",
      password: "",
    },
  });

  // Handle form submission
  const onSubmit: SubmitHandler<Login> = async (data) => {
    setIsLoading(true); // Set loading state
    // Dispatch login request with the form data
    try {
      dispatch(loginRequest(data));
    } catch (err) {
      console.error("Login failed:", err);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };
  // Watch the status and error from the Redux store to show appropriate feedback
  useEffect(() => {
    if (status === "Success") {
      router.push('/dashboard');
      toast({
        title: "Login successful",
        description: "You are now logged in.",
        style: {
          padding: '20px',
          backgroundColor: '#fffff'
        }
      });
      dispatch(resetloginState())
    } else if (status === "Failed") {
      toast({
        title: "Login failed",
        description: error.error.toString() || "Unknown error occurred", // Ensure error is populated
        variant: "destructive", // Make the toast red for errors
      });
    }
  }, [status, error]);


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email_or_phone"
          rules={{
            required: "Email or phone is required", // Use validation rules here
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email or Phone</FormLabel>
              <FormControl>
                <Input placeholder="Email or Phone" {...field} />
              </FormControl>
              <FormMessage>{form.formState.errors.email_or_phone?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          rules={{
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long",
            },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage>{form.formState.errors.password?.message}</FormMessage>
            </FormItem>
          )}
        />
        <Link href='/forgetPassword'>
        forget Password
        </Link>
        <Button disabled={(status == 'Loading')} className="w-full">
          {(status == 'Loading') && <LoaderCircle className="mr-2 size-4 animate-spin" />}
          Login
        </Button>
      </form>
    </Form>
  );
}
