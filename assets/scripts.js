/* Contact */
function displaycontact() {
  $( "#contact" ).css( "visibility", "visible");
  $( "#contact" ).css( "opacity", "1");
  $( "#back" ).css( "visibility", "visible");
  $( "#map-canvas" ).css( "display", "block");
  $( "#contact-link a" ).css( "color", "white");
  $( "#contact-link a" ).css( "background", "black");
}
function hidecontact() {
  $( "#contact" ).css( "visibility", "hidden");
  $( "#contact" ).css( "opacity", "0");
  $( "#back" ).css( "visibility", "hidden");
  $( "#map-canvas" ).css( "display", "none");
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
  $( "#selector" ).css( "visibility", "visible" );
  $( "#selector" ).css( "opacity", "1" );
  $( "#back" ).css( "visibility", "visible" );
  $( "#project-link a" ).css( "color", "white" );
  $( "#project-link a" ).css( "background", "black" );
}
function hideSelector() {
  $( "#selector" ).css( "visibility", "hidden" );
  $( "#selector" ).css( "opacity", "0" );
  $( "#back" ).css( "visibility", "hidden" );
  $( "#project-link a" ).css( "color", "black" );
  $( "#project-link a" ).css( "background", "transparent" );
}

// No drag!
$( "body" ).css( "display", "none" );
window.ondragstart = function() {
  return false;
};

// Iframe responsive
$( function() {
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
  let amount;
  if(dir=="left"){
    amount = -$(window).width()+200;
  }
  else if (dir=="right") {
    amount = $(window).width()-200;
  }
  $('body').animate({scrollLeft: $('body').scrollLeft() + amount}, 200);
}

$(document).keydown(function(e) {
switch(e.which) {
    case 37:
      xscroll("left");
    break;
    case 39:
      xscroll("right");
    break;
}
e.preventDefault(); // prevent the default action (scroll / move caret)
});

function isTouchDevice() {
    return 'ontouchstart' in document.documentElement;
}

function onscroll() {
  var docwidth = $( document ).width() - $( window ).width();
  var scroll = $( "body" ).scrollLeft();
  console.log(scroll);
  var f = $( "#favicon" );

  if ( $( document ).width() > $( window ).width() ) {
    var n = Math.round( scroll / ( docwidth / 4 ) );
    f.attr( "href", "/assets/img/icons/favicon" + ( n + 1  ) + ".png" );
  }
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

$( window ).scroll( onscroll );
setInterval(onscroll, 250);
