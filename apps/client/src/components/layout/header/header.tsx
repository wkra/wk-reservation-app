import React, {useState} from 'react';
import SideOver from '../../UI/side-over/side-over';
import {Bars3Icon, BookmarkSquareIcon} from '@heroicons/react/24/outline';

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);

  const showSideOver = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="relative bg-white">
        <div className="pointer-events-none absolute inset-0 z-30 shadow" aria-hidden="true"></div>
        <div className="relative z-20">
          <div
            className="mx-auto flex max-w-7xl items-center justify-between py-5 px-6 sm:py-4 md:justify-start md:space-x-10 lg:px-8">
            <div>
              <a href="#" className="flex">
                <span className="sr-only">Your Company</span>
                <BookmarkSquareIcon className="h-6 w-6"/>
              </a>
            </div>
            <div className="-my-2 -mr-2 md:hidden">
              <button type="button"
                      className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                      aria-expanded="false"
                      onClick={showSideOver}>
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6"/>

              </button>
            </div>
            <div className="hidden md:flex md:flex-1 md:items-center md:justify-between">
              <nav className="flex space-x-10">
                <a href="#" className="text-base font-medium text-gray-500 hover:text-gray-900" >Link</a>
              </nav>
              <div className="flex items-center md:ml-12">
                <a href="#" className="text-base font-medium text-gray-500 hover:text-gray-900" onClick={showSideOver}>Log in</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SideOver isOpen={open} onClose={onClose} title="Login">
        <p>google login</p>
      </SideOver>
    </>
  );
};

export default Header;
