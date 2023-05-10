import WOMAN_F_VS_L_SUFFIXES from './woman_first_vs_last_name_suffixes.json';
import MAN_VS_WOMAN_SUFFIXES from './man_vs_woman_suffixes.json';
import MAN_SUFFIXES from './man_suffixes.json';

function getMatchingSuffix (name: string, suffixes: Readonly<Record<string, string>>): [string, string] {
  let search;

  for (let start = name.length; start > 0; start--) {
      search = name.slice(-start);
      if (typeof suffixes[search] === 'string') {
          return [search, suffixes[search]];
      }
  }

  return ['', suffixes[''] || ''];
}

function vokativWomanFirstName (name: string): string {
  if (name.slice(-1) === 'a') {
      return name.slice(0, name.length - 1) + 'o';
  } else {
      return name;
  }
}

function vokativWomanLastName (name: string): string {
  return name;
}

function vokativMan (name: string): string {
  const [search, suffix] = getMatchingSuffix(name, MAN_SUFFIXES);
  const ret = name.slice(0, name.length - search.length);
  return `${ret}${suffix}`;
}

export function isWoman (nameString: string): boolean {
  const name = nameString.toLowerCase();
  return getMatchingSuffix(name, MAN_VS_WOMAN_SUFFIXES)[1] === 'w';
}

export function vokativ (nameString: string, womanBool: boolean | null = null, lastName: boolean | null = null): string {
  const name = nameString.toLowerCase();
  let woman = womanBool;

  if (woman === null) {
      woman = isWoman(name);
  }

  if (woman) {
      if (lastName === null) {
          lastName = (getMatchingSuffix(name, WOMAN_F_VS_L_SUFFIXES)[1] || 'l') === 'l';
      }
      if (lastName) {
          return vokativWomanLastName(name);
      } else {
          return vokativWomanFirstName(name);
      }
  } else {
      return vokativMan(name);
  }
}
