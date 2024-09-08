"use client";

import React from "react";

import { useRouter } from "next/navigation";
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { twMerge } from "tailwind-merge";
import Button from "./Button";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { FaUserAlt } from "react-icons/fa";
import toast from "react-hot-toast";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const router = useRouter();

  const { user } = useUser();
  const authmodal = useAuthModal();
  const supabaseClient = useSupabaseClient();

  const handleLogOut = async () => {
    const { error } = await supabaseClient.auth.signOut();
    //reset any playing spngs
    router.refresh();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged out!");
    }
  };

  return (
    <div
      className={twMerge(
        `
        h-fit bg-gradient-to-b
        from-emerald-800 p-6
        `,
        className
      )}
    >
      <div
        className="
        mb-4 w-full flex
        items-center
        justify-between
        "
      >
        <div
          className="
          hidden md:flex
          gap-x-2 items-center
          "
        >
          <button
            onClick={() => router.back()}
            className="
            rounded-full bg-black flex
            items-center justify-center
            hover:opacity-75 transition
            "
          >
            <RxCaretLeft className="text-white" size={35} />
          </button>
          <button
            onClick={() => router.forward()}
            className="
            rounded-full bg-black flex
            items-center justify-center
            hover:opacity-75 transition
            "
          >
            <RxCaretRight className="text-white" size={35} />
          </button>
        </div>
        <div className="flex md:hidden gap-x-2 items-center">
          <button
            className="
            rounded-full bg-white flex
            items-center justify-center
            hover:opacity-75 transition
            "
          >
            <HiHome className="text-black p-0.5" size={20} />
          </button>
          <button
            className="
            rounded-full bg-white flex
            items-center justify-center
            hover:opacity-75 transition
            "
          >
            <BiSearch className="text-black p-0.5" size={20} />
          </button>
        </div>
        <div
          className="
          flex justify-between
          items-center gap-x-4        
          "
        >
          {user ? (
            <div className="flex gap-4 items-center">
              <Button className="bg-white px-6 py-2" onClick={handleLogOut}>
                Logout
              </Button>
              <Button
                className="bg-white"
                onClick={() => router.push("/account")}
              >
                <FaUserAlt />
              </Button>
            </div>
          ) : (
            <>
              <div>
                <Button
                  onClick={authmodal.onOpen}
                  className="
                  bg-transparent
                  text-neutral-300
                  font-medium
                  "
                >
                  Sign Up
                </Button>
              </div>
              <div>
                <Button
                  onClick={authmodal.onOpen}
                  className="
                  bg-white
                  px-6 py-2
                  "
                >
                  Log In
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
