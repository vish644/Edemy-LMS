import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import Button from "../../common/Button";
import { useClerk, UserButton, useUser } from "@clerk/react";
import { AppContext } from "../../context/AppContext";

const Navbar = () => {
  const { navigate, isEducator } = useContext(AppContext);

  const isCourseListPage = location.pathname.includes("/course-list");

  const { openSignIn } = useClerk();
  const { user } = useUser();

  return (
    <div
      className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${isCourseListPage ? "bg-white" : "bg-cyan-100/70"}`}
    >
      <img
        src={assets.logo}
        alt="Logo"
        className="w-28 lg:w-32 cursor-pointer"
        onClick={() => navigate("/")}
      />

      {/* For large screens  */}
      <div className="hidden md:flex items-center gap-5 text-gray-500">
        <div className="flex items-center gap-5">
          {user && (
            <>
              <Button
                text={isEducator ? "Educator Dashboard" : "Become Educator"}
                onClick={() => navigate("/educator")}
              />
              |<Link to={"/my-enrollments"}>My Enrollments</Link>
            </>
          )}
        </div>

        {user ? (
          <UserButton />
        ) : (
          <Button
            text={"Create Account"}
            onClick={() => openSignIn()}
            className="px-5 py-2 rounded-full bg-blue-600 text-white"
          />
        )}
      </div>

      {/* For Phone Screens  */}
      <div className="md:hidden flex items-center gap-2 sm:gap-5 text-gray-500">
        <div className="flex items-center gap-1 sm:gap-2 max-sm:text-xs">
          {user && (
            <>
              <Button
                text={"Become Educator"}
                onClick={() => navigate("/educator")}
              />
              |<Link to={"/my-enrollments"}>My Enrollments</Link>
            </>
          )}
        </div>
        {user ? (
          <UserButton />
        ) : (
          <Button
            image={assets.user_icon}
            className={"flex items-center"}
            onClick={() => openSignIn()}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
