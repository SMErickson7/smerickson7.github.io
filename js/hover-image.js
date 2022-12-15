function highlightMapOn(x, l, t, h, w, br) {
  document.getElementById(x).style.left = l;
  document.getElementById(x).style.top = t;
  document.getElementById(x).style.height = h;
  document.getElementById(x).style.width = w;
  document.getElementById(x).style.borderRadius = br;
  document.getElementById(x).style.display = "block";
  
}

function highlightMapOff(x) {
  document.getElementById(x).style.display = "none";
}
