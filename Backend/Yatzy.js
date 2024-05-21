


export class Yatzy {

  constructor() {

    class Die {
      constructor() {
        this.value = 1;
        this.held = false;
      }

      // Roll the die
      roll() {
        this.value = Math.floor(Math.random() * 6) + 1;
        console.log('kastet terninger ' + this.value);
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

  rollDies() {
    if (this.rollCounter != 3) {
      this.dice.forEach(die => {
        if (!die.held) { // Only roll the die if it's not held
          die.roll();
        }
      });

      this.rollCounter++;

     /* this.dice.forEach(function (die, index) {
        document.getElementById('dice' + (index + 1)).src = 'img/die' + die.getValue() + '.png';
      });

      this.updateFields();

      // Update the roll counter display
      document.querySelector('#rollCounter').textContent = 'Rolls: ' + this.rollCounter;

      if (this.rollCounter === 3) {
        let rollButton = document.querySelector('#rollButton');
        rollButton.disabled = true;
      }*/
    }
  }

  uncheckAllDice() {
    this.dice.forEach((die, index) => {
      die.held = false;
      let dieElement = document.getElementById('dice' + (index + 1));
      if (dieElement.classList.contains('held')) {
        dieElement.classList.remove('held');
      }
    });
  }

  getRollCounter() {
    return this.rollCounter;
  }

  resetRollCounter() {
    this.rollCounter = 0;
  }

  calculateSum() {
    let fieldNames = ['aces', 'twos', 'threes', 'fours', 'fives', 'sixes'];
    let sum = 0;
    fieldNames.forEach((fieldName) => {
      let field = document.getElementById(fieldName);
      if (field.disabled) { // Only add the value if the field is disabled (i.e., a score has been saved)
        sum += parseInt(field.value, 10);
      }
    });
    document.getElementById('sum').value = sum;
    if (sum >= 63) {
      document.getElementById('bonus').value = 50;
    }
  }

  updateFields() {
    let results = this.getResults();
    let fieldNames = ['aces', 'twos', 'threes', 'fours', 'fives', 'sixes', 'onePair', 'twoPairs', 'threeOfAKind', 'fourOfAKind', 'fullHouse', 'smallStraight', 'bigStraight', 'chance', 'yatzy'];
    fieldNames.forEach((fieldName, index) => {
      let field = document.getElementById(fieldName);
      if (!field.disabled) {
        field.value = results[index];
      }

      // Only add the event listener the first time updateFields is called
      if (!field.onclick) {
        field.onclick = () => {
          field.disabled = true;
          this.uncheckAllDice(); // Uncheck all dice
          this.resetRollCounter();
          document.getElementById('rollCounter').textContent = 'Rolls: 0';
          let rollButton = document.querySelector('#rollButton');
          rollButton.disabled = false;

          // Calculate the sum
          this.calculateSum();

          // Calculate the total score after a slight delay
          setTimeout(() => this.calculateTotal(), 10);
        };
      }
    });
  }

  calculateTotal() {
    let fieldNames = ['onePair', 'twoPairs', 'threeOfAKind', 'fourOfAKind', 'fullHouse', 'smallStraight', 'bigStraight', 'chance', 'yatzy'];
    let total = 0;
    let allFieldsDisabled = true;
    fieldNames.forEach((fieldName) => {
      let field = document.getElementById(fieldName);
      if (field.disabled) { // Only add the value if the field is disabled (i.e., a score has been saved)
        total += parseInt(field.value, 10);
      } else {
        allFieldsDisabled = false;
      }
    });
    total += parseInt(document.getElementById('sum').value, 10) || 0;
    total += parseInt(document.getElementById('bonus').value, 10) || 0;
    document.getElementById('total').value = total;

    if (allFieldsDisabled) {
      let newGame = window.confirm("All fields are filled. Do you want to start a new game?");
      if (newGame) {
        this.resetGame();
      }
    }
  }

  frequency() {
    let frequency = new Array(7).fill(0);
    this.dice.forEach(die => {
      frequency[die.getValue()]++;
    });
    return frequency;
  }

  getResults() {
    let results = new Array(15);
    for (let i = 0; i <= 5; i++) {
      results[i] = this.sameValuePoints(i + 1);
    }
    results[6] = this.onePairPoints();
    results[7] = this.twoPairPoints();
    results[8] = this.threeSamePoints();
    results[9] = this.fourSamePoints();
    results[10] = this.fullHousePoints();
    results[11] = this.smallStraightPoints();
    results[12] = this.largeStraightPoints();
    results[13] = this.chancePoints();
    results[14] = this.yatzyPoints();

    return results;
  }

  sameValuePoints(value) {
    let valuePoints = 0;
    valuePoints = this.frequency()[value] * value;
    return valuePoints;
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

  resetGame() {
    let fieldNames = ['aces', 'twos', 'threes', 'fours', 'fives', 'sixes', 'onePair', 'twoPairs', 'threeOfAKind', 'fourOfAKind', 'fullHouse', 'smallStraight', 'bigStraight', 'chance', 'yatzy', 'sum', 'bonus', 'total'];
    fieldNames.forEach((fieldName) => {
      let field = document.getElementById(fieldName);
      field.value = '';
      field.disabled = false;
      this.resetRollCounter();
    });
    document.getElementById('rollCounter').textContent = 'Rolls: 0';
  }
}
