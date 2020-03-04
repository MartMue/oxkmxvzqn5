import React, { useState } from "react";
import ReactDOM from "react-dom";
import { format, addDays, isWithinInterval } from "date-fns";

import c from "classnames";

import { LevelType, getDateColumns } from "./dateHierarchy";
import "./styles.css";

const rows = [
  new Date(2020, 2, 15),
  new Date(2020, 1, 29),
  new Date(2020, 0, 1),
  new Date(2020, 5, 22),
  new Date(2020, 1, 25),
  new Date(2020, 2, 24)
].map((date, index) => ({
  label: `Aufgabe ${("0" + index).slice(-2)}`,
  date
}));

const App = () => {
  const [state, setState] = useState({
    index: new Date(),
    intervalSize: 1,
    level: LevelType.DAY
  });

  const handleClick = date => {
    setState({
      ...state,
      index: date
    });
  };

  const dateColumns = getDateColumns(
    state.index,
    state.level,
    state.intervalSize
  );

  return (
    <div className="date-main">
      <div className="date-header">
        <div className="date-row date-menu">
          <div className="date-header">
            <button
              onClick={() =>
                setState({
                  ...state,
                  level:
                    state.level === LevelType.DAY
                      ? LevelType.WEEK
                      : LevelType.WEEK
                      ? LevelType.MONTH
                      : LevelType.MONTH
                })
              }
            >
              UP
            </button>
            <button
              onClick={() =>
                setState({
                  ...state,
                  level:
                    state.level === LevelType.MONTH
                      ? LevelType.WEEK
                      : LevelType.WEEK
                      ? LevelType.DAY
                      : LevelType.DAY
                })
              }
            >
              DOWN
            </button>
            <button
              onClick={() =>
                setState({ ...state, intervalSize: state.intervalSize + 1 })
              }
            >
              INC
            </button>
            <button
              onClick={() => {
                if (state.intervalSize === 1) return;
                setState({ ...state, intervalSize: state.intervalSize - 1 });
              }}
            >
              DEC
            </button>
          </div>
        </div>
        {rows.map(row => {
          return (
            <div className="date-row">
              <div className="date-header">
                <button onClick={() => handleClick(row.date)}>
                  {`${row.label} (${format(row.date, "dd.MM.yyy")}) `}
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
              <div className="date-block">{item.container}</div>
            ))}
          </div>
        </div>
        <div className="date-row">
          <div className="date-items">
            {dateColumns.map(item => (
              <div className="date-block">{item.label}</div>
            ))}
          </div>
        </div>
        {rows.map(row => (
          <div className="date-row">
            <div className="date-items">
              {dateColumns.map(item => (
                <div
                  className={c("date-block", {
                    "date-block-active": isWithinInterval(row.date, item)
                  })}
                  row
                >
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
