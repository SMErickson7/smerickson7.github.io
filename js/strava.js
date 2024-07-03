function highlightMapOn(x) {
  let overlayDiv = document.getElementById(x);
  overlayDiv.classList.toggle("change");
  for (let i = 1; i < 7; i++) {
    let textoverlayDiv = document.getElementById("textoverlay" + i);
    let divID = "point" + i;
    if (divID != x) {
      textoverlayDiv.classList.toggle("change");
    }
  }
}

function highlightMapOff(x) {
  let overlayDiv = document.getElementById(x);
  overlayDiv.classList.toggle("change");
  for (let i = 1; i < 7; i++) {
    let textoverlayDiv = document.getElementById("textoverlay" + i);
    textoverlayDiv.classList.remove("change");
  }
}

$(document).ready(function () {
  // Add minus icon for collapse element which is open by default
  $(".collapse.show").each(function () {
    $(this).prev(".card-header").find(".fa").addClass("fa-minus").removeClass("fa-plus");
  });

  // Toggle plus minus icon on show hide of collapse element
  $(".collapse")
    .on("show.bs.collapse", function () {
      $(this).prev(".card-header").find(".fa").removeClass("fa-plus").addClass("fa-minus");
    })
    .on("hide.bs.collapse", function () {
      $(this).prev(".card-header").find(".fa").removeClass("fa-minus").addClass("fa-plus");
    });
});

function changeDistanceImage(x) {
  let src = document.getElementById("map-remaining").src;
  if (src.includes("dark-mode")) {
    let source = "img/portfolio/strava/new/redesign-dark-mode-map-" + x + ".png";
    document.getElementById("map-remaining").src = source;
  } else {
    let source = "img/portfolio/strava/new/redesign-map-" + x + ".png";
    document.getElementById("map-remaining").src = source;
  }
  document.getElementById("remaining").classList.remove("active");
  document.getElementById("total").classList.remove("active");
  document.getElementById("progressbar").classList.remove("active");
  document.getElementById(x).classList.add("active");
}

function toggleDarkModeMap() {
  let src = document.getElementById("map-remaining").src;
  src = src.split("/img").pop();
  console.log(src);
  switch (src) {
    case "/portfolio/strava/new/redesign-map-remaining.png":
      document.getElementById("map-remaining").src = "img/portfolio/strava/new/redesign-dark-mode-map-remaining.png";
      document.getElementById("mapDarkModeToggle").classList.remove("fa-toggle-off");
      document.getElementById("mapDarkModeToggle").classList.add("fa-toggle-on");
      break;
    case "/portfolio/strava/new/redesign-map-total.png":
      document.getElementById("map-remaining").src = "img/portfolio/strava/new/redesign-dark-mode-map-total.png";
      document.getElementById("mapDarkModeToggle").classList.remove("fa-toggle-off");
      document.getElementById("mapDarkModeToggle").classList.add("fa-toggle-on");
      break;
    case "/portfolio/strava/new/redesign-map-progressbar.png":
      document.getElementById("map-remaining").src = "img/portfolio/strava/new/redesign-dark-mode-map-progressbar.png";
      document.getElementById("mapDarkModeToggle").classList.remove("fa-toggle-off");
      document.getElementById("mapDarkModeToggle").classList.add("fa-toggle-on");
      break;
    case "/portfolio/strava/new/redesign-dark-mode-map-remaining.png":
      document.getElementById("map-remaining").src = "img/portfolio/strava/new/redesign-map-remaining.png";
      document.getElementById("mapDarkModeToggle").classList.remove("fa-toggle-on");
      document.getElementById("mapDarkModeToggle").classList.add("fa-toggle-off");
      break;
    case "/portfolio/strava/new/redesign-dark-mode-map-total.png":
      document.getElementById("map-remaining").src = "img/portfolio/strava/new/redesign-map-total.png";
      document.getElementById("mapDarkModeToggle").classList.remove("fa-toggle-on");
      document.getElementById("mapDarkModeToggle").classList.add("fa-toggle-off");
      break;
    case "/portfolio/strava/new/redesign-dark-mode-map-progressbar.png":
      document.getElementById("map-remaining").src = "img/portfolio/strava/new/redesign-map-progressbar.png";
      document.getElementById("mapDarkModeToggle").classList.remove("fa-toggle-on");
      document.getElementById("mapDarkModeToggle").classList.add("fa-toggle-off");
      break;
    default:
      console.log("it didn't work");
      break;
  }
  /*if (src.includes("dark-mode")) {
    let source = "img/portfolio/strava/new/redesign-" + x + ".png";
    document.getElementById(x).src = source;
  } else {
    let source = "img/portfolio/strava/new/redesign-dark-mode-" + x + ".png";
    document.getElementById(x).src = source;
  }*/
}

function toggleDarkMode(x) {
  let src = document.getElementById(x).src;
  if (src.includes("dark-mode")) {
    let source = "img/portfolio/strava/new/redesign-" + x + ".png";
    document.getElementById(x).src = source;
  } else {
    let source = "img/portfolio/strava/new/redesign-dark-mode-" + x + ".png";
    document.getElementById(x).src = source;
  }
}
