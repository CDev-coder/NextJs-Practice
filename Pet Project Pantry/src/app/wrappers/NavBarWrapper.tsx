// wrapper/NavBarWrapper.tsx
"use client";

import { ReactNode, useState } from "react";
import NavBar from "../components/NavBar";
import { useFilters } from "../context/FilterContext";
import { useRouter } from "next/navigation";

interface NavBarWrapperProps {
  children: ReactNode;
}

export default function NavBarWrapper({ children }: NavBarWrapperProps) {
  const { resetFilters } = useFilters();
  const router = useRouter();
  const handleHomeClick = () => {
    // This function will be called when the home link is clicked
    console.log("Home clicked - resetting view");
    // Reset all filters and states to default
    resetFilters();
    router.push("/");
  };

  return (
    <>
      <NavBar onHomeClick={handleHomeClick} />
      {children}
    </>
  );
}
