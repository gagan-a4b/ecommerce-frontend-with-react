import React from "react";
import { Link } from "react-router-dom";
import Input from "./Input"; 

const AuthForm = ({
  type = "login", // "login" or "signup"
  username,
  setUsername,
  password,
  setPassword,
  email,
  setEmail,
  role,
  setRole,
  handleSubmit,
}) => {
  const isSignup = type === "signup";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 mt-4 border p-6 rounded-lg shadow-md bg-white"
    >
      <h2 className="text-xl font-semibold text-center">
        {isSignup ? "Sign Up" : "Login"}
      </h2>

      <div className="flex flex-col gap-4">
        {!isSignup && (
          <select
            className="p-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            onChange={(e) => setRole(e.target.value)}
            value={role}
            required
          >
            <option value="">Select Role</option>
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        )}

        <div>
          <Input 
            label="Username"
            type= 'text'
            placeholder= 'Enter username'
            required={true}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {isSignup && (
          <div>
            <Input
              label="Email"
              type="email"
              placeholder="Enter email"
              required={true}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        )}

        <div>
          <Input
            label="Password"
            type="password"
            placeholder="Enter password"
            required={true}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className={`w-full py-2 rounded text-black transition-colors ${
            isSignup ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isSignup ? "Sign Up" : "Login"}
        </button>
      </div>

      {!isSignup && (
        <p className="text-center text-sm text-gray-600">
          New to ShopMobile?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Create your account here
          </Link>
        </p>
      )}
    </form>
  );
};

export default AuthForm;
