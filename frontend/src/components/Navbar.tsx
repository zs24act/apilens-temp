"use client";

import { useRouter } from 'next/navigation';
import { destroyCookie } from 'nookies';
import Link from 'next/link';
import { GitBranch, Bell, Settings, Moon, Sun } from 'lucide-react';
import { useState } from 'react';

interface NavbarProps {
  userEmail?: string;
}

export default function Navbar({ userEmail }: NavbarProps) {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    destroyCookie(null, 'token');
    router.push('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard" className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <GitBranch className="text-white" size={16} />
            </div>
            <h1 className="text-xl font-semibold">API Monitor</h1>
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-400 hover:text-gray-600 relative">
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 text-gray-400 hover:text-gray-600"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <Link href="/profile" className="p-2 text-gray-400 hover:text-gray-600">
            <Settings size={20} />
          </Link>
          <div className="h-6 w-px bg-gray-300"></div>
          {userEmail && (
            <span className="text-sm text-gray-700 hidden md:block">
              {userEmail}
            </span>
          )}
          <button
            onClick={handleLogout}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  );
}
