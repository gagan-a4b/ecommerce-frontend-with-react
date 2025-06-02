import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import { login } from "../components/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthForm from "../components/AuthForm";

function Login() {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try{
      await login(userName, password, role);
      toast.success("Login successful");
      navigate(role === "Admin" ? "/admin" : "/");
    } catch (err) {
      toast.error("Login failed: " + err.message);
    }
  };

  return (
    <div className="h-screen w-full bg-gray-100 pt-44">
      <Header showAuthButtons={false} showUserLinks={false} />
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl shadow-md">
          <h2 className="mt-2 text-center text-2xl font-bold text-gray-800">
            Sign in to your account
          </h2>
          <AuthForm
            type="login"
            username={userName}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            role={role}
            setRole={setRole}
            handleSubmit={handleLogin}
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
