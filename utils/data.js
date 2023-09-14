// prettier-ignore
const thoughts = [
    "I never thought I'd say this, but I think I ate too much bone marrow.",

    "Sometimes I'll start a sentence and I don't even know where it's going. I just hope I find it along the way.",

    "I talk a lot, so I've learned to tune myself out.",

    "Me think, why waste time say lot word, when few word do trick.",

    "It's true. Around this office, in the past, I have been a little abrupt with people. But the doctor said, if I can't find a new way to relate more positively to my surroundings, I'm going to die.",

    "I wanna do a cartwheel. But real casual-like. Not enough to make a big deal out of it, but I know everyone saw it. One stunning, gorgeous cartwheel.",

    "No, I'm not going to tell them about the downsizing. If a patient has cancer, you don't tell them.",

    "I'm not superstitious, but I am a little stitious.",

    "If I don't have some cake soon, I might die.",

    "The worst thing about prison was the dementors.",

    "Do I need to be liked? Absolutely not. I like to be liked. I enjoy being liked. I have to be liked, but it's not like this compulsive need to be liked, like my need to be praised.",

    "Power points are the peacocks of the business world; all show, no meat.",

    "I just want to lie on the beach and eat hot dogs. That's all I've ever wanted.",

    "The only problem is whenever I try to make a taco, I get too excited and crush it.",

    "Who says exactly what they're thinking? What kind of a game is that?",

    "I am running away from my responsibilities. And it feels good.",

    "I don't hate it. I just don't like it at all and it's terrible.",

    "News flash: You are not special.",

    "I say dance, they say, 'How high?'",
];
// prettier-ignore
const usernames = [
    "michaels",
    "dwights",
    "oscarm",
    "jimh",
    "pamb",
    "erinh",
    "kevinm",
    "andyb",
    "tobyf",
    "angelam", 
    "stanleyh"
];

// get random item given array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// gets random username and thought
const getUserThoughts = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      thoughts: getRandomArrItem(thoughts),
      usernames: getRandomArrItem(usernames),
    });
  }
  return results;
};
