fetch('mls2021.json')
  .then(response => response.json())
  .then(function(gameData) {
    myFunction(gameData);
  })
  .catch(function(err) {
    console.log('error: ' + err);
  });

var fgTeams = ['New England Revolution', 'Sporting Kansas City', 'Seattle Sounders', 'Colorado Rapids', 'Philadelphia Union', 'Portland Timbers', 'New York City FC', 'Los Angeles Galaxy', 'Real Salt Lake', 'DC United'];


var fixTeamLogoArray = [{
    "team": "New England Revolution",
    "value": "ner",
    "id": 1609
  },
  {
    "team": "Sporting Kansas City",
    "value": "skc",
    "id": 1611
  },
  {
    "team": "Seattle Sounders",
    "value": "sea",
    "id": 1595
  },
  {
    "team": "Colorado Rapids",
    "value": "col",
    "id": 1610
  },
  {
    "team": "Philadelphia Union",
    "value": "phi",
    "id": 1599
  }, {
    "team": "Portland Timbers",
    "value": "por",
    "id": 1617
  }, {
    "team": "New York City FC",
    "value": "nycfc",
    "id": 1604
  }, {
    "team": "Los Angeles Galaxy",
    "value": "lag",
    "id": 1605
  }, {
    "team": "Real Salt Lake",
    "value": "rsl",
    "id": 1606
  }, {
    "team": "DC United",
    "value": "dcu",
    "id": 1615
  }, {
    "team": "New York Red Bulls",
    "value": "nyrb",
    "id": 1602
  }
];

function sortByProperty(property) {
  return function(a, b) {
    if (a[property] > b[property])
      return 1;
    else if (a[property] < b[property])
      return -1;

    return 0;
  }
}

fixTeamLogoArray.sort(sortByProperty("team"));
console.log(fixTeamLogoArray);

function genLogoListing(fixTeamLogoArray) {
  let mainContainer = document.getElementById("fixLogosFilter");
  for (let i = 0; i < fixTeamLogoArray.length; i++) {
    let game = document.createElement('img');
    game.id = fixTeamLogoArray[i].value;
    game.src = "https://media.api-sports.io/football/teams/" + fixTeamLogoArray[i].id + ".png";
    game.className = "filterTeams";
    game.onclick = function() { filterFixturesTeam(fixTeamLogoArray[i].team, fixTeamLogoArray[i].value); };
    mainContainer.appendChild(game);
  }
}

genLogoListing(fixTeamLogoArray);

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
          //               console.log(fgTeams[i], " vs ", fgTeams[j], " on ", fixturedate);
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
