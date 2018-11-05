var express = require('express');
const OAuth = require('oauth');

const config = require('../config.json');

var router = express.Router();

/* GET users listing. */
router.get('/:twitterName', function(req, res, next) {
  const { twitterName } = req.params;
  const baseUrl = 'https://api.twitter.com/1.1/statuses';
  const reqUrl = `${baseUrl}/user_timeline.json?screen_name=${twitterName}`;

  const consumerKey = config.consumerKey;
  const consumerSecret = config.consumerSecret;
  const userToken = config.userToken;
  const userSecret = config.userSecret;

  const oauth = new OAuth.OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    consumerKey,
    consumerSecret,
    '1.0A',
    null,
    'HMAC-SHA1'
  );

  oauth.get(reqUrl,
    userToken,
    userSecret,
    function(error, data, response) {
      if (error) console.log(error);
      const tweets = JSON.parse(data);
      const tweetsData = tweets.map((tweet) => {
        const { text, created_at: time, id, user, retweeted_status: retweetObj } = tweet;
        const { screen_name: username } = user;
        let orgUsername = null;
        if (retweetObj) {
          const { user: retweetUser } = retweetObj;
          const { screen_name: retweetUsername } = retweetUser;
          orgUsername = retweetUsername;
        }
        const tweetData = { id, time, text, username, retweet: retweetObj !== null, orgUsername };
        return tweetData;
      })
      res.send(tweetsData);
    }
  )
});

module.exports = router;
