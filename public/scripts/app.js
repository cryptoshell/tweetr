// Client-side JS
$(document).ready(() => {

  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  // Calculates time in minutes, hours or days
  function timeCalculator(time) {
    let passedTime = Date.now() - time; // Date.now() returns milliseconds elapsed since 1 January 1970 00:00:00 UTC
    if (passedTime < 3600000) { // 1000ms * 60s * 60m = 3600000ms
      return(Math.ceil(passedTime / 60000) + " mins ago");
    } else if (passedTime < 86400000) { // 1000ms * 60s * 60m * 24 hrs = 86400000ms
      return (Math.ceil(passedTime / 3600000) + " hrs ago");
    } else {
      return (Math.ceil(passedTime / 86400000) + " days ago");
    }
  }

  // New Jquery object tweet is created
  function createTweetElement(tweet) {
    let $tweet = `
      <article class="tweet">
        <header>
          <img src=${escape(tweet.user.avatars.small)}>
          <h3>${escape(tweet.user.name)}</h3>
          <p>${escape(tweet.user.handle)}</p>
          </header>
          <article>${escape(tweet.content.text)}</article>
        <footer>
          <span class="icons">
          <i class="fa fa-flag" aria-hidden="true"></i>
          <i class="fa fa-retweet" aria-hidden="true"></i>
          <i class="fa fa-heart" aria-hidden="true"></i>
          </span>
          <span>${escape(timeCalculator(tweet.created_at))}</span>
        </footer>
      </article>
      `;
    return $tweet;
  }

  // Each new tweet created above in createTweetElement function is prepended to
  // the tweet-container element
  function renderTweets(tweets) {
    $('.tweet-container').empty();
    tweets.forEach(function(tweet) {
      $('.tweet-container').prepend(createTweetElement(tweet));
    });
  }

  // Fetches tweets by calling renderTweets function
  function loadTweets() {
    $.getJSON('/tweets')
      .done((tweets) => {
        renderTweets(tweets);
      });
  }

  // Ajax used to refresh new tweets asynchronously on webpage
  // Default browser event prevented
  // Conditional statements to alert errors incl. too long and empty tweets
  function handleNewTweet(event) {
    event.preventDefault();
    if ($('textarea').val().length > 140) {
      alert("Your tweet has surpassed the maximum length!");
    } else if ($('textarea').val().length === 0) {
      alert("Your tweet cannot be empty!");
    } else {
      $.ajax({
        type: 'POST',
        url: '/tweets',
        data: $(this).serialize()
      })
        .done(()=> {
          loadTweets();
          $('textarea').val(''); // Reset textarea to blank after posting
          $('form .counter').text(140); // Reset counter to 140 after posting
          setTimeout(function () { alert("Your tweet has been posted successfully!"); }, 400); // Alerts user of successful post
        });
    }
  }

  // Handles event of submitting tweet using the tweet input
  $('#make-tweet').on('submit', handleNewTweet);
  loadTweets();

  // Toggle animation for the compose tweet section
  // Shows when first clicked and hides when clicked again
  $('button').click(function () {
    $('.new-tweet').toggle("slow");
    $('.new-tweet textarea').select(); // Textarea is auto-focused
  });

});
