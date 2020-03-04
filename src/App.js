import React, { useRef } from "react";
import ReactDOM from "react-dom";
import { format, addDays } from "date-fns";

import "./styles.css";
import DateBox from "./DateBox";
import useIntersect from "./useIntersect";

const dateColumns = [];

let date = new Date(2020, 0, 1);
const end = date.getFullYear() + 1;
console.log(date);
const toIndex = date =>
  date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();

while (date.getFullYear() < end) {
  dateColumns.push({
    index: toIndex(date),
    date: date,
    label: format(date, "dd.MM.yyyy")
  });
  date = addDays(date, 1);
}

console.log("hello");

const generateRow = date => {
  const id = toIndex(date);
  return {
    id: `item-${id}`,
    label: `${format(date, "dd.MM.yyy")}`,
    index: id
  };
};

const refs = dateColumns.reduce((acc, item) => {
  acc[item.index] = React.createRef();
  return acc;
}, {});

const handleClick = index => {
  refs[index].current.scrollIntoView({
    behavior: "smooth",
    inline: "center"
  });
};

const onChange = isVisible => {
  console.log(isVisible);
};

const rows = [
  new Date(2020, 2, 15),
  new Date(2020, 1, 29),
  new Date(2020, 3, 1),
  new Date(2020, 1, 29),
  new Date(2020, 3, 1),
  new Date(2020, 1, 29),
  new Date(2020, 3, 1),
  new Date(2020, 1, 29),
  new Date(2020, 3, 1),
  new Date(2020, 1, 29),
  new Date(2020, 3, 1),
  new Date(2020, 1, 29),
  new Date(2020, 3, 1),
  new Date(2020, 1, 29),
  new Date(2020, 3, 1),
  new Date(2020, 3, 30)
].map(date => generateRow(date));

const testIndex = 20200315;

const App = () => {
  return (
    <div className="date-main">
      <div className="date-header">
        <div className="date-row">
          <div className="date-header">
            <span>2020</span>
          </div>
        </div>
        {rows.map(row => {
          return (
            <div className="date-row">
              <div className="date-header">
                <button onClick={() => handleClick(row.index)}>
                  Scroll to {row.label}
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="date-content">
        <div className="date-row">
          <div className="date-items">
            {dateColumns.map(item => (
              <div ref={refs[item.index]} className="date-block">
                {item.label}
              </div>
            ))}
          </div>
        </div>
        {rows.map(row => (
          <div className="date-row">
            <div className="date-items">
              {dateColumns.map(item => (
                <div className="date-block">{item.label}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
