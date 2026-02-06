let missions = [];
let players = [];

class Mission {
  constructor(type, mission, mission2) {
    this.mission2 = null;
    switch (type) {
      case 0:
        this.type = "Sozinho(a) e simples";
        break;
      case 1:
        this.type = "Sozinho(a) e complexa";
        break;
      default:
        this.type = "Em dupla";
        this.mission2 = mission2;
    }
    this.mission = mission;
    missions.push(this);
  }
}

function addMission(type, mission, player2) {
  new Mission(type, mission, player2);
}
class Player {
  constructor(name, mission, pass) {
    this.name = name;
    this.mission = mission;
    //if player pass = 0 -> pass = name
    if ((pass = 0)) {
      this.pass = name;
    } else {
      this.pass = pass;
    }
    players.push(this);
  }
}

function encrypting(message, pass) {
  //getting passCode
  let password = pass.toLowerCase();
  password = [...password];
  let passCode = 0;
  for (i in password) {
    passCode += dictionary[password[i]];
  }
  //actually encrypting
  mes = message.toLowerCase();
  mes = [...mes].map((k) => dictionary[k] + passCode ?? k);

  mes = mes.map((k) => k.toString().padStart(3, 0)).join("");
  return mes;
}

function revertingDictionary(obj, value) {
  return keys(obj)
    .filter((k) => obj[k] == value)
    .join();
}

function decrypting(code, pass) {
  //getting passCode
  let password = pass.toLowerCase();
  password = [...password];
  let passCode = 0;
  for (i in password) {
    passCode += dictionary[password[i]];
  }

  //actually decrypting
  let parts = [];
  for (i = 0; i < code.length; i += 3) {
    parts.push(code.slice(i, i + 3));
  }

  parts = parts.map((k) => k - passCode);
  parts = parts.map((k) => revertingDictionary(dictionary, Number(k)));
  parts = parts.join("");
  return parts;
}

let dictionary = {
  ".": 1,
  " ": 25,
  "{": 26,
  "}": 33,
  "!": 27,
  "?": 28,
  ",": 29,
  "(": 30,
  ")": 31,
  ":": 32,
  $: 54,
  x: 39,
  w: 40,
  y: 41,
  z: 42,
  j: 2,
  k: 43,
  a: 3,
  ã: 38,
  á: 22,
  b: 4,
  c: 5,
  ç: 23,
  d: 6,
  e: 21,
  ê: 24,
  é: 37,
  f: 7,
  g: 8,
  h: 9,
  i: 10,
  í: 34,
  l: 11,
  m: 12,
  n: 13,
  o: 14,
  p: 15,
  q: 16,
  r: 17,
  s: 18,
  t: 19,
  u: 20,
  ú: 35,
  v: 36,
  0: 44,
  1: 45,
  2: 46,
  3: 47,
  4: 48,
  5: 49,
  6: 50,
  7: 51,
  8: 52,
  9: 53,
};
