"use client";

import { cn } from "@/lib/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type SidebarDropdownProps = {
  label: string;
  children: React.ReactNode;
};

type SidebarItemProps = {
  href: string;
  label: string;
};

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 h-screen hidden lg:flex  bg-gray-800 text-white  lg:flex-col">
      <div className="p-4 text-2xl font-bold">My App</div>
      <nav className="flex-1 items-between mt-6 px-3">
        <ul className="flex flex-col  gap-3">
          <SidebarItem href="/dashboard" label="Invoices" />
          <SidebarDropdown label="Account">
            <SidebarItem href="#" label="Details" />
            <SidebarItem href="#" label="Settings" />
          </SidebarDropdown>
        </ul>
      </nav>
      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
        <Link href="#" className="flex items-center gap-2 p-4 hover:bg-gray-50">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            className="size-10 rounded-full object-cover"
          />
          <div>
            <p className="text-xs">
              <strong className="block font-medium">Eric Frusciante</strong>
              <span> eric@frusciante.com </span>
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

const SidebarDropdown: React.FC<SidebarDropdownProps> = ({
  label,
  children,
}) => {
  return (
    <li>
      <details className="group [&_summary::-webkit-details-marker]:hidden">
        <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
          <span className="text-sm font-medium">{label}</span>
          <span className="shrink-0 transition duration-300 group-open:-rotate-180">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </summary>
        <ul className="mt-2 space-y-1 px-4">{children}</ul>
      </details>
    </li>
  );
};

const SidebarItem: React.FC<SidebarItemProps> = ({ href, label }) => {
  const path = usePathname();

  return (
    <li>
      <Link
        href={href}
        className={cn(
          "block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700" , path === href ? "bg-blue-200 text-gray-700" : ""
        )}
      >
        {label}
      </Link>
    </li>
  );
};

export default Sidebar;
