var date2 = new Date();

const monthNames = [
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

let month = monthNames[date2.getMonth()];

var year = date2.getUTCFullYear();

console.log(month, year);

$(document).ready(function () {
  document.getElementById("table-date").innerText = month + " " + year;
  document.getElementById("p-date").innerText = month + " " + year;
});
