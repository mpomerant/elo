var exports = module.exports = {};

const K = 32;
exports.K = K;

const SCORES = Object.freeze({
    R1:   Symbol("R1"),
    R2:  Symbol("R2"),
    TIE: Symbol("TIE")
});
exports.RESULT = SCORES;

function score(actual){
    result = {};
    switch (actual) {
        case SCORES.R1:
            result.S1 = 1;
            result.S2 = 0;
            break;
        case SCORES.R2:
            result.S1 = 0;
            result.S2 = 1;
            break;
        default:
            result.S1 = .5;
            result.S2 = .5;
    }

    return result;

}



exports.elo = function(r1, r2, actual = SCORES.R1, k = K) {
  let transformedR1 = Math.pow(10, (r1/400));
  let transformedR2 = Math.pow(10, (r2/400));

  let E1 = transformedR1 / (transformedR1 + transformedR2);
  let E2 = transformedR2 / (transformedR1 + transformedR2);
  let gameScore = score(actual);
  let R1 = r1 + k * (gameScore.S1 - E1);
  let R2 = r2 + k * (gameScore.S2 - E2);

  return {R1,R2}
};

exports.probabilty = function(r1, r2){

    let test = r1 > r2;
    let diff = Math.abs(r1 - r2);

    let exp = Math.exp((0.00583 * diff) - 0.0505);


    let p = 1 - 1 / (1 + exp);
    let invP = 1 - p;

    return {
        r1: test ? p : invP,
        r2: test ? invP : p,
    };
};



