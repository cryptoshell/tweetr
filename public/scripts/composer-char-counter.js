$(document).ready(function() {

  $("textarea").on("keyup", function (event) {
    let count = $('.counter');
    let counter = 140 - $(this).val().length;
    $('form .counter').text(counter);

    if (counter < 0) {
     count.addClass('warning');
    } else {
      count.removeClass('warning');
    }

  })
});