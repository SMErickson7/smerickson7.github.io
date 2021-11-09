async function fetchplayoffJSON() {
  const response = await fetch('playoff.json');
  const playoff = await response.json();
  console.log("Success");
  return playoff;
}
fetchplayoffJSON().then(playoff => {
  console.log(playoff[0].fixture.teams.home.winner); // fetched playoff
  console.log(playoff.length);
  for (var i = 0; i < playoff.length; i++) {
    const x = document.getElementById(playoff[i].fixture.id);

    const y = document.getElementById(playoff[i].fixture.id + "-path");
    if (playoff[i].fixture.teams.home.winner == true) {
      let imgName = "logos/" + playoff[i].fixture.teams.home.name.replace(/ /g, "_") + ".png"
      x.setAttribute('href', imgName);
      y.classList.remove("fixture");
      console.log("Success");

    } else if (playoff[i].fixture.teams.away.winner == true) {
      let imgName = "logos/" + playoff[i].fixture.teams.away.name.replace(/ /g, "_") + ".png"
      x.setAttribute('href', imgName);
      y.classList.remove("fixture");
      console.log("Success");

    } else if (playoff[i].fixture.teams.home.winner == null) {
      console.log(playoff[i].fixture.teams.home.name + " vs " + playoff[i].fixture.teams.away.name + " game not started")

    }
  }
});
