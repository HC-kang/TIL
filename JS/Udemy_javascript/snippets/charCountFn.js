const gatherStats = (stat, criteria) => {
  stat[criteria] = ++stat[criteria] || 1;
  return stat;
};

const toArray = (str) => str.split('');

// const isAlphaNumeric = (char) => /[a-z0-9]/.test(char);

const isAlphaNumeric = (char) => {
  const code = char.charCodeAt(0);
  if (!(code > 47 && code < 58) && // numeric (0-9)
      !(code > 64 && code < 91) && // upper alpha (A-Z)
      !(code > 96 && code < 123)) { // lower alpha (a-z)
    return false;
  }
  return true;
};

const charCountFn = (str) => {
  return toArray(str).map(char => char.toLowerCase()).filter(isAlphaNumeric).reduce(gatherStats, {});
};

console.log(charCountFn('Hello!! My name is h1234'));
