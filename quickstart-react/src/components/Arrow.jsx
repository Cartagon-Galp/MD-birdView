import { FiArrowDown } from "react-icons/fi";
import React from "react";

export const Arrow = ({ color }) => {
  return (
    <>
      <div className="arrow">
        <FiArrowDown size={70} color={color} />
      </div>
    </>
  );
};
