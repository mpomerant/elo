var expect = require('chai').expect
const elo = require("../index");

describe("elo module", () => {
    describe("elo", () => {
        it("should not change ratings when two equal teams tie", () => {
            var e = elo.elo(2200, 2200, elo.RESULT.TIE);
            expect(e.R1).to.be.equal(2200);
            expect(e.R2).to.be.equal(2200);
        });

        it("should raise the favorite slightly when it wins", () => {
            var e = elo.elo(2400, 2200, elo.RESULT.R1);
            expect(e.R1).to.be.closeTo(2407, 1);
            expect(e.R2).to.be.closeTo(2192, 1);
        });

        it("should raise the underdog significantly when it wins", () => {
            var e = elo.elo(2400, 2200, elo.RESULT.R2);
            expect(e.R1).to.be.closeTo(2375, 1);
            expect(e.R2).to.be.closeTo(2224, 1);
        });

        it("should lower the favorite slightly when there is a tie", () => {
            var e = elo.elo(2400, 2200, elo.RESULT.TIE);
            expect(e.R1).to.be.closeTo(2391, 1);

        });

        it("should raise the underdog slightly when there is a tie", () => {
            var e = elo.elo(2400, 2200, elo.RESULT.TIE);

            expect(e.R2).to.be.closeTo(2208, 1);
        });
    });
    describe("probability", () => {
        it('should return a win probability of close to .5 for identical scores', () => {
            var p = elo.probabilty(2200, 2200);
            expect(p.r1).to.be.closeTo(.5, .02);
            expect(p.r2).to.be.closeTo(.5, .02);
        });

        it('should return a win probability of close to .75 when favored by 200 rating points', () => {
            var p = elo.probabilty(2400, 2200);
            expect(p.r1).to.be.closeTo(.75, .02);
            expect(p.r2).to.be.closeTo(.25, .02);
        });

        it('should return a win probability of close to .25 when underdog by 200 rating points', () => {
            var p = elo.probabilty(2200, 2400);
            expect(p.r1).to.be.closeTo(.25, .02);
            expect(p.r2).to.be.closeTo(.75, .02);
        });

        it('should return a win probability of close to .90 when favored by 400 rating points', () => {
            var p = elo.probabilty(2600, 2200);
            expect(p.r1).to.be.closeTo(.90, .02);
            expect(p.r2).to.be.closeTo(.10, .02);
        });

        it('should return a win probability of close to .10 when underdog by 400 rating points', () => {
            var p = elo.probabilty(2200, 2600);
            expect(p.r1).to.be.closeTo(.10, .02);
            expect(p.r2).to.be.closeTo(.90, .02);
        });


    });
});
