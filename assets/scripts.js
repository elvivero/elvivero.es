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



  // No drag!
  $( "body" ).css( "display", "none" );
  window.ondragstart = function() {
    return false;
  };

$( function() {
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
