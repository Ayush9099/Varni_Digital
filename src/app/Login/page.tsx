"use client";

import React, { useState } from "react";
import TextElement from "../_components/Elements/textElement";
import ButtonElement from "../_components/Elements/buttonElement";
import { useStore } from "~/stores/useStore";
import { useRouter } from "next/navigation";
const Login = () => {
  const router = useRouter();
  const { authStore } = useStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;

  const validateForm = () => {
    let valid = true;

    setEmailError("");
    setPasswordError("");

    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    }

    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must be at least 8 characters long, contain at least 1 uppercase letter, 1 number, and 1 special character.",
      );
      valid = false;
    }

    return valid;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        setIsLoading(true);
        await authStore.login(email, password);
        if (authStore.isAuthenticated) {
          // Redirect based on user role
          if (authStore.isAdmin) {
            router.push("/admin/dashboard");
          } else {
            router.push("/Dashboards/userDashboard");
          }
        }
      } catch (error) {
        console.error("Login error:", error);
        // Error handling is managed by axios interceptor
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) setEmailError("");
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (passwordError) setPasswordError("");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="login-container w-full max-w-sm rounded-xl bg-white p-6 shadow-md">
        <h1 className="mb-6 text-center text-xl font-semibold">Login</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void handleSubmit();
          }}
        >
          <TextElement
            label="Email"
            placeholder="Enter your Email"
            value={email}
            onChange={handleEmailChange}
            variant="primary"
            size="medium"
            className="mb-4"
            type="email"
            disabled={isLoading}
          />
          {emailError && (
            <p className="mb-4 text-sm text-red-500">{emailError}</p>
          )}

          <TextElement
            label="Password"
            placeholder="Enter your Password"
            value={password}
            onChange={handlePasswordChange}
            variant="primary"
            size="medium"
            className="mb-4"
            type="password"
            disabled={isLoading}
          />
          {passwordError && (
            <p className="mb-4 text-sm text-red-500">{passwordError}</p>
          )}

          <div className="flex w-full justify-center">
            <ButtonElement
              label={isLoading ? "Logging in..." : "Login"}
              variant="primary"
              rounded="xl"
              type="submit"
              onClick={() => {
                void handleSubmit();
              }}
              disabled={
                isLoading ||
                !!emailError ||
                !!passwordError ||
                !email ||
                !password
              }
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
