'use strict';

const rank = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

exports.getWinner = function (args, res, next) {
  let result = [];
  let games = args.body.value;
  for (let i = 0; i < games.length; i++) {
    let game = games[i];
    
    if (!checkPlays(game.plays)) {
      result.push("The game has been rigged");
    } else {
      result.push(resolveGame(game))
    }
  }
  res.json(result);
  res.end();
}

const checkPlays = (plays) => {
  let cards = {
    C: {},
    D: {},
    H: {},
    S: {}
  };
  let list = plays.map(x => x.cards);
  list = [].concat.apply([], list);
  for (let i = 0; i < list.length; i++) {
    let value = list[i].value;
    let suit = list[i].suit;

    if (cards[suit][value] === undefined) {
      cards[suit][value] = 1;
    } else {
      return false;
    }
  }

  return true;
};

const resolveGame = (game) => {

  let plays = game.plays;
  let score = {};
  let result;
  let jackpot = 0;

  for (let i = 0; i < plays.length; i++) {
    let play = plays[i];
    play.result = getResult(play.cards)
    jackpot += play.bet;
  }
  jackpot += game.jackpot;

  if (plays.length < 3){
    result = getStringResult(plays[0],plays[1], jackpot);
  } else {
    plays.sort(compareResults)
    result = getStringResult(plays[0],plays[1], jackpot);
  }

  return result;
}

const getStringResult = (play1,play2, jackpot) => {
  let compare = compareResults(play1,play2);
  let result;
  if (compare > 0){
    result = play1.player + " wins " + jackpot;
  } else if (compare < 0) {
    result = play2.player + " wins " + jackpot;
  } else {
    result = "Tie"
  }
  return result;
};

const compareCards = (x, y) => {
  let xRank = rank.indexOf(x.value);
  let yRank = rank.indexOf(y.value);

  if (xRank === -1){
    xRank = x;
    yRank = y;
  }

  if (xRank > yRank) {
    return 1;
  } else if (xRank < yRank) {
    return -1;
  } else {
    return 0;
  }
}

const compareResults = (x, y) => {

  let xResult = x.result;
  let yResult = y.result;
  let greaterCard;
  if (xResult.score > yResult.score) {
    return 1;
  } else if (xResult.score < yResult.score) {
    return -1;
  } else {
    for (let i = 0; i < xResult.values.length; i++){
      greaterCard = compareCards(xResult.values[i], yResult.values[i]);
      if (greaterCard > 0) {
        return 1;
      } else if (greaterCard < 0) {
        return -1;
      }
    }
    return 0;
  }
}

const getResult = (cards) => {

  let result;
  let straight, flush, fourOfAKind, threeOfAKindOrFull, twoPair, onePair;
  let values;

  cards.sort(compareCards);       // We use the order of cards on the below methods
  cards.reverse();                // that get the kind of the hand.
  values = cards.map(x => x.value)
  
  straight = isStraight(values);
  flush = isFlush(cards, values);

  if (straight && flush) { // Straight Flush
    result = { score: 9, values: straight.value };
  } else if (flush) {
    result = (flush);
  } else if (straight) {
    result = straight;
  } else if (fourOfAKind = isFourOfAKind(values)) {
    result = fourOfAKind;
  } else if (threeOfAKindOrFull = isThreeOfAKindOrFull(values)) {
    result = threeOfAKindOrFull;
  } else if (twoPair = isTwoPair(values)) {
    result = twoPair;
  } else if (onePair = isOnePair(values)) {
    result = onePair;
  } else { // Greater card
    result = { score: 1, values: values };
  }
  return result;
}

/* HANDS */

const isFlush = (cards, values) => {
  let suit = cards[0].suit;
  for (let i = 0; i < cards.length; i++) {
    if (suit != cards[i].suit) {
      return false;
    }
  }

  return { score: 6, values: values };
}

const isStraight = (cardsValues) => {
  let result;
  let values = cardsValues.map( x => rank.indexOf(x));
  let value = values[0];

  result = { score: 5, values: [value[0]] }
  for (let i = 1; i < values.length; i++) {
    if (values[i] != value - 1) {
      result = false;
      break;
    }
    value = values[i];
  }
  return result;
}

const isOnePair = (values) => {
  let result, rest;

  if (values[0] === values[1]) {                        // PPXYZ
    rest = values.slice(2, 5)
    result = {
      score: 2,
      values: [values[0]].join(rest)
    };
  } else if (values[1] === values[2]) {                 // XPPYZ
    rest = values.slice(0, 1).join(values.slice(3, 5));
    result = {
      score: 2,
      values: [values[1]].join(rest)
    };
  } else if (values[2] === values[3]) {                 // XYPPZ
    rest = values.slice(0, 2).join(values.slice(4, 5));
    result = { 
      score: 2, 
      values: [values[2]].join(rest) 
    };
  } else if (values[3] === values[4]) {                 // XYZPP
    rest = values.slice(0, 3);
    result = { 
      score: 2, 
      values: [values[3]].join(rest) 
    }
  } else {
    result = false;
  }
  return result;
}

const isTwoPair = (values) => {
  let result;

  if (values[0] === values[1] && values[2] === values[3]) {         // PPQQX
    result = {
      score: 3,
      values: [values[0], values[2], values[4]]
    };
  } else if (values[0] === values[1] && values[3] === values[4]) {  // PPXQQ 
    result = {
      score: 3,
      values: [values[0], values[3], values[2]]
    };
  } else if (values[1] === values[2] && values[3] === values[4]) {  // XPPQQ
    result = {
      score: 3,
      values: [values[1], values[3], values[0]]
    };
  } else {
    result = false;
  }
  return result;
}

const isThreeOfAKindOrFull = (values) => {
  let result;

  if (values[0] === values[2]) {          // PPPXY
    result = {
      score: 4,
      values: [values[0], values[3], values[4]]
    };
  } else if (values[1] === values[3]) {  // XPPPY 
    result = {
      score: 4,
      values: [values[1], values[0], values[4]]
    };
  } else if (values[2] === values[4]) {  // XYPPP
    result = {
      score: 4,
      values: [values[2], values[0], values[1]]
    };
  } else {
    result = false;
  }

  if (result && result.values[1] === result.values[2]){ // Full
    result = {
      score: 7,
      values: [result.values[0], result.values[1]]
    };
  }

  return result;
}

const isFourOfAKind = (values) => {
  let result;

  if (values[0] === values[3]) {         // PPPPX
    result = {
      score: 8,
      values: [values[0], values[4]]
    };
  } else if (values[1] === values[4]) {  // XPPPP 
    result = {
      score: 8,
      values: [values[1], values[0]]
    };
  } else {
    result = false;
  }
  return result;
}