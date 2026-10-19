import React from "react";
import Button from "../../common/Button";
import { assets } from "../../assets/assets";

const CallToAction = () => {
  return (
    <div className="flex flex-col items-center gap-4 pt-10 pb-24 px-8 md:px-0 ">
      <h1 className="text-xl md:text-4xl">Learn anything, anytime, anywhere</h1>
      <p className="text-gray-500 sm:text-sm">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam optio
        officiis nam quod, perferendis nulla deleniti dignissimos harum debitis
        eaque error! Autem, mollitia temporibus?
      </p>

      <div className="flex items-center font-medium gap-6 mt-4">
        <Button
          text={"Get Started"}
          className={"bg-blue-600 text-white px-10 py-3 rounded-md"}
        />
        <Button
          text={"Learn more"}
          className={"flex items-center gap-2"}
          image={assets.arrow_icon}
        />
      </div>
    </div>
  );
};

export default CallToAction;
