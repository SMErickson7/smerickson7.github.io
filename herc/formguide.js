fetch('mls2021.json')
  .then(response => response.json())
  .then(function(gameData) {
    addTeams();
    createFormGuide(gameData);
  })
  .catch(function(err) {
    console.log('error: ' + err);
  });

var fgTeams = ['New England Revolution', 'Sporting Kansas City', 'Seattle Sounders', 'Colorado Rapids', 'Philadelphia Union', 'Portland Timbers', 'New York City FC', 'Los Angeles Galaxy', 'Real Salt Lake', 'DC United'];


function createFormGuide(gameData) {
  function comp(a, b) {
    return new Date(a.fixture.date).getTime() - new Date(b.fixture.date).getTime();
  }
  gameData = gameData.sort(comp);
  let mainContainer = document.getElementById("formGuide");

  let team = document.createElement('div');
  let game = document.createElement('div');
  team.innerHTML = '<div class="fg-team" style="margin-bottom: 10px;"><strong>Team</strong></div>';

  for (var i = 0; i < 14; i++) {
    let game = document.createElement('div');
    game.classList.add('fg-cell', 'fg-match');
    round = i + 1;
    game.innerHTML = '<div class="fg-content">' + round + '</div>'
    team.appendChild(game);
  }

  mainContainer.appendChild(team);

  for (var i = 0; i < fgTeams.length; i++) {
    let team = document.createElement('div');
    team.classList.add('fg-row');
    team.innerHTML = '<div class="fg-team">' + fgTeams[i] + '</div>'
    for (var k = 0; k < gameData.length; k++) {
      for (var j = 0; j < fgTeams.length; j++) {

        let game = document.createElement('div');
        game.classList.add('fg-cell');
        if (fgTeams[i] == gameData[k].teams.home.name && fgTeams[j] == gameData[k].teams.away.name || fgTeams[j] == gameData[k].teams.home.name && fgTeams[i] == gameData[k].teams.away.name) {

          if (gameData[k].fixture.status.elapsed == null) {
            game.classList.add('fg-match');
            gameDate = dateFormat(gameData[k].fixture.date);
            game.innerHTML = '<div role="img" class="fg-content gameInfo">&nbsp;<span class="gameInfoText">' + gameData[k].teams.home.name + ' vs ' + gameData[k].teams.away.name + ' <br /> ' + gameDate + '</span></div>';
            team.appendChild(game);
          } else if ((fgTeams[i] == gameData[k].teams.home.name && gameData[k].goals.home > gameData[k].goals.away) || (fgTeams[i] == gameData[k].teams.away.name && gameData[k].goals.away > gameData[k].goals.home)) {
            game.classList.add('fg-win');
            gameDate = dateFormat(gameData[k].fixture.date);
            game.innerHTML = '<div role="img" class="fg-content gameInfo">W<span class="gameInfoText">' + gameData[k].teams.home.name + ' vs ' + gameData[k].teams.away.name + ' <br /> ' + gameDate + '</span></div>';
            team.appendChild(game);
          } else if ((fgTeams[i] == gameData[k].teams.home.name && gameData[k].goals.home < gameData[k].goals.away) || (fgTeams[i] == gameData[k].teams.away.name && gameData[k].goals.away < gameData[k].goals.home)) {
            game.classList.add('fg-loss');
            gameDate = dateFormat(gameData[k].fixture.date);
            game.innerHTML = '<div role="img" class="fg-content gameInfo">L<span class="gameInfoText">' + gameData[k].teams.home.name + ' vs ' + gameData[k].teams.away.name + ' <br /> ' + gameDate + '</span></div>';
            team.appendChild(game);
          } else if ((fgTeams[i] == gameData[k].teams.home.name && gameData[k].goals.home == gameData[k].goals.away) || (fgTeams[i] == gameData[k].teams.away.name && gameData[k].goals.away == gameData[k].goals.home)) {
            game.classList.add('fg-draw');
            gameDate = dateFormat(gameData[k].fixture.date);
            game.innerHTML = '<div role="img" class="fg-content gameInfo">D<span class="gameInfoText">' + gameData[k].teams.home.name + ' vs ' + gameData[k].teams.away.name + ' <br /> ' + gameDate + '</span></div>';
            team.appendChild(game);
          }
          mainContainer.appendChild(team);
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
