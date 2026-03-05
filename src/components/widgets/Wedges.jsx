import "./Wedges.scss";
import React from "react";

function Wedges({
  className = "",
  color = "wedges-color-variant-loader",
  hidden = false,
}) {
  const hiddenClass = hidden ? `wedges-wrapper-hidden` : ``;

  return (
    <div className={`wedges-wrapper ${className} ${hiddenClass}`}>
      <div className={`loader ${color}`}></div>
    </div>
  );
}

Wedges.ColorVariants = {
  LOADER: "wedges-color-variant-loader",
};

export default Wedges;
