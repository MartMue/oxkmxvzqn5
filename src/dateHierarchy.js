import {
  endOfMonth,
  endOfYear,
  startOfDay,
  startOfWeek,
  format,
  isWithinInterval,
  eachDayOfInterval,
  eachWeekOfInterval,
  eachMonthOfInterval,
  eachYearOfInterval,
  addDays,
  endOfWeek,
  isWeekend,
  endOfDay,
  addMonths,
  startOfMonth
} from "date-fns";

const currentYear = new Date().getFullYear();

const getYearSlices = interval => {
  const years = eachYearOfInterval(interval);
  return years.map(year => {
    return {
      label: format(year, "yyyy"),
      level: LevelType.YEAR,
      start: year,
      end: endOfYear(year)
    };
  });
};

const getMonthSlicesByYear = interval => {
  const years = getYearSlices(interval);
  return years
    .map(year => {
      const months = eachMonthOfInterval(year);
      return months.map(month => {
        return {
          label: format(month, "MM"),
          level: LevelType.MONTH,
          start: month,
          end: endOfMonth(month)
        };
      });
    })
    .flat();
};

const getMonthSlices = interval => {
  const months = eachMonthOfInterval(interval);
  let container = "";
  return months.map(month => {
    const current = format(month, "yyyy");
    return {
      container: container != current ? (container = current) : null,
      label: format(month, "MMM"),
      level: LevelType.MONTH,
      start: month,
      end: endOfMonth(month)
    };
  });
};

const getWeekSlicesByYear = interval => {
  const years = getYearSlices(interval);
  return years
    .map(year => {
      const weeks = eachWeekOfInterval(year);
      return weeks.map(week => {
        return {
          label: format(week, "I"),
          level: LevelType.WEEK,
          start: week,
          end: endOfWeek(week)
        };
      });
    })
    .flat();
};

const getWeekSlices = interval => {
  const weeks = eachWeekOfInterval(interval);
  let container = "";
  return weeks.map(week => {
    const current = format(week, "MMM yy");
    const item = {
      container: container != current ? (container = current) : null,
      label: format(week, "I"),
      level: LevelType.WEEK,
      start: week,
      end: endOfWeek(week)
    };
    return item;
  });
};

const getDaySlices = interval => {
  const days = eachDayOfInterval(interval);
  let container = "";
  return days.map(day => {
    const current = format(day, "MMM yy");
    const item = {
      container: container != current ? (container = current) : null,
      label: format(day, "dd"),
      level: LevelType.DAY,
      start: day,
      end: endOfDay(day),
      isBlocked: isWeekend(day)
    };
    return item;
  });
};

const getDays = interval => {
  const years = getYearSlices(interval);
  return years
    .map(year => {
      const weeks = eachWeekOfInterval(year);
      return weeks.map(week => {
        return {
          label: format(week, "I"),
          level: LevelType.WEEK,
          start: week,
          end: endOfWeek(week)
        };
      });
    })
    .flat();
};

const interval = {
  start: new Date(currentYear - 3, 0, 1),
  end: new Date(currentYear + 3, 11, 31)
};

export const LevelType = {
  DAY: 0,
  WEEK: 1,
  MONTH: 2,
  YEAR: 3
};

export const getIntervalSize = (level, intervalSize) => {
  switch (level) {
    case LevelType.DAY:
      return 10 * intervalSize;
    case LevelType.WEEK:
      return 30 * intervalSize;
    case LevelType.Month:
      5;
      return 4 * intervalSize;
    default:
      return 1 * intervalSize;
  }
};

export const getDateColumns = (date, level, intervalSize) => {
  const size = getIntervalSize(level, intervalSize);
  switch (level) {
    case LevelType.DAY:
      return getDaySlices({
        start: addDays(date, -size),
        end: addDays(date, size)
      });
    case LevelType.WEEK:
      return getWeekSlices({
        start: startOfWeek(addDays(date, -size)),
        end: endOfWeek(addDays(date, size))
      });
    case LevelType.MONTH:
      return getMonthSlices({
        start: startOfMonth(addMonths(date, -size)),
        end: endOfMonth(addMonths(date, size))
      });
    default:
      return [];
  }
};

// const days = eachDayOfInterval(interval);
// const weeks = eachWeekOfInterval(interval)
// const months = eachDayOfInterval(interval)
// const years = eachYearOfInterval(interval)

// const timeSlice = {
//   label: "2020",
//   level: LevelType.YEAR,
//   start: new Date(2020,0,1),
//   end: new Date(2020,11,31),
// }

// const years = [
//   {
//     label: "2020",
//     level: LevelType.YEAR,
//     start: new Date(2020,0,1),
//     end: new Date(2020,11,31),
//   },
//   {
//     label: "2019",
//     level: LevelType.YEAR,
//     start: new Date(2019,0,1),
//     end: new Date(2019,11,31),
//   }
// ]

const mapDates = obj => ({
  ...obj,
  dates: eachDayOfInterval(obj)
});
const years = getYearSlices(interval).map(year => mapDates(year));

const months = getMonthSlices(interval).map(month => mapDates(month));

const weeks = getWeekSlices(interval).map(week => mapDates(week));

const days = getDaySlices(interval).map(day => mapDates(day));

debugger;
// const indexes = [
//   new Date(2019,4,14),
//   new Date(2021,2,1),
//   new Date(2020,0,1)
// ]

// days.forEach( day => {
//   const slice = indexes.filter( index => isWithinInterval(index, day))
// })
