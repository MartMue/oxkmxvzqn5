import React, { useState } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import c from "classnames";

import "./styles.css";
import "./dateHierarchy";

// function Timeout(fn, interval) {
//   var id = setTimeout(fn, interval);
//   this.cleared = false;
//   this.clear = function () {
//       this.cleared = true;
//       clearTimeout(id);
//   };
// }

const Test = () => {
  const data = {
    1: {
      label: "foo"
    },
    2: {
      label: "bar"
    }
  };

  const [activeData, setActiveData] = useState(1);
  const [timeoutRef, setTimeoutRef] = useState(null);

  const onMouseEnter = () => {
    if (timeoutRef == null) {
      setTimeoutRef(
        setTimeout(() => {
          setActiveData(activeData === 1 ? 2 : 1);
        }, 2000)
      );
    }
  };

  const onMouseLeave = () => {
    clearTimeout(timeoutRef);
    setTimeoutRef(null);
  };

  return (
    <div className={c("kdo-container")}>
      <div
        className={c("kdo-page")}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
      <div className={c("kdo-content")}>
        {data[activeData].label}
        {}
      </div>
      <div
        className={c("kdo-page")}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<Test />, rootElement);
