// scripts.js

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const getDaysInMonth = (date) =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
// Only edit below

const createArray = (length) => {
  const result = [];

  for (let i = 0; i < length; i++) {
    result.push(i + 1);
  }

  return result;
};

const createData = () => {
  const current = new Date();
  current.setDate(1);

  //content of table
  const startDay = current.getDay();
  const daysInMonth = getDaysInMonth(current);

  //structure table
  const weeks = createArray(5);
  const days = createArray(7);

  const result = [];

  for (const weekIndex of weeks) {
    result.push({
      week: weekIndex,
      days: [],
    });

    for (const dayIndex of days) {
      const day = dayIndex + 1 - startDay + (weekIndex - 1) * 7;
      const isValid = day > 0 && day <= daysInMonth;

      result[weekIndex - 1].days.push({
        dayOfWeek: dayIndex,
        value: isValid ? day : "",
      });
    }
  }
  return result;
};

const addCell = (existing, classString, value) => {
  const result = /* html */ `
      ${existing}

      <td class="${classString}">
          &nbsp;${value}&nbsp;
      </td>
  `;

  return result;
};

const createHtml = (data) => {
  let result = "";

  for (const { week, days } of data) {
    let inner = "";
    inner = addCell(inner, "table__cell table__cell_sidebar", `Week ${week}`);

    for (const { dayOfWeek, value } of days) {
      const isToday = new Date().getDate() === value;
      const isWeekend = dayOfWeek === 1 || dayOfWeek === 7;
      const isAlternate = week % 2 === 0;

      let classString = "table__cell";

      if (isToday) classString = `${classString} table__cell_today`;
      if (isWeekend) classString = `${classString} table__cell_weekend`;
      if (isAlternate) classString = `${classString} table__cell_alternate`;
      inner = addCell();
    }

    result = `
            ${result}
            <tr>${inner}</tr>
        `;
  }

  return result;
};

// Only edit above

const current = new Date();
document.querySelector("[data-title]").innerText = `${
  MONTHS[current.getMonth()]
} ${current.getFullYear()}`;

const data = createData();
console.log(data);
document.querySelector("[data-content]").innerHTML = createHtml(data);
