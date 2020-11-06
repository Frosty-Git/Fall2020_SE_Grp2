

const leafletMap = new Map();
var mymap;
async function setupMap() {
    mymap = await leafletMap.setup();
}
setupMap();

var d = new Date("2020-10-20T04:00:00.000Z");
console.log(d);
//86400000 milliseconds is a day

// var d = new Date(2020, 1, 14);
// console.log(d);
// d = addDay(d);
// console.log(d);

// function addDay(date) {
//     var result = new Date(date);
//     result.setDate(result.getDate() + 1);
//     return result;
//   }

// var dateMilli = Date.parse(d);
// console.log(dateMilli);
// var backToDate = addDayMilli(dateMilli);
// console.log(backToDate);

// function addDayMilli(milliDate) {
//    var newDate = new Date(milliDate + 86400000);
//    return newDate;
// }

// //formatted
// var curr_month = backToDate.getMonth() + 1; //Months are zero based
// var curr_date = backToDate.getDate();
// var curr_year = backToDate.getFullYear();
// var dateString = curr_month + "/" + curr_date + "/" + curr_year;
// console.log(dateString);