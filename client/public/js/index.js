(function(){
    $('#msbo').on('click', function(){
      $('body').toggleClass('msb-x');
    });
  }());


//   $('.dropdown-menu li').on('click', function() {
//     var getValue = $(this).text();
//     $('.dropdown-select').text(getValue);
//   });


$(document).ready(function() { 
    if ($(window).width() <=1199 ) {

        $('body').addClass('msb-x');

    }
});