[![Build Status](https://travis-ci.org/mpomerant/elo.svg?branch=master)](https://travis-ci.org/mpomerant/elo)

# elo-utils
Used to provide some basic utilities to support the calculation of [ELO Ratings](https://en.wikipedia.org/wiki/Elo_rating_system).

## Usage

```javascript
const EloUtils = require('elo-utils');
```

## Functions
### elo(rating1, rating2, result=R1, k=32)
Calculates the new ELO rating for two competitors given the ELO rating prior to the match
and the actual outcome.  The user can optionally provide the result of the match and a new
K factor with defaults being set for R1 being the victor and a K rating of 32.

For example, if participant 1 (2200) and participant 2 (2600) were to have match and
the underdog (Participant 1) were to win, the `elo` function would be able to calulate the
new ratings.

```javascript
//Basic Usage
console.log(EloUtils.elo(2200, 2600)); //Rating 1, Rating 2 assuming R1 is the winner
// Output: { R1: 2229.090909090909, R2: 2570.909090909091 }
```

A result can be passed into the function to specify which participant won the match using
the `RESULT` enum.

```javascript
console.log(EloUtils.RESULT.R1)  //Participant 1 wins (Default)
//Output: Symbol(R1)

console.log(EloUtils.RESULT.R2) //Participant 2 wins
//Output: Symbol(R2)

console.log(EloUtils.RESULT.TIE) //Tie
//Output: Symbol(TIE)


console.log(EloUtils.elo(2200, 2600, EloUtils.RESULT.R2)); //Rating 1, Rating 2 assuming R2 is the winner
// Output: { R1: 2197.090909090909, R2: 2602.909090909091 }

console.log(EloUtils.elo(2200, 2600, EloUtils.RESULT.TIE)); //Rating 1, Rating 2 assuming a tie
// Output: { R1: 2213.090909090909, R2: 2586.909090909091 }
```

The function assumes a 'K' factor of 32 which is standard for most cases, however in the
event where there is a need for greater variablity a custom rating can be used.

```javascript
console.log(EloUtils.elo(2200, 2600, EloUtils.RESULT.R1, 64)); //Rating 1, Rating 2 assuming R2 is the winner
// Output: { R1: 2258.181818181818, R2: 2541.818181818182 }

```

### probability(rating1, rating2)
Provides the win probability in a match between to participants given thier respective
ratings.

```javascript
//Win Probabilities
 //calculates the win probability given two partiicpants with calculated ELO ratings
console.log(EloUtils.probabilty(2200, 2600));
// Output: { r1: 0.09266675659153722, r2: 0.9073332434084628 }
// r1 would have a 9% chance of winning
// r2 would have a 91% chance of winning
```

