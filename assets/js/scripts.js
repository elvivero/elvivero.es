/* Contact */
function displaycontact() {
  document.getElementById("contact").style.visibility = "visible";
  document.getElementById("back").style.visibility = "visible";
  document.querySelector("#contact-link a").classList.add("selected");
}
function hidecontact() {
  document.getElementById("contact").style.visibility = "hidden";
  document.getElementById("back").style.visibility = "hidden";
  document.querySelector("#contact-link a").classList.remove("selected");
}

function displaySelector() {
  document.getElementById("selector").style.visibility = "visible";
  document.getElementById("back").style.visibility = "visible";
  document.querySelector("#project-link a").classList.add("selected");
  scrollConverter.deactivate();
}

function hideSelector() {
  document.getElementById("selector").style.visibility = "hidden";
  document.getElementById("back").style.visibility = "hidden";
  document.querySelector("#project-link a").classList.remove("selected");
  scrollConverter.activate();
}


// No drag!
window.ondragstart = function() {
  return false;
};
function responsive(){
  /*
  let n = $(window).height() - 165;
  $( "#content img" ).each( function() {
    let img = $(this);
    $(this).height(n);
  });
  */

  $( "iframe" ).each( function() {
    let el = $( this );
    let prop;
    if (typeof el.attr("prop") !== 'undefined'){
      prop = el.attr("prop");
    }
    else{
      prop = Math.round(el.attr( "width" ) / el.attr( "height" )*1000)/1000;
      el.attr("prop",prop);
    }
    let n = el.height() * prop;
    if(n != el.width()){
      el.width(n);
    }
  });
}

// Arrows scroll control
function xscroll(dir){
  let delta = 200;
  let amount;
  if(dir=="left"){
    amount = -$(window).width()+delta;
  }
  else if (dir=="right") {
    amount = $(window).width()-delta;
  }
  window.scrollBy(amount, 0);
}
/*
window.onmousemove = function (){
  let m = 10;
  let x = window.event.clientX;
  let w = window.innerWidth;
  let bw = document.body.scrollWidth;
  window.scroll(x/w*bw,0);
}
*/

function isTouchDevice(){return 'ontouchstart' in document.documentElement;}

/* function update_arrows(scroll,docwidth) {
  if (isTouchDevice()){
    $( "#leftscroll" ).css( "visibility", "hidden" );
    $( "#rightscroll" ).css( "visibility", "hidden" );
  }
  else {
    if ( scroll < 100) {
      $( "#leftscroll" ).css( "visibility", "hidden" );
    } else {
      $( "#leftscroll" ).css( "visibility", "visible" );
    }
    if ( scroll > docwidth - 100) {
      $( "#rightscroll" ).css( "visibility", "hidden" );
    } else {
      $( "#rightscroll" ).css( "visibility", "visible" );
    }
  }
}
*/
// Arrows vertical responsive
function arrows_position(){
    let content = $("#content").height();
    let scroll_height = 43;
    let position = content/2 + 65 - scroll_height/2;
    $(".scroll").css("top",position+"px");
} 


function onScroll() {
//  update_arrows(scroll, docwidth);
   arrows_position();
//  update_favicon(scroll, docwidth);
  responsive();
}
$(window).on("resize",onScroll());
$(window).on("scroll",onScroll());
setInterval(onScroll, 300);
scrollConverter.activate();
