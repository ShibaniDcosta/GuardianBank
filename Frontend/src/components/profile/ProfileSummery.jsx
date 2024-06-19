import React from "react";

export default function ProfileSummery({ info }) {
  return (
    <div>
      <h3 className="flex items-center text-gray-800 mb-10 text-xl font-bold px-2 py-4 my-4 rounded shadow bg-indigo-100  border-blue-800">
        {info.name}
      </h3>

      <ul className="w-full max-w-[550px] py-2  mt-3">
        <li className="flex items-center p-3 mb-2    border-blue-800 ">
          <span className="font-semibold">Status</span>
          <span className="ml-auto">
              {!info.userStatus && "Active"}
          </span>
        </li>
        <li className="flex items-center p-3   border-blue-800">
          <span className="font-semibold">Member since</span>
          <span className="ml-auto">
            {new Date(info.createdAt).toLocaleDateString()}
          </span>
        </li>
      </ul>
    </div>
  );
}
