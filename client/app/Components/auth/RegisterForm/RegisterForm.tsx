"use client";
import { eyeIcon, eyeSlashIcon } from '@/app/utils/icons';
import Button from "@/components/ui/Button";
import { useUserContext } from "@/context/userContext";
import React from "react";

function RegisterForm() {
  const { registerUser, userState, handlerUserInput } = useUserContext();
  const { name, email, password } = userState;
  const [showPassword, setShowPassword] = React.useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <form className="relative w-full max-w-md mx-auto p-6 sm:p-8 rounded-2xl bg-card shadow-sm">
      <div className="relative z-10 space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-md sm:text-lg md:text-lg lg:text-xl xl:text-2xl font-semibold text-foreground">
              Register for an Account
          </h1>
          <p className="text-sm text-muted-foreground">
              Create an account. Already have an account?{" "}
          <a
            href="/login"
            className="font-medium text-primary hover:underline"
          >
            Login here
          </a>
        </p>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-sm text-muted-foreground">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => handlerUserInput(e, "name")}
            name="name"
            className="px-4 py-2 border rounded-md bg-background outline-none text-foreground focus:ring-2 focus:ring-primary"
            placeholder="John Doe"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm text-muted-foreground">
            Email
          </label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => handlerUserInput(e,"email")}
            name="email"
            className="px-4 py-2 border rounded-md bg-background outline-none text-foreground focus:ring-2 focus:ring-primary"
            placeholder="johndoe@gmail.com"
          />
        </div>
        <div className="relative flex flex-col gap-1">
          <label htmlFor="password" className="mb-1 text-sm text-muted-foreground">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => handlerUserInput(e, "password")}
            name="password"
            className="px-4 py-2 border rounded-md bg-background outline-none text-foreground focus:ring-2 focus:ring-primary"
            placeholder="***************"
          />
          <button
            type="button"
            className="absolute right-3 top-[38px] text-muted-foreground hover:text-foreground"
            onClick={togglePassword}
          >
             {showPassword ? eyeSlashIcon : eyeIcon}
          </button>
        </div>

        
          <Button
            type="submit"
            disabled={!name || !email || !password}
            onClick={registerUser}
            className="w-full py-2.5 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 transition disabled:opacity-50"
          >
            Register Now
          </Button>
      </div>
    </form>
  );
}

export default RegisterForm;
