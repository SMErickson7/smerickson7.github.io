fetch('mls2021.json')
  .then(response => response.json())
  .then(function(gameData) {
    myFunction(gameData);
  })
  .catch(function(err) {
    console.log('error: ' + err);
  });

var fgTeams = ['New England Revolution', 'Sporting Kansas City', 'Seattle Sounders', 'Colorado Rapids', 'Philadelphia Union', 'Portland Timbers', 'New York City FC', 'Los Angeles Galaxy', 'Real Salt Lake', 'DC United'];


function myFunction(gameData) {
  function comp(a, b) {
    return new Date(a.fixture.date).getTime() - new Date(b.fixture.date).getTime();
  }
  gameData = gameData.sort(comp);
  for (var i = 0; i < fgTeams.length; i++) {
    var tGames = 0;
    for (var k = 0; k < gameData.length; k++) {
    for (var j = 0; j < fgTeams.length; j++) {

        //  console.log(fgTeams[j]);
        if (fgTeams[i] == gameData[k].teams.away.name && fgTeams[j] == gameData[k].teams.home.name || fgTeams[j] == gameData[k].teams.away.name && fgTeams[i] == gameData[k].teams.home.name) {
          tGames = tGames + 1;
          fixturedate = gameData[k].fixture.date;
          fixturedate = dateFormat(fixturedate);
          console.log(fgTeams[i], " vs ", fgTeams[j], " on ", fixturedate);
        }
      }
    }
  }
}


function dateFormat(x) {
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var d = new Date(x);
  var curr_date = d.getDate();
  var curr_month = monthNames[d.getMonth()];
  var curr_year = d.getFullYear();
  var newDate = curr_month + ' ' + curr_date + ", " + curr_year;
  return newDate;
}
