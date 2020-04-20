/*
Javascript para corregir la visualización de las listas cuando son muy largas o están vacías.
*/

window.onload = function(e) {
  if (document.body.clientHeight < window.innerHeight) {
    var footer = document.getElementsByClassName("menu footer noMargin");
    footer[0].style.position = "fixed";
  }
  try {

    var table = document.getElementsByTagName("table")[0];
    var container = document.getElementsByClassName("scrolls")[0];
    console.log(table.clientWidth, container);

    if (table.clientWidth <= container.clientWidth) {
      table.style.overflowX = "visible";
    }
  } catch (e) {
    console.log(e);
  }
};
