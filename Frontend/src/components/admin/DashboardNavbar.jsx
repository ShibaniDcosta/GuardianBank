import React from "react";
import { useSelector } from "react-redux";

export const DashboardNavbar = ({ activeTab, setActiveTab }) => {
  const navTabs = [
    {
      stateName: "usersList",
      tabName: "Users Control Panel",
    },
    {
      stateName: "usersRequests",
      tabName: "User Account Requests",
    },
    {
      stateName: "adminsList",
      tabName: "Employees Control Panel",
    },
    {
      stateName: "addAdmin",
      tabName: "Add New Employees",
    },
    {
      stateName: "adminTransactions",
      tabName: "User Transactions Approval",
    },
  ];

  const { info } = useSelector((state) => state.adminAuth);

  return (
    <div className="max-w-5xl w-full">
      <nav className="m-auto bg-indigo-100 rounded text-blue-800  border-blue-800">
        <ul className="flex justify-center flex-wrap gap-4 p-4 text-sm">
          {navTabs.map((tab, index) => (
            <li
              key={index}
              className={`flex justify-center items-center select-none cursor-pointer  hover:text-blue-700 hover:underline ${
                activeTab === tab.stateName
                  ? " font-bold underline underline-offset-2"
                  : " font-semibold"
              }
              ${
                info.role !== "owner" &&
                (index === 1 || index === 3 || index === 2) &&
                "hidden"
              }`}
              onClick={() => setActiveTab(tab.stateName)}
            >
              <span>{tab.tabName}</span>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};