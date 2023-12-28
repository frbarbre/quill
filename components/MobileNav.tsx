'use client';

import { ArrowRight, MenuIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface MobileNavProps {
  isAuth: boolean;
}

const MobileNav = ({ isAuth }: MobileNavProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) toggleOpen();
  }, [pathname]);

  const closeOnCurrent = (href: string) => {
    if (pathname === href) {
      toggleOpen();
    }
  };
  return (
    <div className="sm:hidden">
      <MenuIcon
        onClick={toggleOpen}
        className="relative z-50 h-5 w-5 text-zinc-700"
      />

      {isOpen ? (
        <div className="fixed animate-in slide-in-from-top-5 fade-in-20 inset-0 z-0 w-full">
          <ul className="absolute bg-white border-b border-zinc-200 shadow-xl grid w-full gap-3 px-10 pt-20 pb-8">
            {!isAuth ? (
              <>
                <li>
                  <Link
                    className="flex items-center w-full font-semibold text-primary"
                    href={'/sign-up'}
                    onClick={() => closeOnCurrent('/sign-up')}
                  >
                    Get started <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </li>
                <li className="my-3 h-px w-full bg-gray-300"></li>
                <li>
                  <Link
                    className="flex items-center w-full font-semibold"
                    href={'/sign-in'}
                    onClick={() => closeOnCurrent('/sign-in')}
                  >
                    Sign in
                  </Link>
                </li>
                <li className="my-3 h-px w-full bg-gray-300"></li>
                <li>
                  <Link
                    className="flex items-center w-full font-semibold"
                    href={'/pricing'}
                    onClick={() => closeOnCurrent('/pricing')}
                  >
                    Pricing
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    className="flex items-center w-full font-semibold"
                    href={'/dashboard'}
                    onClick={() => closeOnCurrent('/dashboard')}
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="my-3 h-px w-full bg-gray-300"></li>
                <li>
                  <Link
                    className="flex items-center w-full font-semibold"
                    href={'/sign-out'}
                  >
                    Sign out
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

interface MobileNavProps {}

export default MobileNav;
