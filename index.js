

const WOMAN_F_VS_L_SUFFIXES = require('./woman_first_vs_last_name_suffixes.json');
const MAN_VS_WOMAN_SUFFIXES = require('./man_vs_woman_suffixes.json');
const MAN_SUFFIXES  = require('./man_suffixes.json');


function _getMatchingSuffix (name, suffixes) {
    let search;

    for (let start = name.length; start > 0; start--) {
        search = name.substr(-start);
        if (typeof suffixes[search] === 'string') {
            return [search, suffixes[search]];
        }
    }

    return ['', suffixes[''] || ''];
}

function _vokativWomanFirstName (name) {
    if (name.substr(-1, 1) === 'a') {
        return name.substr(0, name.length - 1) + 'o';
    } else {
        return name;
    }
}

function _vokativWomanLastName (name) {
    return name;
}

function _vokativMan (name) {
    const [search, suffix] = _getMatchingSuffix(name, MAN_SUFFIXES);
    let ret = name.substr(0, name.length - search.length);
    // name = name[:-len(suffix)] if suffix else name
    return `${ret}${suffix}`;
}

/**
 *
 *
 * @param {string} nameString
 * @returns {boolean}
 */
function isWoman (nameString) {
    const name = nameString.toLowerCase();
    return _getMatchingSuffix(name, MAN_VS_WOMAN_SUFFIXES)[1] === 'w';
}

/**
 *
 *
 * @param {string} nameString
 * @param {boolean} [woman=false]
 * @param {boolean} [lastName=null]
 *
 */
function vokativ (nameString, womanBool = null, lastName = null) {
    const name = nameString.toLowerCase();
    let woman = womanBool;

    if (woman === null) {
        woman = isWoman(name);
    }

    if (woman) {
        if (lastName === null) {
            lastName = (_getMatchingSuffix(name, WOMAN_F_VS_L_SUFFIXES)[1] || 'l') === 'l';
        }
        if (lastName) {
            return _vokativWomanLastName(name);
        } else {
            return _vokativWomanFirstName(name);
        }
    } else {
        return _vokativMan(name);
    }
}


module.exports = {
    vokativ,
    isWoman
};
