import { GetRollCounter } from './YatzyFacade.mjs';
import { Yatzy } from '/Yatzy.js';
import { RollDies, GetDiceValues } from '/YatzyFacade.mjs';

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

  document.querySelector('#rollButton').addEventListener('click', async function () {
    RollDies();
    
    let dice = await GetDiceValues();

      dice.forEach(function (die, index) {
        document.getElementById('dice' + (index + 1)).src = 'img/die' + die.value + '.png';
      });
      document.querySelector('#rollCounter').textContent = 'Rolls: ' + await GetRollCounter();
  });
};
