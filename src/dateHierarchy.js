import {
  endOfMonth,
  endOfYear,
  format,
  isWithinInterval,
  eachDayOfInterval,
  eachWeekOfInterval,
  eachMonthOfInterval,
  eachYearOfInterval,
  addDays,
  endOfWeek,
  isWeekend,
  endOfDay
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

const getMonthSlices = interval => {
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
    const current = format(week, "yyyy");
    const item = {
      container: container != current ? current : null,
      label: format(week, "I"),
      level: LevelType.WEEK,
      start: week,
      end: endOfWeek(week)
    };
    if (container !== current) container = current;
    return item;
  });
};

const getDaySlices = interval => {
  const days = eachDayOfInterval(interval);
  let container = "";
  return days.map(day => {
    const current = format(day, "MMM");
    const item = {
      container: container != current ? current : null,
      label: format(day, "dd"),
      level: LevelType.DAY,
      start: day,
      end: endOfDay(day),
      isBlocked: isWeekend(day)
    };
    if (container !== current) container = current;
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

const LevelType = {
  DAY: 0,
  WEEK: 1,
  MONTH: 2,
  YEAR: 3
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
