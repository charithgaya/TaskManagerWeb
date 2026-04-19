"use client";
import Button from "@/components/ui/Button";
import { useUserContext } from "@/context/userContext";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

function ForgotPasswordForm() {
  const { forgotPasswordEmail, handleForgotPassword } = useUserContext();
  // state
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleForgotPassword();

    if(!email || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    try {
      setLoading(true);
      await forgotPasswordEmail(email);
      setEmail(""); //clear input

    } catch (error) {
      // console.error("Error sending reset link:", error);
      toast.error("Failed to send reset link. Please try again.");
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit} 
      className="rounded-2xl bg-card w-full max-w-md mx-auto p-6 sm:p-8 shadow-sm">
      <div className="space-y-6">

        <div className="space-y-1 text-center">
          <h1 className="text-md sm:text-lg md:text-lg lg:text-xl xl:text-2xl font-semibold text-foreground">
              Reset Password
          </h1>
          <p className="text-sm text-muted-foreground">
              Enter your email address to receive a password reset link.
          </p>
          <p className="text-xs text-muted-foreground">
            We’ll send a reset link to your email "for testing purposes" (no actual email will be sent).
          </p>
        </div>

        <div className="space-y-1">
          <label htmlFor="email" className="text-sm text-muted-foreground">
            Email
          </label>
          <Input
            type="email"
            value={email}
            onChange={handleEmailChange}
            name="email"
            placeholder="Enter your email"
            className="px-4 py-2 rounded-md border bg-background text-foreground outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        
          <Button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 transition disabled:opacity-50"
            >
            {loading ? "Sending..." : "Set Reset Link"}
          </Button>
      </div>
    </form>
  );
}

export default ForgotPasswordForm;
