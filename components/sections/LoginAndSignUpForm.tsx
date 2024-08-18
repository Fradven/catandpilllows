/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import SignUp from "@/components/forms/SignUp";
import Login from "@/components/forms/Login";

const LoginForm = () => {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className="flex justify-center w-full h-screen bg-[#C3A298]">
      <div className="w-full p-14 rounded-md">
        <div className="flex justify-between mb-5">
          <button
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-2 cursor-pointer ${
              activeTab === 'login' ? 'bg-catDarkBurgundy border-b-2 border-gray-800 rounded-t-md' : 'bg-[#AF8D86]'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab('signup')}
            className={`flex-1 py-2 cursor-pointer ${
              activeTab === 'signup' ? 'bg-catDarkBurgundy border-b-2 border-gray-800 rounded-t-md' : 'bg-[#AF8D86]'
            }`}
          >
            Sign Up
          </button>
        </div>
        {activeTab === 'login' ? (
          <Login />
        ) : (
          <SignUp />
        )}
      </div>
    </div>
  );
};

export default LoginForm;
