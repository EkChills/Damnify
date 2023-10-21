import Link from "next/link";
import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Menu } from "lucide-react";
import Image from "next/image";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import SideMenu from "./SideMenu";

export default function Navbar() {
  const {getUser} = getKindeServerSession()
  const user = getUser()
  console.log(user);
  
  return (
    <nav className="sticky h-16 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-[#ffffff] backdrop-blur-lg transition-all py-6 flex items-center">
      <MaxWidthWrapper className="w-full">
        <div className="w-full flex items-center justify-between ">
          <div className="flex items-center gap-4">
            <Menu className="hidden lg:block" />
            <SideMenu />
            <Link
              className="font-semibold text-gray-500 flex items-center gap-1"
              href={"/"}
            >
              <span className="text-base">Damnify</span>
              <span className="border rounded-lg border-border p-1 text-[.75rem]  text-primary font-[500]">
                Experiment
              </span>
            </Link>
          </div>

          <Image width={40} height={40} alt="user avatar" src={user?.picture || '' } className="rounded-full"/>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
}
