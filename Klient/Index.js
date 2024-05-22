import { GetRollCounter } from './YatzyFacade.mjs';
import { Yatzy } from '/Yatzy.js';
import { RollDies, GetDiceValues, GetFieldsResults, ResetRollCounter, showActivePlayers} from '/YatzyFacade.mjs';

window.onload = function () {
  let yatzy = new Yatzy();

  yatzy.dice.forEach((die, index) => {
    let dieElement = document.getElementById('dice' + (index + 1));
    dieElement.addEventListener('click', function () {
      die.held = !die.held; // Toggle the held property of the die

      // Add or remove the held class depending on whether the die is held
      if (die.held) {
        dieElement.classList.add('held');
      } else {
        dieElement.classList.remove('held');
      }
    });
  });
  document.querySelector('#showPlayerButton').addEventListener('click', function() {
    showActivePlayers();
  });
  
  document.querySelector('#rollButton').addEventListener('click', async function () {
    RollDies();
    
    let dice = await GetDiceValues();

      dice.forEach(function (die, index) {
        document.getElementById('dice' + (index + 1)).src = 'img/die' + die.value + '.png';
      });
      document.querySelector('#rollCounter').textContent = 'Rolls: ' + await GetRollCounter();

      let results = await GetFieldsResults();
      let fieldNames = ['aces', 'twos', 'threes', 'fours', 'fives', 'sixes', 'onePair', 'twoPairs', 'threeOfAKind', 'fourOfAKind', 'fullHouse', 'smallStraight', 'bigStraight', 'chance', 'yatzy'];
      fieldNames.forEach((fieldName, index) => {
        let field = document.getElementById(fieldName);
        if (!field.disabled) {
          field.value = results[index];
        }

        if (!field.onclick) {
          field.onclick = async () => {
            field.disabled = true;
            //this.uncheckAllDice(); // Uncheck all dice
            ResetRollCounter();
            calculateSum();
            calculateTotal();
            document.querySelector('#rollCounter').textContent = 'Rolls: ' + await GetRollCounter();
            let rollButton = document.querySelector('#rollButton');
            rollButton.disabled = false;
          };
        }
      });

    
  });

  
};

function calculateSum() {
  let fN  = ['aces', 'twos', 'threes', 'fours', 'fives', 'sixes'];
  let sum = 0;
  fN.forEach((fN) => {
    let field = document.getElementById(fN);
    if (field.disabled) { // Only add the value if the field is disabled (i.e., a score has been saved)
      sum += parseInt(field.value, 10);
    }
  });
  document.getElementById('sum').value = sum;
  if (sum >= 63) {
    document.getElementById('bonus').value = 50;
  };
};

function calculateTotal() {
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

  // if (allFieldsDisabled) {
  //   let newGame = window.confirm("All fields are filled. Do you want to start a new game?");
  //   if (newGame) {
  //     this.resetGame();
  //   }
  // }
}
