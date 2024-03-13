import { describe } from 'mocha';
import { assert } from 'chai';
import { Yatzy } from '../Yatzy.js';

describe('Yatzy', () => {
    it('Tester om et par metoden virker', () => {
        // Setup
        let yatzy = new Yatzy();
        yatzy.setDice([1, 1, 2, 3, 4]);
        // Exercise
        let result = yatzy.onePairPoints();
        // Verify
        assert.equal(result, 2);
    });

    it('Tester om to par metoden virker', () => {
        // Setup
        let yatzy = new Yatzy();
        yatzy.setDice([1, 1, 2, 2, 3]);
        // Exercise
        let result = yatzy.twoPairPoints();
        // Verify
        assert.equal(result, 6);
    });

    it('Tester om tre ens metoden virker', () => {
        // Setup
        let yatzy = new Yatzy();
        yatzy.setDice([3, 3, 1, 2, 3]);
        // Exercise
        let result = yatzy.threeSamePoints();
      
        // Verify
       
        assert.equal(result, 9);
    });

    it('Tester om fire ens metoden virker', () => {
        // Setup
        let yatzy = new Yatzy();
        yatzy.setDice([4, 4, 4, 4, 2]);
        // Exercise
        let result = yatzy.fourSamePoints();
        // Verify
        assert.equal(result, 16);
    });

    it('Tester om full house metoden virker', () => {
        // Setup
        let yatzy = new Yatzy();
        yatzy.setDice([3, 3, 3, 2, 2]);
        // Exercise
        let result = yatzy.fullHousePoints();
        // Verify
        assert.equal(result, 13);
    });

    it('Tester om small straight virker', () => {
        // Setup
        let yatzy = new Yatzy();
        yatzy.setDice([1, 2, 3, 4, 5]);
        // Exercise
        let result = yatzy.smallStraightPoints();
        // Verify
        assert.equal(result, 15);
      });

      it('Tester om big straight metoden virker', () => {
        // Setup
        let yatzy = new Yatzy();
        yatzy.setDice([2, 3, 4, 5, 6]);
        // Exercise
        let result = yatzy.largeStraightPoints();
        // Verify
        assert.equal(result, 20);
      });

      it('Tester om chance metoden virker', () => {
        // Setup
        let yatzy = new Yatzy();
        yatzy.setDice([2, 3, 4, 5, 6]);
        // Exercise
        let result = yatzy.chancePoints();
        // Verify
        assert.equal(result, 20);
      });

      it('Tester om yatzy metoden virker', () => {
        // Setup
        let yatzy = new Yatzy();
        yatzy.setDice([6, 6, 6, 6, 6]);
        // Exercise
        let result = yatzy.yatzyPoints();
        // Verify
        assert.equal(result, 50);
      });

      it('Tester om roll metoden virker', () => {
        // Setup
        let yatzy = new Yatzy();
        // Exercise
        yatzy.rollDies();
        // Verify
        // Since the dice roll is random, we can't assert a specific value.
        // But we can check that the roll counter has been incremented.
        assert.equal(yatzy.getRollCounter(), 1);
      });
      
      it('Tester om getRollCounter virker', () => {
        // Setup
        let yatzy = new Yatzy();
        // Exercise
        let result = yatzy.getRollCounter();
        // Verify
        // Since we haven't rolled the dice yet, the roll counter should be 0.
        assert.equal(result, 0);
      });
      
      it('tester om resetRollCounter virker', () => {
        // Setup
        let yatzy = new Yatzy();
        yatzy.rollDies();
        // Exercise
        yatzy.resetRollCounter();
        // Verify
        // After resetting, the roll counter should be 0.
        assert.equal(yatzy.getRollCounter(), 0);
      });

    


      it('Tester om frekvensmetoden virker', () => {
        // Setup
        let yatzy = new Yatzy();
        yatzy.setDice([1, 1, 2, 2, 3]);
        // Exercise
        let result = yatzy.frequency();
        // Verify
        assert.deepEqual(result, [0, 2, 2, 1, 0, 0, 0]);
      });
});