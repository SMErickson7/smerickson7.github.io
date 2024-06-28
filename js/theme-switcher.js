function setStyleSheet(url, color) {
  var stylesheet = document.getElementById("theme-stylesheet");
  var headlogo = document.getElementById("headlogo");
  var hero = document.getElementById("headerIMG");
  stylesheet.setAttribute("href", url);
  headlogo.setAttribute("src", "img/headlogo_" + color + ".png");
  hero.setAttribute(
    "style",
    "background: url(img/headers/header-" + color + ".jpg)"
  );
  Cookies.set("theme", color, { expires: 7 });
  console.log("Cookie: " + color);
}

$(document).ready(function () {
  console.log(Cookies.get("theme"));
  setThemeFromCookie();

  function setThemeFromCookie() {
    if (typeof Cookies.get("theme") !== "undefined") {
      var theme = Cookies.get("theme");
      $("#theme-stylesheet").attr("href", "css/style." + theme + ".css");
      $("#headlogo").attr("src", "img/headlogo_" + theme + ".png");
      $("#headerIMG").attr(
        "style",
        "background: url(img/headers/header-" + theme + ".jpg)"
      );
      console.log("Cookie loaded: " + theme);
    } else {
      Cookies.set("theme", "blue", { expires: 900 });
    }
  }
});
