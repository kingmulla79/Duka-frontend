import React, { FC } from "react";
import "./Loader.css";

type Props = {
  smallComp?: boolean;
};

const Loader: FC<Props> = ({ smallComp }) => {
  return (
    <div
      className={`flex justify-center items-center ${
        smallComp ? "h-fit" : "h-screen"
      }`}
    >
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
