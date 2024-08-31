/* eslint-disable prettier/prettier */
import React from 'react';
import Navbar from "@/components/sections/NavBar";

const MainLayout = ({ children }: { children: React.ReactNode; }) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;