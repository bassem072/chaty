import React from "react";

export default function Panel({
  decoration,
  title,
  description = "",
  buttonText,
  image,
  trans = "",
  onClick,
}) {
  return (
    <div
      className={
        "flex flex-row col-[1/2] lg:col-auto lg:flex-col justify-around items-center lg:items-end text-center z-[6] py-10 px-[8%] lg:pt-12 lg:pb-8 " +
        decoration
      }
    >
      <div
        className={
          "text-paragraph transition-transform duration-[.9s] lg:duration-1000 ease-in-out delay-[.8s] lg:delay-700 w-full py-2 px-4 md:py-0 md:px-0 pr-[15%] lg:pr-0 " +
          trans
        }
      >
        <h3 className="font-semibold leading-none text-xl lg:text-2xl">{title}</h3>
        <p className="text-xs lg:text-base py-2 lg:py-3">{description}</p>
        <button
          onClick={onClick}
          className="m-0 bg-none border-2 border-paragraph w-28 lg:w-32 h-9 lg:h-10 font-semibold text-sm"
        >
          {buttonText}
        </button>
      </div>
      <img
        src={image}
        alt={title}
        className={
          "w-[200px] hidden md:block lg:w-full transition-all duration-[.9s] lg:duration-[1.1s] ease-in-out delay-[.6s] lg:delay-[.4] " +
          trans
        }
      />
    </div>
  );
}
