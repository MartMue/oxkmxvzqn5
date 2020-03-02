import React, { useEffect, useState } from "react";
import useIntersect from "./useIntersect";

const DateBox = ({ children, onChange }) => {
  const [ref, entry] = useIntersect({
    threshold: [0]
  });

  const isVisible = entry.isVisible;

  debugger;
  useEffect(() => {
    debugger;
    onChange(isVisible);
  }, [isVisible, onChange]);

  return <div ref={ref}>{children}</div>;
};
export default DateBox;
