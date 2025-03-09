'use client'

import React, { useState } from 'react';
import { JSX } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from './ui/button';
import { User } from 'next-auth';
import {
  MessageSquare,
  User as UserIcon,
  LogOut,
  ChevronDown,
  Menu,
  X,
  Home,
  Settings,
  HelpCircle
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Navbar() {
  const { data: session } = useSession();
  const user: User = session?.user;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-gradient-to-r from-slate-900 to-slate-800 text-white border-b border-slate-700 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo section */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg p-1.5 shadow-md group-hover:shadow-blue-500/20 transition-all duration-300">
              <MessageSquare className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              <div className=""> <span className="text-whit  ">Your</span>
                <span className="text-blue-400 ">Logo</span></div>
            </span>
          </Link>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="hover:bg-slate-700 text-slate-200"
            >
              {mobileMenuOpen ?
                <X className="h-5 w-5" /> :
                <Menu className="h-5 w-5" />
              }
            </Button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {session ? (
              <>
                <div className="flex space-x-4 mr-4">
                  <Link href="/dashboard" className="flex items-center gap-1.5 px-3 py-2 rounded-md hover:bg-slate-700 transition-colors text-slate-200 hover:text-white">
                    <Home className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                  <Link href="/settings" className="flex items-center gap-1.5 px-3 py-2 rounded-md hover:bg-slate-700 transition-colors text-slate-200 hover:text-white">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="bg-slate-800 border-slate-700 hover:bg-slate-700 hover:border-slate-600 text-white flex items-center gap-2">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-xs font-semibold uppercase">
                          {(user?.username || user?.email || "U").charAt(0)}
                        </div>
                        <span className="max-w-[120px] truncate">{user?.username || user?.email}</span>
                      </div>
                      <ChevronDown className="h-4 w-4 opacity-70" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-slate-800 border-slate-700 text-slate-200">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-slate-700" />
                    <Link href="/dashboard">
                      <DropdownMenuItem className="cursor-pointer hover:bg-slate-700 focus:bg-slate-700">
                        <UserIcon className="mr-2 h-4 w-4" /> Profile
                      </DropdownMenuItem>
                    </Link>
                    <Link href="/settings">
                      <DropdownMenuItem className="cursor-pointer hover:bg-slate-700 focus:bg-slate-700">
                        <Settings className="mr-2 h-4 w-4" /> Settings
                      </DropdownMenuItem>
                    </Link>
                    <Link href="/help">
                      <DropdownMenuItem className="cursor-pointer hover:bg-slate-700 focus:bg-slate-700">
                        <HelpCircle className="mr-2 h-4 w-4" /> Help
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator className="bg-slate-700" />
                    <DropdownMenuItem
                      onClick={() => signOut()}
                      className="text-red-400 cursor-pointer hover:bg-slate-700 focus:bg-slate-700 hover:text-red-300"
                    >
                      <LogOut className="mr-2 h-4 w-4" /> Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex gap-3">
                <Link href="/sign-up">
                  <Button variant="outline" className="bg-transparent border-slate-600 hover:bg-slate-700 text-white">
                    Sign Up
                  </Button>
                </Link>
                <Link href="/sign-in">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Login
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-700">
            {session ? (
              <div className="space-y-3 pb-3">
                <div className="flex items-center gap-3 px-2 py-3">
                  <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-sm font-semibold uppercase">
                    {(user?.username || user?.email || "U").charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white truncate">
                      {user?.username || user?.email}
                    </p>
                  </div>
                </div>
                <Link href="/dashboard" className="block px-2 py-2 rounded-md hover:bg-slate-700 transition-colors">
                  <div className="flex items-center gap-2">
                    <Home className="h-4 w-4" />
                    <span>Dashboard</span>
                  </div>
                </Link>
                <Link href="/settings" className="block px-2 py-2 rounded-md hover:bg-slate-700 transition-colors">
                  <div className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </div>
                </Link>
                <Button
                  onClick={() => signOut()}
                  className="w-full text-left justify-start mt-2 bg-slate-800 hover:bg-slate-700 text-red-400"
                >
                  <LogOut className="h-4 w-4 mr-2" /> Logout
                </Button>
              </div>
            ) : (
              <div className="space-y-2 pt-2 pb-3">
                <div className="flex gap-2">
                  <Link href="/sign-in" className="flex-1">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Login</Button>
                  </Link>
                  <Link href="/sign-up" className="flex-1">
                    <Button variant="outline" className="w-full bg-transparent border-slate-600 text-white hover:bg-slate-700">Sign Up</Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
