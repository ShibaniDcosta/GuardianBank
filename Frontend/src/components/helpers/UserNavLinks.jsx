import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useMatch } from "react-router-dom";
import {
  accountLogout,
  resetAccountStatus,
} from "../../state/features/Account/accountSlice";
import {
  logout,
  resetAuthStatus,
} from "../../state/features/User/Auth/authSlice";
import {
  resetUserStatus,
  userLogout,
} from "../../state/features/User/UserData/userSlice";
import { navbarLinksClickHandler } from "./navbarLinksClickHandler";
import { UserNavbarSkeleton } from "./UserNavbarSkeleton";

export const UserNavLinks = ({ user }) => {
  const dispatch = useDispatch();
  const { account, isLoading: isUserAccountLoading } = useSelector(
    (state) => state.userAccount
  );
  const { info, isLoading: isUserDataLoading } = useSelector(
    (state) => state.userData
  );

  const userStatus = info?.userStatus;

  //user navbar data
  const userNavData = [
  {
    title: "Home",
    to: "/",
  },
  {
    title: "Profile",
    to: userStatus === 0 ? `/profile/${user.id}` : " ",
  },
  {
    title: "Request Account",
    to: userStatus === 0 ? `/account-request` : " ",
  },
  {
    title: "Deposit",
    to: account ? `/account/deposit/${account._id}` : " ",
  },
  {
    title: "Withdraw",
    to: account ? `/account/withdraw/${account._id}` : " ",
  },
  {
    title: "Transfer",
    to: account ? `/account/transfer/${account._id}` : " ",
  },
  {
    title: "Outgoing Transfer Logs",
    to: account ? `/account/out/${account._id}` : " ",
  },
  {
    title: "Incoming Transfer Logs",
    to: account ? `/account/in/${account._id}` : " ",
  },
  {
    title: "Deposit Logs",
    to: account ? `/account/deposit-logs/${account._id}` : " ",
  },
  {
    title: "Withdrawal Logs",
    to: account ? `/account/withdraw-logs/${account._id}` : " ",
  },
  {
    title: "Settings",
    to: userStatus === 0 ? `/profile/${user.id}/update` : " ",
  },
  // {
  //   title: "Contact Support",
  //   to: "/contact",
  // },
  {
    title: "Logout",
    handleLogout: function () {
      dispatch(accountLogout());
      dispatch(logout());
      dispatch(userLogout());
      dispatch(resetUserStatus());
      dispatch(resetAuthStatus());
      dispatch(resetAccountStatus());
    },
  },
];


  //user navbar links creation
  const navbarLinks = userNavData.map((link) => (
    <li
      key={link.title}
      className={`${
        user.accountsCount === 0 &&
        !(
          user.role === 'merchant'
            ? ["Profile", "Settings", "Notifications", "Home", "Logout"]
            : ["Profile", "Settings", "Notifications", "Request Account", "Home", "Logout"]
        ).includes(link.title) &&
        "hidden"
      } flex w-full justify-between items-center mb-6 select-none`}
    >
      {link.title === "Logout" ? (
        <button
          onClick={link.handleLogout}
          className="w-full flex items-center p-2 rounded shadow bg-red-200"
        >
          <span className="text-sm ml-2 font-semibold text-red-800 hover:text-red-700 hover:underline">
            {link.title}
          </span>
        </button>
      ) : (
        <Link
          to={link.to}
          className="w-full flex items-center p-2  border-blue-800 rounded shadow bg-indigo-100"
          onClick={navbarLinksClickHandler}
        >
          <span
            className={`text-sm ml-2 text-blue-800 hover:text-blue-700 hover:underline ${
              useMatch(link.to) ? "underline font-bold" : "font-semibold"
            }`}
          >
            {link.title}
          </span>
          {link.title === "Notifications" &&
            user.notifications.filter((notification) => !notification.isSeen)
              .length > 0 && (
              <span className="w-2 h-2 p-3 ml-auto  flex items-center justify-center bg-red-500 text-white font-bold text-xs rounded-full shadow">
                {user.notifications.filter(
                  (notification) => !notification.isSeen
                ).length > 9
                  ? "+9"
                  : user.notifications.filter(
                      (notification) => !notification.isSeen
                    ).length}
              </span>
            )}
        </Link>
      )}
    </li>
  ));

  if ((!account || !info) && (isUserAccountLoading || isUserDataLoading))
    return <UserNavbarSkeleton />;

  return navbarLinks;
};
