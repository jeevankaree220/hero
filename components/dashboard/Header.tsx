"use client";

import { Search, Bell, Menu, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="
      sticky top-0 z-30
      bg-white border-b border-[var(--mist)] 
      px-3 sm:px-4 md:px-5 lg:px-6 
      py-3 sm:py-4
    ">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={onMenuClick}
            className="
              p-2 rounded-lg hover:bg-[var(--skymist)] transition-colors lg:hidden
            "
          >
            <Menu className="
              w-4 h-4 sm:w-5 sm:h-5 
              text-[var(--charcoal)]
            " />
          </button>
          
          <div>
            <h1 className="
              text-lg sm:text-xl md:text-2xl 
              xl:text-xl 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl
              font-heading font-bold text-[var(--midnight)]
            ">
              Documents
            </h1>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Mobile Search Button */}
          <button className="
            md:hidden p-2 rounded-lg hover:bg-[var(--skymist)] transition-colors
          ">
            <Search className="
              w-4 h-4 sm:w-5 sm:h-5 
              text-[var(--charcoal)]
            " />
          </button>

          {/* Desktop Search */}
          <div className="
            hidden md:flex items-center gap-2 bg-[var(--skymist)] rounded-lg 
            px-3 sm:px-4 py-2 sm:py-2.5 
            min-w-[200px] sm:min-w-[240px] md:min-w-[280px] 
            xl:min-w-[240px] 2xl:min-w-[280px] 3xl:min-w-[320px] 4xl:min-w-[360px]
            focus-within:ring-2 ring-[var(--softorange)]/20 transition-all
          ">
            <Search className="
              w-3 h-3 sm:w-4 sm:h-4 
              xl:w-3 xl:h-3 2xl:w-4 2xl:h-4 3xl:w-5 3xl:h-5 4xl:w-6 4xl:h-6
              text-[var(--charcoal)]
            " />
            <input
              type="text"
              placeholder="Search"
              className="
                bg-transparent border-none outline-none 
                text-xs sm:text-sm 
                xl:text-xs 2xl:text-sm 3xl:text-base 4xl:text-lg
                text-[var(--charcoal)] placeholder-[var(--charcoal)]/60 flex-1
              "
            />
          </div>

          {/* Notifications */}
          <button className="
            relative p-1.5 sm:p-2 rounded-lg hover:bg-[var(--skymist)] transition-colors
          ">
            <Bell className="
              w-4 h-4 sm:w-5 sm:h-5 
              xl:w-4 xl:h-4 2xl:w-5 2xl:h-5 3xl:w-6 3xl:h-6 4xl:w-7 4xl:h-7
              text-[var(--charcoal)]
            " />
            <div className="
              absolute top-0.5 sm:top-1 right-0.5 sm:right-1 
              w-1.5 h-1.5 sm:w-2 sm:h-2 
              xl:w-1.5 xl:h-1.5 2xl:w-2 2xl:h-2 3xl:w-2.5 3xl:h-2.5 4xl:w-3 4xl:h-3
              bg-gradient-to-r from-blue-600 to-blue-400 rounded-full animate-pulse
            "></div>
          </button>

          {/* User Avatar with Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="
              flex items-center gap-1 sm:gap-2 hover:opacity-80 transition-opacity
            ">
              <Avatar className="
                w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 
                xl:w-8 xl:h-8 2xl:w-9 2xl:h-9 3xl:w-10 3xl:h-10 4xl:w-12 4xl:h-12
              ">
                <AvatarImage src="/api/placeholder/32/32" alt="User" />
                <AvatarFallback className="
                  bg-[var(--softorange)] text-white 
                  text-xs sm:text-sm 
                  xl:text-xs 2xl:text-sm 3xl:text-base 4xl:text-lg
                  font-medium
                ">
                  AJ
                </AvatarFallback>
              </Avatar>
              <span className="
                hidden lg:block font-medium text-[var(--midnight)] 
                text-xs sm:text-sm 
                xl:text-xs 2xl:text-sm 3xl:text-base 4xl:text-lg
              ">
                Angelina Joli
              </span>
              <ChevronDown className="
                hidden lg:block 
                w-3 h-3 sm:w-4 sm:h-4 
                xl:w-3 xl:h-3 2xl:w-4 2xl:h-4 3xl:w-5 3xl:h-5 4xl:w-6 4xl:h-6
                text-[var(--charcoal)]
              " />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="
              w-40 sm:w-44 md:w-48 
              xl:w-44 2xl:w-48 3xl:w-52 4xl:w-56
            ">
              <DropdownMenuLabel className="
                text-xs sm:text-sm 
                xl:text-xs 2xl:text-sm 3xl:text-base 4xl:text-lg
              ">
                My Account
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="
                text-xs sm:text-sm 
                xl:text-xs 2xl:text-sm 3xl:text-base 4xl:text-lg
              ">
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="
                text-xs sm:text-sm 
                xl:text-xs 2xl:text-sm 3xl:text-base 4xl:text-lg
              ">
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="
                text-xs sm:text-sm 
                xl:text-xs 2xl:text-sm 3xl:text-base 4xl:text-lg
              ">
                Billing
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="
                text-red-600 
                text-xs sm:text-sm 
                xl:text-xs 2xl:text-sm 3xl:text-base 4xl:text-lg
              ">
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
