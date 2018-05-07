# elo-utils
Calculate ELO ratings

```javascript
const EloUtils = require('elo-utils');

//Basic Usage
console.log(EloUtils.elo(2200, 2600)); //Rating 1, Rating 2 assuming R1 is the winner
// Output: { R1: 2229.090909090909, R2: 2570.909090909091 }

console.log(EloUtils.elo(2200, 2600, EloUtils.RESULT.R2)); //Rating 1, Rating 2 assuming R2 is the winner
// Output: { R1: 2197.090909090909, R2: 2602.909090909091 }

console.log(EloUtils.elo(2200, 2600, EloUtils.RESULT.TIE)); //Rating 1, Rating 2 assuming a tie
// Output: { R1: 2213.090909090909, R2: 2586.909090909091 }


//Win Probabilities
 //calculates the win probability given two partiicpants with calculated ELO ratings
console.log(EloUtils.probabilty(2200, 2600));
// Output: { r1: 0.09266675659153722, r2: 0.9073332434084628 }
// r1 would have a 9% chance of winning
// r2 would have a 91% chance of winning


```
