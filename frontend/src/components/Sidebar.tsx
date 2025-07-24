'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { destroyCookie } from 'nookies';

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = () => {
    destroyCookie(null, 'token', { path: '/' });
    router.push('/login');
  };

  return (
    <div className='flex flex-col w-64 h-screen px-4 py-8 bg-white border-r'>
      <h2 className='text-3xl font-semibold text-gray-800'>APILens</h2>
      <div className='flex flex-col justify-between mt-6'>
        <aside>
          <ul>
            <li>
              <Link
                href='/dashboard'
                className='flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-md'
              >
                <span className='mx-4 font-medium'>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                href='/profile'
                className='flex items-center px-4 py-2 mt-5 text-gray-600 rounded-md hover:bg-gray-100'
              >
                <span className='mx-4 font-medium'>Profile</span>
              </Link>
            </li>
          </ul>
        </aside>

        <div className='mt-auto'>
          <button
            onClick={handleLogout}
            className='w-full px-4 py-2 text-left text-gray-600 rounded-md hover:bg-gray-100'
          >
            <span className='mx-4 font-medium'>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}
