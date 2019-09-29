//**************************************************************************
// Sabrina Wilson - LMC 2700 - October 2018
//
// PACKAGES TO INSTALL
// npm install twit
// npm install filtered-followback
//**************************************************************************

//********************* RETWEET #VAMPIRE CONTENT *********************
// Edited from given code - mediaarts replaced with vampire

// Our Twitter library
var Twit = require('twit');

// We need to include our configuration file
var T = new Twit(require('./config.js'));

// This is the URL of a search for the latest tweets on the '#vampire' hashtag.
var vampireSearch = {q: "#vampire", count: 10, result_type: "recent"};

// This function finds the latest tweet with the #vampire hashtag, and retweets it.
function retweetLatest() {
	T.get('search/tweets', vampireSearch, function (error, data) {
	  // log out any errors and responses
	  console.log(error);
	  // If our search request to the server had no errors...
	  if (!error) {
	  	// ...then we grab the ID of the tweet we want to retweet...
		var retweetId = data.statuses[0].id_str;
		// ...and then we tell Twitter we want to retweet it!
		T.post('statuses/retweet/' + retweetId, { }, function (error, response) {
			if (response) {
				console.log('Success! Check your bot, it should have retweeted something.')
			}
			// If there was an error with our Twitter call, we print it out here.
			if (error) {
				console.log('There was an error with Twitter:', error);
			}
		})
	  }
	  // However, if our original search request had an error, we want to print it out here.
	  else {
	  	console.log('There was an error with your hashtag search:', error);
	  }
	});
}

// Try to retweet something as soon as we run the program...
retweetLatest();
// ...and then every hour after that. Time here is in milliseconds, so
// 1000 ms = 1 second, 1 sec * 60 = 1 min, 1 min * 60 = 1 hour --> 1000 * 60 * 60
setInterval(retweetLatest, 1000 * 60 * 30);

//********************* FILTERED FOLLOWBACK *********************
// Based on instructions for using filtered-followback package

var filteredFollowback = require('filtered-followback');

// Ensures you are only following users who follow you
filteredFollowback(
  {
		twitterCreds: require('./config.js'),
  },
  reportResults
);
function reportResults(error) {
	if (error) {
		console.log('Error following back: ', error);
	} else {
		console.log('Follow-back success')
	}
}


//************************** MAKE TWEETS **************************
// My own code, NOT based on a package

// Structure: [character] says: [question]

// Some popular vampire characters
var characters = ['Lestat', 'Angel', 'Spike', 'Akasha', 'Carmilla', 'Drusilla',
							'Marceline', 'Vlad', 'Selene', 'Vampirella', 'Countess Dracula',
							'David Powers', 'Star', 'Michael Emerson', 'Nosferatu'];

// Questions and statements that prompt response/interaction from other users
var questions = [
	'Would you like to be immortal?',
	'Which vampire would you like to spend your life with?',
	'Tell me something spooky!',
	'What would you miss the most if you were cursed with eternal sleep?',
	'What is the spookiest place you know?',
	'What is the spookiest game you have ever played?',
	'What is the spookiest move you have ever seen?',
	'Have you ever seen a ghost?',
	'Have you ever cast a spell?',
	'What is your favorite spooky song?',
	'Post a spooky playlist!',
	'What are you trying to avoid in the haunted forest?',
	'Who would you take through the gates of Hell?',
	'Tell me the wildest urban legend!',
	'Tell me how to make the world spookier!',
	'What potion should I make',
	'What spell should I practice?',
	'I hear footsteps...Who is here?',
	'What was your best Halloween costume?',
	'Tell me a spooky book to read',
	'No werewolf is better than me. Source: me.',
	'Should I find a new castle?',
	'Beautiful moon, beautiful night. Can you see the stars?',
	'Would you stay at my castle during the zombie apocalypse? What would you bring?',
	'What is the scariest emoji combination?',
	'Show me your scariest hairstyle!',
	'What spooky shop should I go to?',
	'Do you have a spooky job?',
	'Tell me a scary story in one tweet!',
	'Is there a spooky house in your neighborhood?',
	'What is your favorite spooky animal? Mine is a bat!',
	'Make a spooky bucket list!',
	'Send me the spookiest sounds you have ever heard!',
	'Have you eaten spooky food??',
	'Where can I get a spooky drink?',
	'Am I scarier than an alien?',
	'If you like garlic you are on thin ice!',
	'Is one little bite such a crime, darlings?',
	'Who should I invite to the castle?',
	'Do you know a secret supernatural creature? Tell me about it!',
	'I got a pet bat! What should I name him?',
	'Do fish have feelings? I vant to drink this blood...',
	'Lets get this blood, darlings!',
	'The full moon?? She really does that!',
	'Stepped out into the cocoon of night to be at peace. Wig!',
	'A leaf fell on my head. A bit damp. Tis the season?',
	'Was I acurately portrayed on the big screen?',
	'Who should I avoid on the streets?!? Trying to avoid getting staked...and bad steak..',
	'Seeing a weird shape in the window...who is she??',
	'Am I a bird?',
	'How to get away with blood on your face? Not a disgrace to me.',
	'Cat got my tongue, darlings. The whole paw was in my mouth.',
	'Have you eaten a frog?',
	'How many days till Halloween? Would like to walk outside incognito',
	'Making some sigils for good luck! Have you tried this?',
	'Which witch should we invite to the castle?',
	'Spoiled carton of blood...will need a plumber after pouring this out for the boys...',
	'What blood type goes with Raisin Brain cereal?',
	'Cannot find the warranty for this coffin. It fell off the rafters one too many times whoops.',
	'Show me your vampiest outfit, darlings!',
	'Heart afflutter at the shrieks and cries outside love my fans',
	'Have you fed a vampire today?',
	'When was the best time in history to be a vampire?',
	'Are you scared easily?',
	'Who moved my coffin',
	'Just stepped in a pumpkin. Did not realize, everything is orange. But that is still red-adjacent I guess.',
	'Put sriracha in your blood for a little spicy action, darlings.',
	'Should I bedazzle my wings?',
	'I can live longer than j.c. why can I not hold a lil cross or some blesseded water',
	'Literally bite me',
	'Hello, darlings',
	'Where can I find the original Ganja & Hess',
	'I follow back darlings',
	'While you cavort through your mundane life, I study Blade.',
	'Interview me at the castle. Hope the moat of bones does not give you much trouble',
	'A motorcycle gang roared past my room. Those Boys must be Lost.',
	'Potatoes and monster mash...yum! Rachel Ray sponsor me.',
	'Dracula Untold deserved better',
	'Literally unfollow if you are a vampire slayer...Sarah Michelle Gellar and Hugh Jackman can stay tho...',
	'A moonlight stroll in the middle of the night...that is the true rainbow road. You may quote me on that.',
	'Strange things afoot in my foot. Might be the usual worms.',
	'Where should us vamps vacation? And do not say the daylight, that is very mean',
	'Did you hear that??',
	'Creak or croak is the next trick or treat',
	'The bubble bath of eternity has soaked into my bones, utterly cleansed, ready to be damned again',
	'Chopped is for the wolves. Where is Bite? Hello Food Network?',
	'Arrested for thought crimes on main...so sorry for mixing the wrong blood types in my head.',
	'Witless is drinking aged blood and getting a spot of plague. Guess who.',
	'I am all bite (not like a werewolf tho). Better.',
	'Edward and Bella Hadid?',
	'Thinking about getting new crystals...which ones are you favorite?',
	'Can zombies eat their own brains?',
	'How do I let the moths in my hair know they are welcome?',
	'Drowned in moonlight, darlings. Effervescent!',
	'Lady Gaga sponsored this tweet (she did not, but I digress).',
	'Lets get this blood!',
	'Can of beetles, noodle of worm. Din din!',
	'Tell me an utterly luxurious song, darling. I want to feed to the melody in my melancholy.',
	'First meal best meal sip sip',
	'I feel the blood coven in the cosmos on this fine evening.',
	'Rolling it (my sage leaves)',
	'Bold of you to assume I will not hark at your love',
	'Fell down the stairs and lost my head. Will someone put it back on?',
	'I am an artifact of the museum of love. Put me on display.',
	'Dancing with the devil is like dancing with myself',
	'Blinded by the daylight hours. She only seems me in the twilight glow.',
	'What is superior to man, but a worm. How he crawls on legs unknown. What a sight!'
];

var c, q, vMsg;
function vampireMessage() {
	// Randomly selects a character and statement to combine into a message
	c = Math.floor(Math.random() * (characters.length - 1));
	q = Math.floor(Math.random() * (questions.length - 1));
	vMsg = characters[c] + ' says: ' + questions[q];

  // Posts the message with 2 unique hashtags to encourage user interaction
	T.post('statuses/update', { status: vMsg + ' #countesscastle ' + ' #tellthecastle' + ' #vampire' }, function(error, response) {
		if (response) {
			console.log('Successful tweeting: ', response);
		} else {
			console.log('Error tweeting: ', error);
		}
	});
}

// Posts a new message every hour
vampireMessage();
setInterval(vampireMessage, 1000 * 60 * 60);
