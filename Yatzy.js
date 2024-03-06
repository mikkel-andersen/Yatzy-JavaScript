export class Yatzy {
  constructor() {
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

    this.dice = [];
    for (let i = 0; i < 5; i++) {
      this.dice.push(new Die());
    }
    this.rollCounter = 0;
  }

  setDice(values) {
    for (let i = 0; i < 5; i++) {
      this.dice[i].value = values[i];
    }
  }

  getRollCounter() {
    return this.rollCounter;
  }

  resetRollCounter() {
    this.rollCounter = 0;
  }

  rollDies() {
    if (this.rollCounter != 3) { 
      this.dice.forEach(die => die.roll());
      this.rollCounter++;
    }
  }

  frequency() {
    let frequency = new Array(7).fill(0);
    this.dice.forEach(die => {
      frequency[die.getValue()]++;
    });
    return frequency;
  } 

  

  Aces() {
    return this.frequency()[1] * 1;
  }

  Twos() {
    return this.frequency()[2] * 2;
  }

  Threes() {
    return this.frequency()[3] * 3;
  }

  Fours() {
    return this.frequency()[4] * 4;
  }

  Fives() {
    return this.frequency()[5] * 5;
  }

  Sixes() {
    return this.frequency()[6] * 6;
  }

  frequency() {
    let frequency = new Array(7).fill(0);
    this.dice.forEach(die => {
      frequency[die.getValue()]++;
    });
    return frequency;
  }

  onePairPoints() {
    let pairPoints = 0;
    let freq = this.frequency();
    for (let i = 1; i < freq.length; i++) {
      if (freq[i] >= 2) {
        if (pairPoints < i * 2) {
          pairPoints = i * 2;
        }
      }
    }
    return pairPoints;
  }

  twoPairPoints() {
  let twoPairPoints = 0;
    let pair = 0;
    let count = 0;
    let freq = this.frequency();
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

  threeSamePoints() {
    let threeSame = 0;
    let freq = this.frequency();
    for (let i = 1; i < freq.length; i++) {
      if (freq[i] >= 3) {
        threeSame = i * 3;
      }
    }
    return threeSame;
  }

  fourSamePoints() {
    let fourSame = 0;
    let freq = this.frequency();
    for (let i = 1; i < freq.length; i++) {
      if (freq[i] >= 4) {
        fourSame = i * 4;
      }
    }
    return fourSame;
  }

  fullHousePoints() {
    let fHouse = 0, fHouse2 = 0, fHouse3 = 0;
    let freq = this.frequency();
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

  smallStraightPoints() {
    let smallStraight = 0;
    let sum = 0;
    let freq = this.frequency();
    for (let i = 0; i < freq.length; i++) {
      if (freq[i] == 1) {
        for (let j = 0; j < this.dice.length; j++) {
          if (this.dice[j].getValue() <= 5 && this.dice[j].getValue() != 6) {
            sum += this.dice[j].getValue();
          }
        }
      }
      if (sum == 15) {
        smallStraight = 15;
      }
    }
    return smallStraight;
  }

  largeStraightPoints() {
    let bigStraight = 0;
    let sum = 0;
    let freq = this.frequency();
    for (let i = 0; i < freq.length; i++) {
      if (freq[i] == 1) {
        for (let j = 0; j < this.dice.length; j++) {
          if (this.dice[j].getValue() <= 6 && this.dice[j].getValue() != 1) {
            sum += this.dice[j].getValue();
          }
        }
      }
      if (sum == 20) {
        bigStraight = 20;
      }
    }
    return bigStraight;
  }

  chancePoints() {
    let chance = 0;
    for (let i = 0; i < this.dice.length; i++) {
      chance += this.dice[i].getValue();
    }
    return chance;
  }

  yatzyPoints() {
    let yatzy = 0;
    let freq = this.frequency();
    for (let i = 1; i < freq.length; i++) {
      if (freq[i] == 5) {
        yatzy = 50;
      }
    }
    return yatzy;
  }
}



