// Client-side JS
$(document).ready(() => {

  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function createTweetElement(tweet) {
    let $tweet = `
      <article id="tweet">
        <header id="tweet-header">
          <img src=${escape(tweet.user.avatars.small)}>
          <h3>${escape(tweet.user.name)}</h3>
          <p>${escape(tweet.user.handle)}</p>
          </header>
          <article>${escape(tweet.content.text)}</article>
        <footer class="footer">
          <span class="icons">
          <i class="fa fa-flag" aria-hidden="true"></i>
          <i class="fa fa-retweet" aria-hidden="true"></i>
          <i class="fa fa-heart" aria-hidden="true"></i>
          </span>
          <span>${escape(tweet.created_at)}</span>
        </footer>
      </article>
      `
    return $tweet;
  }

  function renderTweets(tweets) {
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
