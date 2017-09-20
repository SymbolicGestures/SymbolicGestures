const format = require('date-fns/format');
const parse = require('date-fns/parse');
const eachDay = require('date-fns/each_day');
const isLastDayOfMonth = require('date-fns/is_last_day_of_month')

let fakeSeanGraphDataGenerator = (begDate, endDate) => {
  // let beginningDate = '08/15/17';
  // let todayDate = new Date();
  let tempArr = [];
  let parseBegDate = parse(begDate);
  let parseEndDate = parse(endDate);

  let allDates = eachDay(parseBegDate, parseEndDate);

  let datesInOneMonth = [];
  allDates.forEach((date) => {
    // console.log(date);
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

// let fakeSeanGraphDataGenerator = (begDate, endDate) => {
//   // let beginningDate = '08/15/17';
//   // let todayDate = new Date();
//   let tempArr = [];
//   let parseBegDate = parse(begDate);
//   let parseEndDate = parse(endDate);

//   let allDates = eachDay(parseBegDate, parseEndDate);

//   let datesInOneMonth = [];
//   allDates.forEach((date) => {
//     // console.log(date);
//     datesInOneMonth.push(date);
//     if (isLastDayOfMonth(date)) {
//       tempArr.push(datesInOneMonth);
//       datesInOneMonth = [];
//     }
//   });
//   tempArr.push(datesInOneMonth);

//   let outputArr = tempArr.map((dates) => {
//     let dataForGraph = dates.map((date) => {
//       let formattedDate = format(date, 'ddd, MM/DD/YY');
//       return {
//         appliedDate: formattedDate,
//         howManyApplied: 0,
//       };
//     });
//     return dataForGraph;
//   });
//   return outputArr;
// };

// console.log(fakeSeanGraphDataGenerator('08/01/17', new Date()));

// var result = isLastDayOfMonth(new Date(2014, 1, 28));
// console.log(new Date(2014, 1, 28));

module.exports = fakeSeanGraphDataGenerator;




