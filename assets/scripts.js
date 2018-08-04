/* Contact */
function displaycontact() {
  $( "#contact" ).css( "visibility", "visible" );
  $( "#contact" ).css( "opacity", "1" );
  $( "#back" ).css( "visibility", "visible" );
  $( "#map-canvas" ).css( "display", "block" );
  $( "#contact-link a" ).css( "color", "white" );
  $( "#contact-link a" ).css( "background", "black" );
}
function hidecontact() {
  $( "#contact" ).css( "visibility", "hidden" );
  $( "#contact" ).css( "opacity", "0" );
  $( "#back" ).css( "visibility", "hidden" );
  $( "#map-canvas" ).css( "display", "none" );
  $( "#contact-link a" ).css( "color", "black" );
  $( "#contact-link a" ).css( "background", "transparent" );
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

function onscroll() {
  var docwidth = $( document ).width() - $( window ).width();
  var scroll = $( document ).scrollLeft();
  var f = $( "#favicon" );

  if ( $( document ).width() > $( window ).width() ) {
    var n = Math.round( scroll / ( docwidth / 4 ) );
    f.attr( "href", "/elvivero/assets/img/icons/favicon" + ( n + 1  ) + ".png" );
  }
  if ( scroll < 10 ) {
    $( "#leftscroll" ).css( "visibility", "hidden" );
  } else {
    $( "#leftscroll" ).css( "visibility", "visible" );
  }
  if ( scroll > docwidth - 10 ) {
    $( "#rightscroll" ).css( "visibility", "hidden" );
  } else {
    $( "#rightscroll" ).css( "visibility", "visible" );
  }
}

$( window ).scroll( onscroll );
