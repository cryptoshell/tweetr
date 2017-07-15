// Tweet character counter function
$(document).ready(() => {

  $('textarea').on('keyup', function (event) { // Counter increases by one every keyup event
    let count = $('.counter');
    let counter = 140 - $(this).val().length;
    $('form .counter').text(counter);

    if (counter < 0) {
     count.addClass('warning'); // Counter font becomes red when 140 is exceeded
    } else {
      count.removeClass('warning'); // If counter returns to <140, red font is removed
    }
  });
});
