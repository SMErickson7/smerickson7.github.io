var filterMonth = 0;
var filterTeam = 0;

var fgTeams = ['New England Revolution', 'Sporting Kansas City', 'Seattle Sounders', 'Colorado Rapids', 'Philadelphia Union', 'Portland Timbers', 'New York City FC', 'Los Angeles Galaxy', 'Real Salt Lake', 'DC United'];

function fetchData() {
  fetch('mls2021.json')
    .then(function(response) {
      return response.json();
    })
    .then(function(fixdata) {
      appendFixtureData(fixdata);
    })
    .catch(function(err) {
      console.log('error: ' + err);
    });
}
fetchData();

function filterFixturesTeam(x, y) {
  if (filterTeam == x) {
    filterTeam = 0;
  } else {
    filterTeam = x;
  }
  var logoChange = document.getElementById(y);
  logoChange.classList.toggle('filterTeams-active');
  fetchData();
}

function filterFixturesMonth(x, y) {
  if (filterMonth == x) {
    filterMonth = 0;
  } else {
    filterMonth = x;
  }
  var monthChange = document.getElementById(y);
  var rect1 = y.concat("2");
  var rect2 = y.concat("3");
  var rect1Change = document.getElementById(rect1);
  var rect2Change = document.getElementById(rect2);
  monthChange.classList.toggle('toggleMonth');
  rect1Change.classList.toggle('toggleMonthHeader');
  rect2Change.classList.toggle('toggleMonthHeader');
  fetchData();
}

function resetFixtures(x) {
  filterMonth = 0;
  filterTeam = 0;
  fetchData();
}

function appendFixtureData(fixdata) {
  function comp(a, b) {
    return new Date(b.fixture.date).getTime() - new Date(a.fixture.date).getTime();
  }
  fixdata.sort(comp);
  var table = document.getElementById("newFixtureTable");
  table.innerHTML = "";
  let mainContainer = document.getElementById("newFixtureTable");
  for (var k = 0; k < fixdata.length; k++) {
    for (var i = 0; i < fgTeams.length; i++) {
      for (var j = 0; j < fgTeams.length; j++) {
        //  console.log(fgTeams[j]);

        if (fgTeams[i] == fixdata[k].teams.home.name && fgTeams[j] == fixdata[k].teams.away.name || fgTeams[j] == fixdata[k].teams.home.nam && fgTeams[i] == fixdata[k].teams.away.name) {
          var d = new Date(fixdata[k].fixture.date);
          var month = d.getMonth() + 1;
          var hTeam = fixdata[k].teams.home.name;
          var aTeam = fixdata[k].teams.away.name;

          if (month == filterMonth || filterMonth == 0) {
            if (filterTeam == 0 || hTeam == filterTeam || aTeam == filterTeam) {
              let tr1 = document.createElement('tr');
              let tddatevenue = document.createElement('td');

              let tr2 = document.createElement('tr');
              let tdfixture = document.createElement('td');
              let divrow = document.createElement('div');
              let divhomebox = document.createElement('div');
              let divhomecontent = document.createElement('div');
              let divscorebox = document.createElement('div');
              let divscorecontent = document.createElement('div');
              let divawaybox = document.createElement('div');
              let divawaycontent = document.createElement('div');

              tr1.classList.add('fixtureTableRowDate');

              fixturedate = fixdata[k].fixture.date;
              fixturedate = dateFormat(fixturedate);
              venue = fixdata[k].fixture.venue.name;
              venuecity = fixdata[k].fixture.venue.city;
              tddatevenue.innerHTML = fixturedate + '<br/ >' + venue + ', ' + venuecity;
              tddatevenue.classList.add('fixtureTable');
              tddatevenue.classList.add('datevenue');

              tr1.appendChild(tddatevenue);

              tr2.classList.add('fixtureTableRowFixture');
              tdfixture.classList.add('fixtureTable');
              divrow.classList.add('fixturebox');

              divhomebox.classList.add('homebox');
              homeTeamImg = document.createElement('img');
              homeTeamImg.src = fixdata[k].teams.home.logo;
              homeTeamImg.classList.add("homeimg");
              homeTeamImg.setAttribute("alt", fixdata[k].teams.home.name);

              homeTeam = document.createElement('span');
              homeTeam.innerHTML = fixdata[k].teams.home.name;

              divhomecontent.appendChild(homeTeamImg);
              divhomecontent.appendChild(homeTeam);
              divhomecontent.classList.add('homecontent');
              divhomebox.appendChild(divhomecontent);

              homeScore = fixdata[k].goals.home;
              awayScore = fixdata[k].goals.away;


              scoreline = document.createElement('div');
              if (fixdata[k].fixture.status.short == "NS") {
                score = timeFormat(fixdata[k].fixture.date);
                scoreline.innerHTML = score;
              } else if (homeScore == awayScore) {
                scoreline.innerHTML = homeScore + '-' + awayScore;
              } else if (homeScore > awayScore) {
                scoreline.innerHTML = '<span class="win-home-icon"></span>' + homeScore + '-' + awayScore + '<span class="win-away-icon hide-icon">';
              } else {
                scoreline.innerHTML = '<span class="win-home-icon hide-icon"></span>' + homeScore + '-' + awayScore + '<span class="win-away-icon">';
              };

              divscorecontent.appendChild(scoreline);
              divscorecontent.classList.add('scorecontent');
              divscorebox.classList.add('scorebox');
              divscorebox.appendChild(divscorecontent);

              divawaybox.classList.add('awaybox');
              awayTeamImg = document.createElement('img');
              awayTeamImg.src = fixdata[k].teams.away.logo;
              awayTeamImg.classList.add("awayimg");
              awayTeamImg.setAttribute("alt", fixdata[k].teams.away.name);

              awayTeam = document.createElement('span');
              awayTeam.innerHTML = fixdata[k].teams.away.name;

              divawaycontent.appendChild(awayTeam);
              divawaycontent.appendChild(awayTeamImg);
              divawaycontent.classList.add('awaycontent');
              divawaybox.appendChild(divawaycontent);
              divawaybox.classList.add('awaybox');

              divrow.appendChild(divhomecontent);
              divrow.appendChild(divscorebox);
              divrow.appendChild(divawaycontent)

              tdfixture.appendChild(divrow);

              tr2.appendChild(tdfixture);

              mainContainer.appendChild(tr1);
              mainContainer.appendChild(tr2);
            }
          }
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

function timeFormat(x) {
  var d = new Date(x);
  var hour = d.getHours();
  var minutes = d.getMinutes();
  minutes = minutes.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
  })
  if (hour > 12) {
    hour = hour - 12;
    var fixtureTime = hour + ':' + minutes + ' PM';
  } else {
    var fixtureTime = hour + ':' + minutes + ' AM';
  }
  return fixtureTime;
}
