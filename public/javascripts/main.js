window.onload = function(e) {
  console.log(document.body.clientHeight, window.innerHeight);
  if (document.body.clientHeight < window.innerHeight) {
    var footer = document.getElementsByClassName("menu footer noMargin");
    footer[0].style.position = "fixed";
  }
  try {
    console.log("ola");

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
