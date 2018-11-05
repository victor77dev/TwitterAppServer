# TwitterAppServer
This is Twitter API for getting tweets from Twitter Timeline.

# Api path
Server: https://polar-elf-214323.appspot.com/api/{twitter_name}

E.g. https://polar-elf-214323.appspot.com/api/twitterapi,
for https://twitter.com/twitterapi

# Return Value
Array of tweets data for the twitter account will be returned, includes tweet id, tweet content, tweet created time,
tweet user, orignal tweet user for retweet

# Return format
[{

id: tweet id,

time: tweet created time,

text: tweet content,

username: tweet user name,

retweet: if this is a retweet,

orgUsername: orignal tweet user name for retweet

}, ...]
