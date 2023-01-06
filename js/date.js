var date1 = new Date("06/01/2012");
var date2 = new Date();

// To calculate the time difference of two dates
var Difference_In_Time = date2.getTime() - date1.getTime();

// To calculate the no. of days between two dates
var Difference_In_Days = Math.round(
  Difference_In_Time / (1000 * 3600 * 24 * 365)
);

document.getElementById("date").innerHTML = Difference_In_Days;
