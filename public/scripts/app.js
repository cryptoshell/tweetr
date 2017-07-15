// Client-side JS
$(document).ready(() => {

  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function timeCalculator(time) {
    let passedTime = Date.now() - time;
    if (passedTime < 3600000) {
      return(Math.ceil(passedTime/60000 - 3) + " mins ago");
    } else if (passedTime < 86400000) {
      return (Math.ceil(passedTime / 3600000) + " hrs ago");
    } else {
      return (Math.ceil(passedTime/86400000) + " days ago");
    }
  }

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
      `
    return $tweet;
  }

  function renderTweets(tweets) {
    $('.tweet-container').empty();
    tweets.forEach(function(tweet) {
      $('.tweet-container').prepend(createTweetElement(tweet));
    });
  }

  function loadTweets() {
    $.getJSON('/tweets')
    .done((tweets) => {
      renderTweets(tweets);
    })
  }

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
      .done (()=> {
        loadTweets();
        $('textarea').val('');
        setTimeout(function () { alert("Your tweet has been posted successfully!");}, 400);
      })
    }
  }


  $('#make-tweet').on('submit', handleNewTweet);
  loadTweets();

  $('button').click(function () {
    $('.new-tweet').toggle("slow");
    $('.new-tweet textarea').select();
  });

});
