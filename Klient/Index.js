import { Yatzy } from '/Yatzy.js';
import { RollDies } from '/YatzyFacade.mjs';

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

  document.querySelector('#rollButton').addEventListener('click', function () {
    RollDies();
  });
};
