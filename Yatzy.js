class Die {
    constructor() {
      this.value = 1; 
    }
  
    // Roll the die
    roll() {
      this.value = Math.floor(Math.random() * 6) + 1; 
    }
  
 
    getValue() {
      return this.value;
    }
  }
  
  let dice = [];
  for (let i = 0; i < 5; i++) {
    dice.push(new Die());
  }
  
  /*  
  // And get their values
  dice.forEach(die => console.log(die.getValue()));
  */

  let rollCounter = 0;

  function getRollCounter() {
    return rollCounter;
  }

  function resetRollCounter() {
    rollCounter = 0;
  }

  function rollDies() {
    if (rollCounter != 0) { 
    dice.forEach(die => die.roll());
    rollCounter++;
  }
}

//---Metoder til at udregne slag---//
function Aces(dice) {
    return dice.filter(val => val == 1).length;
}

function Twos(dice) {
    return dice.filter(val => val == 2).length;
}

function Threes(dice) {
    return dice.filter(val => val == 3).length;
}

function Fours(dice) {
    return dice.filter(val => val == 4).length;
}

function Fives(dice) {
    return dice.filter(val => val == 5).length;
}

function Sixes(dice) {
    return dice.filter(val => val == 6).length;
}



function frequency() {
    let frequency = new Array(7).fill(0);
    dice.forEach(die => {
      frequency[die.getValue()]++;
    });
    return frequency;
  } 

  function onePairPoints() {
    let pairPoints = 0;
    let freq = frequency();
    for (let i = 1; i < freq.length; i++) {
      if (freq[i] >= 2) {
        if (pairPoints < i * 2) {
          pairPoints = i * 2;
        }
      }
    }
    return pairPoints;
  }

  function twoPairPoints() {
    let twoPairPoints = 0;
    let pair = 0;
    let count = 0;
    let freq = frequency();
    for (let i = 1; i < freq.length; i++) {
      if (freq[i] >= 2) {
        pair += i * 2;
        count++;
      }
      if (count == 2) {
        twoPairPoints = pair;
      }
    }
    return twoPairPoints;
  }

  function threeSamePoints() {
    let threeSame = 0;
    let freq = frequency();
    for (let i = 1; i < freq.length; i++) {
      if (freq[i] >= 3) {
        threeSame = i * 3;
      }
    }
    return threeSame;
  }

  function fourSamePoints() {
    let fourSame = 0;
    let freq = frequency();
    for (let i = 1; i < freq.length; i++) {
      if (freq[i] >= 4) {
        fourSame = i * 4;
      }
    }
    return fourSame;
  }

  function fullHousePoints() {
    let fHouse = 0, fHouse2 = 0, fHouse3 = 0;
    let freq = frequency();
    for (let i = 0; i < freq.length; i++) {
      if (freq[i] == 3) {
        fHouse3 = i * 3;
      }
    }
    for (let j = 0; j < freq.length; j++) {
      if (freq[j] == 2) {
        fHouse2 = j * 2;
      }
    }
    if (fHouse3 > 0 && fHouse2 > 0) {
      fHouse = fHouse3 + fHouse2;
    }
    return fHouse;
  }

  function smallStraightPoints() {
    let smallStraight = 0;
    let sum = 0;
    let freq = frequency();
    for (let i = 0; i < freq.length; i++) {
      if (freq[i] == 1) {
        for (let j = 0; j < dice.length; j++) {
          if (dice[j].getValue() <= 5 && dice[j].getValue() != 6) {
            sum += dice[j].getValue();
          }
        }
      }
      if (sum == 15) {
        smallStraight = 15;
      }
    }
    return smallStraight;
  }

  function largeStraightPoints() {
    let bigStraight = 0;
    let sum = 0;
    let freq = frequency();
    for (let i = 0; i < freq.length; i++) {
      if (freq[i] == 1) {
        for (let j = 0; j < dice.length; j++) {
          if (dice[j].getValue() <= 6 && dice[j].getValue() != 1) {
            sum += dice[j].getValue();
          }
        }
      }
      if (sum == 20) {
        bigStraight = 20;
      }
    }
    return bigStraight;
  }

  function chancePoints() {
    let chance = 0;
    for (let i = 0; i < dice.length; i++) {
      chance += dice[i].getValue();
    }
    return chance;
  }

  function yatzyPoints() {
    let yatzy = 0;
    let freq = frequency();
    for (let i = 1; i < freq.length; i++) {
      if (freq[i] == 5) {
        yatzy = 50;
      }
    }
    return yatzy;
  }





