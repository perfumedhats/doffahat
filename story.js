const story = {};
story.normalPerson = [
  "a governess pushing a parambulator",
  "an episcopal bishop",
  "a soldier on leave",
  "soldiers on parade",
  "a lively costermonger",
  "a constable making their rounds",
  "a gentleman, with no hat",
  "a woman in a wide-brimmed hat",
  "Her Majesty",
  "a prominent local politician",
  "two journalists, having a conversation",
  "a bishop in a mitre",
  "a line of convicts",
  "a knot of saucer-eyed waifs",
  "a scullery maid, shouting 'gardyloo!'",
  "a rather fetching strumpet",
  "the viscount in a sedan chair",
  "a sailor, eating fish heads and tails",
  "an armed janissary in a turban",
  "the rear admiral in dress uniform",
];
story.normalEncounter = [
  "you pass",
  "you see",
  "you are greeted by",
  "you chance across",
  "you are noticed by",
];
story.weirdEncounter = story.normalEncounter.concat([
  "you are winked at by",
  "you exchange a knowing glance with",
  "you reach for the same umbrella as",
  "you accidentally stare too long at",
]);
story.aftermathEncounter = [
  "you are dimly aware of",
  "you take no notice of",
  "you are surrounded by",
  "you press through",
  "you fight past",
  "you bump against",
];
story.aftermathAtHomePerson = [
  "a blur of hollow faces",
  "a suffocating grey fog",
  "a sudden stillness",
];
story.aftermathPerson = story.aftermathAtHomePerson.concat([
  "the gathering crowds",
  "policemen shouting loudly",
  "faceless bodies, gawking",
]);
story.sadEncounter = [
  "you stare vacantly at",
  "you mumble something you immediately forget to",
  "you try to ignore",
  "you turn around to avoid the haunted eyes of",
  "you do not notice",
  "you think of",
];
story.sadPerson = [
  "the elder Mr. Tronk",
  "Ernest's mother",
  "one of Ernest's sisters",
  "an endless stream of strangers",
  "the formless shadows",
  "the abyss",
  "the silent, enveloping darkness",
  "the hollow men, rats feet over broken glass in a dry cellar",
  "a silent, unfeeling god",
];
story.acts = [
  {
    counter: 6,
    allowImages: true,
    preamble: [
      "on the Sabbath",
      "while hunting in Nantes",
      "on your way to tiffin",
      "during the first bowl of the over (at Wembley)",
      "while carrying a cane and volume of Proust",
      "ascending the steps of parliment",
      "while reaching for your cigarette case",
      "during tiffin on the Seine",
      "at the green grocers",
      "on the promenade",
      "in the foyer of the office",
      "while finding your seat at the opera",
      "during the national anthem",
      "during a lecture on Ovid",
      "onboard Brunel's Great Eastern steamer",
      "while smoking at the club",
      "during your daily constitutional",
      "while smoking a cheroot",
      "during mass",
      "while conversing with the serjeant-at-arms",
      "while dining with the dowadger",
    ],
    encounter: story.normalEncounter,
    person: story.normalPerson,
  },
  {
    counter: 6,
    allowImages: true,
    showDoNothing: true,
    preamble: [
      "after a fit of the whistles",
      "while waiting for a funicular",
      "while entering a funicular",
      "while exiting a funicular",
      "walking along the quay",
      "in a crowded funicular car",
      "on the funicular platform",
    ],
    encounter: story.weirdEncounter,
    person: [
      "Her Majesty",
      "il principe de Monaco",
      "a Japanese salaryman",
      "local fisherman Ernest Tronk",
      "a prominent local fisherman",
      "a procession of mourners",
      "a gang of tattooed stevedors",
      "a porter-bellied pintman",
      "a very inebriated funicular repairman",
      "Mr. Tronk, enjoying the morning air",
      "shriftless churls gathered around a hurdy-gurdy",
    ],
  },
  {
    counter: 8,
    allowImages: true,
    preamble: [
      "after a fit of the whistles",
      "finding yourself daydreaming,",
      "on the way to work",
      "while waiting for a funicular",
      "while entering a funicular",
      "while exiting a funicular",
      "at the docks",
      "in a crowded funicular",
      "in an empty funicular",
      "at the funicular platform",
      "in a tavern",
      "while doffing your hat",
      "while visiting the shipyard after-hours",
      "during the funicular's slow descent",
    ],
    encounter: [
      "you smile at",
      "you exchange gossip with",
      "you are pleased to see",
      "you anticipate meeting",
      "you are winked at by",
      "you exchange a knowing glance with",
      "you reach for the same umbrella as",
      "you accidentally stare too long at",
      "you bump into",
      "you make eyes at",
      "you jovially rib",
    ],
    person: [
      "that roguish charmer Ernest, smelling of the sea",
      "handsome local fisherman Ernest Tronk",
      "prominent local fisherman Ernest Tronk",
      "the salty old sea dog Ernest Tronk",
      "mariner extraordinare, Ernest Tronk",
      "a festive Ernest Tronk, dancing a reel",
      "that irrepressible scallywag Ernest Tronk",
      "one Ernest Tronk, a rapscallion of a herring trawler",
      "Mr. Tronk, enjoying the morning air",
      "that jocund fellow Ernest, up to his old tricks",
      "paragon of bonhomie Ernest Tronk, laughing his salty laugh",
      "Ernest Tronk, playing timeless shanties on his concertina",
    ],
  },
  {
    counter: 1,
    preamble: ["arriving a minute too late for your funicular"],
    encounter: story.weirdEncounter,
    person: story.normalPerson,
  },
  {
    counter: 1,
    preamble: ["reaching the funicular platform just after the doors close"],
    encounter: story.weirdEncounter,
    person: story.normalPerson,
  },
  {
    counter: 1,
    callback: function () {
      state.statusFadeIndex = state.progress;
      fadeAudio();
      state.afterAccident = true;
    },
    preamble: ["stuck on the platform as everyone on begins to shout"],
    encounter: ["you see"],
    person: ["Ernest Tronk in the crowded funicular"],
  },
  {
    counter: 1,
    preamble: ["as the cable on the funicular snaps"],
    encounter: ["you see"],
    person: ["Ernest Tronk in the crowded funicular"],
  },
  {
    counter: 1,
    preamble: ["as the brakes on the funicular fail"],
    encounter: ["you see"],
    person: ["Ernest Tronk"],
  },
  {
    counter: 1,
    preamble: ["as the funicular jumps the tracks"],
    encounter: ["you see"],
    person: ["Ernest Tronk"],
  },
  {
    counter: 1,
    preamble: ["frantically looking for another way down the mountain"],
    encounter: story.aftermathEncounter,
    person: story.aftermathPerson,
  },
  {
    counter: 1,
    preamble: ["riding a stolen bicycle down to the foot of the mountain"],
    encounter: story.aftermathEncounter,
    person: story.aftermathPerson,
  },
  {
    counter: 1,
    preamble: ["upon reaching the bottom of the funicular"],
    encounter: story.aftermathEncounter,
    person: story.aftermathPerson,
  },
  {
    counter: 1,
    preamble: ["jumping over the police barricade"],
    encounter: story.aftermathEncounter,
    person: story.aftermathPerson,
  },
  {
    counter: 1,
    preamble: ["unsure how you got home"],
    encounter: story.aftermathEncounter,
    person: story.aftermathAtHomePerson,
  },
  {
    counter: 1,
    hideDoff: true,
    preamble: ["as the mayor declares a day of mourning"],
    encounter: story.sadEncounter,
    person: story.sadPerson,
  },
  {
    // funeral
    counter: 7,
    preamble: [
      "at the funeral",
      "after the funeral",
      "walking alone at the wharf",
      "riding to work in the new funicular",
      "eating cold food",
      "coughing at the grocer's",
      "scraping toast into the sink",
      "pulling your coat tighter against a cold wind",
      "looking at the cracked skin on your hands",
      "you go to bed early lest",
    ],
    encounter: story.sadEncounter,
    person: story.sadPerson,
  },
  {
    isEndgame: true,
    counter: 10,
    preamble: ["You wake up", "You go to sleep"],
    encounter: [],
    person: [],
  },
];

const observers = {
  people: [
    "the lieutenant",
    "the ambassador",
    "the colonel",
    "the privy councillor",
    "the exchequer",
    "the archbishop",
    "the bishop",
    "the archdeacon",
    "the curate",
    "the vicar",
    "the rector",
    "the steward",
    "the chamberlain",
    "the alderman",
    "the baronet",
    "the baron",
    "the baroness",
    "the viscount",
    "the viscountess",
    "the earl",
    "the countess",
    "the marquess",
    "the marchioness",
    "the duke",
    "the bienfaitrice",
    "the abbess",
    "the mother superior",
    "her grace",
    "the courtiers",
  ],
  attributes: [
    "conduct",
    "etiquette",
    "decorum",
    "comportment",
    "propriety",
    "deportment",
    "civility",
    "saviour-faire",
    "urbanity",
    "refinement",
  ],
  verbs: ["noted", "noticed", "remarked upon", "considered", "observed"],
};

const stations = [
  "leper",
  "pariah",
  "heratic",
  "blasphemer",
  "barbarian",
  "vandal",
  "villain",
  "outlaw",
  "malefactor",
  "knave",
  "churl",
  "cur",
  "wretch",
  "ne'er-do-well",
  "blaggard",
  "ruffian",
  "reprobate",
  "scoundrel",
  "miscreant",
  "thug",
  "malcontent",
  "degenerate",
  "philistine",
  "lout",
  "cad",
  "oaf",
  "dingus",
  "dolt",
  "boor",
  "vagabond",
  "mendicant",
  "roustabout",
  "serf",
  "villein",
  "swineherd",
  "subaltern",
  "plebian",
  "yokel",
  "crofter",
  "rabble",
  "peasant",
  "freeman",
  "yeoman",
  "granger",
  "artisan",
  "page",
  "valet",
  "chief subaltern",
  "apprentice",
  "grognard",
  "beadle",
  "reeve",
  "journeyman",
  "licentiate",
  "liveryman",
  "bailiff",
  "deacon",
  "vice-grognard",
  "clerk",
  "attendant",
  "proctor",
  "esquire",
  "lictor",
  "grognard in chief",
  "provisor",
  "foreman",
  "maître",
  "steward",
  "prime grognard",
  "seneschal",
  "claviger of the keys",
  "reeve",
  "savant",
  "marshal",
  "fellow",
  "preceptor",
  "dean",
  "cyndic",
  "courtier",
  "cavaliere",
  "gentleman",
  "patrician",
  "bourgeoisie",
  "magister",
  "arch-grognard",
  "aristocrat",
  "capitaine",
  "adjutant nobilis",
  "seigneur",
  "burgess",
  "provost",
  "grognard nobilis",
  "advisor",
  "patron",
  "peer",
  "procurator",
  "magistrate",
  "noble",
  "privy grognard",
  "tribune",
  "palatine",
  "proconsul",
  "doge",
  "archon",
  "praetor",
  "pontifex",
  "luminist",
];
