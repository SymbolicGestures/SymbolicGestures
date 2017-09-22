const format = require('date-fns/format');
const parse = require('date-fns/parse');
const eachDay = require('date-fns/each_day');
const isLastDayOfMonth = require('date-fns/is_last_day_of_month')

let dateAppliedGraphDataGenerator = (begDate, endDate) => {
  // let beginningDate = '08/15/17';
  // let todayDate = new Date();
  let tempArr = [];
  let parseBegDate = parse(begDate);
  let parseEndDate = parse(endDate);

  let allDates = eachDay(parseBegDate, parseEndDate);

  let datesInOneMonth = [];
  allDates.forEach((date) => {
    datesInOneMonth.push(date);
    if (isLastDayOfMonth(date)) {
      tempArr.push(datesInOneMonth);
      datesInOneMonth = [];
    }
  });
  tempArr.push(datesInOneMonth);

  let outputArr = tempArr.map((dates) => {
    let dataForGraph = dates.map((date) => {
      let formattedDate = format(date, 'ddd, MM/DD/YY');
      let randomNum = Math.floor(Math.random() * 10);
      return {
        appliedDate: formattedDate,
        howManyApplied: randomNum,
      };
    });
    return dataForGraph;
  });


  return outputArr;
};

module.exports = dateAppliedGraphDataGenerator;




