let missions = [];
let players = [];

function runDev() {
  new Player("Danilo", 0);
  new Player("Daniel", "potato");
  new Player("Yasmim", "abobora");
  new Player("Natã", "macarrao");
  new Mission(1, "matar ${p}");
  new Mission(1, "morrer para ${p}");
  new Mission(0, "quebra cama");
  new Mission(0, "quebra fornalha");
  new Mission(0, "roubar");
  sort();
  console.log("Jogadores: ", players);
  console.log("Missões: ", missions);
}

function sort() {
  for (i in players) {
    if (!players[i].mission) {
      let k = parseInt(Math.random() * missions.length);
      if (missions[k].type == 1) {
        let secoundPlayer = player2(i);
        missions[k].mission = missions[k].mission.replace(
          "${p}",
          players[secoundPlayer].name,
        );
      }
      players[i].mission = missions[k];
      missions.splice(k, 1);
    }
  }
}

//sort another player for complex missions
function player2(id) {
  let option = parseInt(Math.random() * players.length);
  if (option != id) {
    return option;
  }
  return player2(id);
}

class Player {
  constructor(name, pass, mission) {
    this.name = name;
    if (mission) {
      this.mission = mission;
    }
    //if player pass = 0 -> pass = name
    if (pass == 0) {
      this.pass = name;
    } else {
      this.pass = pass;
    }
    players.push(this);
  }
}

class Mission {
  constructor(type, mission, mission2) {
    //come back here when im doing front-end
    /* switch (type) {
      case 0:
        this.type = "Sozinho(a) e simples";
        break;
      case 1:
        this.type = "Sozinho(a) e complexa";
        break;
      default:
        this.type = "Em dupla";
        this.mission2 = mission2;
    } */
    this.type = type;
    if (type == 2) {
      this.mission2 = mission2;
    }
    this.mission = mission;
    missions.push(this);
  }
}

function encrypting(message, pass) {
  //getting passCode
  let password = pass;
  password = [...password];
  let passCode = 0;
  for (i in password) {
    passCode += dictionary[password[i]];
  }
  //actually encrypting
  mes = message;
  mes = [...mes].map((k) => dictionary[k] + passCode ?? k);

  mes = mes.map((k) => k.toString().padStart(3, 0)).join("");
  return mes;
}

function decrypting(code, pass) {
  //getting passCode
  let password = pass;
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

function revertingDictionary(obj, value) {
  return keys(obj)
    .filter((k) => obj[k] == value)
    .join();
}

let dictionary = {
  //symbols
  ".": 1,
  ",": 2,
  "!": 3,
  "?": 4,
  ":": 5,
  ";": 6,
  "'": 7,
  '"': 8,
  "@": 9,
  "#": 10,
  $: 11,
  "%": 12,
  "&": 13,
  "*": 14,
  "(": 15,
  ")": 16,
  "-": 17,
  _: 18,
  "=": 19,
  "+": 20,
  "{": 21,
  "[": 22,
  "]": 23,
  "}": 24,
  "~": 25,
  "^": 26,
  "`": 27,
  "´": 28,
  "/": 29,
  ">": 30,
  "<": 31,
  " ": 32,
  //numbers
  0: 33,
  1: 34,
  2: 35,
  3: 36,
  4: 37,
  5: 38,
  6: 39,
  7: 40,
  8: 41,
  9: 42,
  //default lowercase
  a: 43,
  b: 44,
  c: 45,
  d: 46,
  e: 47,
  f: 48,
  g: 49,
  h: 50,
  i: 51,
  j: 52,
  k: 53,
  l: 54,
  m: 55,
  n: 56,
  o: 57,
  p: 58,
  q: 59,
  r: 60,
  s: 61,
  t: 62,
  u: 63,
  v: 64,
  w: 65,
  x: 66,
  y: 67,
  z: 68,
  //default uppercase
  A: 69,
  B: 70,
  C: 71,
  D: 72,
  E: 73,
  F: 74,
  G: 75,
  H: 76,
  I: 77,
  J: 78,
  K: 79,
  L: 80,
  M: 81,
  N: 82,
  O: 83,
  P: 84,
  Q: 85,
  R: 86,
  S: 87,
  T: 88,
  U: 89,
  V: 90,
  W: 91,
  X: 92,
  Y: 93,
  Z: 94,
  //accented lowercase
  á: 95,
  à: 96,
  â: 97,
  ã: 98,
  é: 99,
  ê: 100,
  í: 101,
  ó: 102,
  ô: 103,
  õ: 104,
  ú: 105,
  ç: 106,
  //accented uppercase
  Á: 107,
  À: 108,
  Â: 109,
  Ã: 110,
  É: 111,
  Ê: 112,
  Í: 113,
  Ó: 114,
  Ô: 115,
  Õ: 116,
  Ú: 117,
  Ç: 118,
};
