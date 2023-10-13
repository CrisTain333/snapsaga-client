import React from "react";
import { RotatingLines } from "react-loader-spinner";

const Loader = ({
  size,
  color,
}: {
  size: string;
  color: string;
}) => {
  return (
    <div className="flex items-center justify-center">
      <RotatingLines
        strokeColor={color}
        strokeWidth="5"
        animationDuration="0.75"
        width={size}
        visible={true}
      />
    </div>
  );
};

export default Loader;
