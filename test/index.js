/**
 * @author David Menger
 */

const readline = require('readline');
const fs = require('fs');
const path = require('path');
const { vokativ, isWoman } = require('../index');
const assert = require('assert');

function readTest (file, callback, onClose) {

    const rl = readline.createInterface({
        input: fs.createReadStream(path.join(__dirname, file))
    });

    rl.on('line', (line) => {
        callback(...line.split(' '));
    }).on('close', onClose);
}


describe('vokativ', function () {

    it('should work', function () {
        assert.equal(vokativ('Tom'), 'tome');
    });

    it('translates man first names', function (done) {
        readTest('man_first_name_tests', (test, expected) => {
            assert.equal(vokativ(test), expected);
            assert.equal(vokativ(test, false), expected);
            assert.equal(vokativ(test, false, false), expected);
            assert.strictEqual(isWoman(test), false);
        }, done);
    });

    it('translates man last names', function (done) {
        readTest('man_last_name_tests', (test, expected) => {
            assert.equal(vokativ(test, null, true), expected);
            assert.equal(vokativ(test, false, true), expected);
            assert.strictEqual(isWoman(test), false);
        }, done);
    });

    it('translates woman first names', function (done) {
        readTest('woman_first_name_tests', (test, expected) => {
            assert.equal(vokativ(test), expected);
            assert.equal(vokativ(test, true), expected);
            assert.equal(vokativ(test, true, false), expected);
            assert.strictEqual(isWoman(test), true);
        }, done);
    });

    it('translates woman last names', function (done) {
        readTest('woman_last_name_tests', (test, expected) => {
            assert.equal(vokativ(test, null, true), expected);
            assert.equal(vokativ(test, true, true), expected);
            assert.strictEqual(isWoman(test), true);
        }, done);
    });

});
