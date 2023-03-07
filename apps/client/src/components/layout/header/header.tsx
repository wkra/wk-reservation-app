import React from "react";
import SideOver from "../../UI/side-over/side-over";
import { BookmarkSquareIcon } from "@heroicons/react/24/outline";
import LoginForm from "../../login-form/login-form";
import { AppDispatch, RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../store/user-actions";
import { globalActions } from "../../../store/global";

const Header: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.user.id);
  const username = useSelector((state: RootState) => state.user.username);
  const showLoginSideOver = useSelector(
    (state: RootState) => state.global.showLoginSideOver
  );

  const onShow = () => {
    dispatch(globalActions.setShowLoginSideOver(true));
  };

  const onClose = () => {
    dispatch(globalActions.setShowLoginSideOver(false));
  };

  const logoutHandler = () => {
    dispatch(logoutUser());
  };

  return (
    <>
      <div className="relative bg-white">
        <div
          className="pointer-events-none absolute inset-0 z-30 shadow"
          aria-hidden="true"
        ></div>
        <div className="relative z-20">
          <div className="mx-auto flex max-w-7xl items-center justify-between py-5 px-6 sm:py-4 md:justify-start md:space-x-10 lg:px-8">
            <div>
              <a href="#" className="flex">
                <span className="sr-only">Your Company</span>
                <BookmarkSquareIcon className="h-6 w-6" />
              </a>
            </div>
            <div className="flex flex-1 items-center justify-between">
              <nav className="flex space-x-10">
                {userId > 0 && (
                  <span className="text-base font-medium text-gray-500">
                    Hello {username}
                  </span>
                )}
              </nav>
              <div className="flex items-center md:ml-12">
                {userId ? (
                  <span
                    className="cursor-pointer text-base font-medium text-gray-500 hover:text-gray-900"
                    onClick={logoutHandler}
                  >
                    Log out
                  </span>
                ) : (
                  <span
                    className="cursor-pointer text-base font-medium text-gray-500 hover:text-gray-900"
                    onClick={onShow}
                  >
                    Log in
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <SideOver isOpen={showLoginSideOver} onClose={onClose} title="Login">
        <LoginForm />
      </SideOver>
    </>
  );
};

export default Header;
