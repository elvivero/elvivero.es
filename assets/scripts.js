/* Contact */
function displaycontact() {
  $( "#contact" ).css("top","60px");
  $( "#back" ).css( "visibility", "visible");
}
function hidecontact() {
  $( "#contact" ).css("top","-500px");
  $( "#contact-link a" ).css( "color", "black");
  $( "#contact-link a" ).css( "background", "transparent");
}

/* Select Menu */
function SelectRedirect() {
  var selects = document.getElementById( "selectormenu" );
  var selectedValue = selects.options[ selects.selectedIndex ].value;
  var element = document.getElementById( "mySelect" );
  if ( selectedValue != "" ) {
    window.location = selectedValue;
  }
}
function displaySelector() {
  $( "#selector" ).css( "left", "95px" );
  $( "#back" ).css( "visibility", "visible" );
}
function hideSelector() {
  $( "#selector" ).css( "left", "-500px" );
  $( "#back" ).css( "visibility", "hidden" );
}

// No drag!
$( "body" ).css( "display", "none" );
window.ondragstart = function() {
  return false;
};

let scrollBody = null; let scrollSelector = null;
function load_scrollbars(){
  scrollBody     = $("body").overlayScrollbars({overflowBehavior:{x:"scroll",y:"hidden"}}).overlayScrollbars();
  scrollSelector = $("#selector").overlayScrollbars({}).overlayScrollbars();
}
$( function() {
  // Scrollbars loading
  load_scrollbars();
  // Lazy loading
  let images = document.querySelectorAll("#content img");
  new LazyLoad(images, {
     root: "body",
     threshold: 500
  });
  // Iframe responsive
  $( "iframe" ).each( function() {
    let el = $( this );
    let p = el.attr( "width" ) / el.attr( "height" );
    el.width( p * el.height() );
    $( window ).resize( function() {
      el.width( p * el.height() );
    } );
  } );
} );

// Arrows scroll control
function xscroll(dir){
  let inst = $("body").overlayScrollbars();
  let delta = 200;
  if(dir=="left"){
    amount = -$(window).width()+delta;
  }
  else if (dir=="right") {
    amount = $(window).width()-delta;
  }
  let end = inst.scroll().x.position + amount;
  inst.scroll({x: end}, 400);

}

$(document).keydown(function(e) {
  let key = e.which;
  if ( key == 37 || key == 38 ){
    xscroll("left");
  }
  if ( key == 39 || key == 40 ){
    xscroll("right");
  }
  e.preventDefault();
});

function isTouchDevice() {
    return 'ontouchstart' in document.documentElement;
}

function update_arrows(scroll,docwidth) {
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

// Arrows vertical responsive
function arrows_position(){
    let content = $(".content").height();
    let scroll_height = 43;
    let position = content/2 + 65 - scroll_height/2;
    $(".scroll").css("top",position+"px");

}

function update_favicon(scroll, docwidth){
  let f = $( "#favicon" );
  if ( $( document ).width() > $( window ).width() ) {
    var n = Math.round( scroll / ( docwidth / 4 ) );
    f.attr( "href", "/assets/img/icons/favicon" + ( n + 1  ) + ".png" );
  }
}

function onscroll() {
  let scroll = scrollBody.scroll().x.position;
  let docwidth = scrollBody.scroll().x.max;
  update_arrows(scroll, docwidth);
  arrows_position();
  update_favicon(scroll, docwidth);
}

$( window ).scroll( onscroll );
setInterval(onscroll, 300);
setInterval(load_scrollbars, 300);
