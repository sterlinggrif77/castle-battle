const prompt = require('prompt-sync')();

let playerHp = 10;
let computerHp = 10;
let playerBarracks = [];

const createPeon = function() {
  let name = prompt("Enter peon name: ");
  playerBarracks.push({ name: name, job: "nothing" });
  console.log(`${name} has been added to your barracks!`);
};

const selectPeon = function() {
  if (playerBarracks.length === 0) {
    console.log("No peons available!");
    return;
  }
  let peonName = prompt("Enter peon name: ");
  let peon = playerBarracks.find((p) => p.name === peonName);
  if (peon) {
    console.log(`Choose job for ${peon.name.toUpperCase()}`);
    console.log("1: Attack");
    console.log("2: Repair");
    let job = parseInt(prompt("Choose Option: (1 / 2): ")) - 1;
    let jobs = ["attack", "repair"];
    if (job >= 0 && job < jobs.length) {
      peon.job = jobs[job];
      console.log(`${peon.name} is now assigned to ${peon.job}`);
    } else {
      console.log("Invalid job selection.");
    }
  } else {
    console.log("Peon not found!");
  }
};

const processPeonActions = function() {
  playerBarracks.forEach(peon => {
    if (peon.job === "repair") {
      playerHp += 1;
      console.log(`${peon.name} repaired you! Player HP: ${playerHp}`);
    } else if (peon.job === "attack") {
      computerHp -= 1;
      console.log(`${peon.name} attacked the computer! Computer HP: ${computerHp}`);
    }
  });
};

const computerTurn = function() {
  let damageOrHeal = Math.random() < 0.5 ? "damage" : "heal";
  let amount = Math.floor(Math.random() * 5) + 1;
  if (damageOrHeal === "damage") {
    playerHp -= amount;
    console.log(`Computer attacked you for ${amount} damage! Player HP: ${playerHp}`);
  } else {
    computerHp += amount;
    console.log(`Computer healed itself for ${amount} HP! Computer HP: ${computerHp}`);
    console.log( `\nYour HP: ${[playerHp]}`)
  }
};

const checkGameOver = function() {
  if (playerHp <= 0 && computerHp <= 0) {
    console.log("It's a tie!");
    return true;
  } else if (playerHp <= 0) {
    console.log("Computer wins!");
    return true;
  } else if (computerHp <= 0) {
    console.log("You win!");
    return true;
  }
  return false;
};

const gameLoop = function() {
  while (true) {
    console.log("What do you want to do? :");
    console.log("1: Create peon");
    console.log("2: Choose peon");
    let choice = parseInt(prompt("Choose option: (1 / 2): "));
    if (choice === 1) {
      createPeon();
    } else if (choice === 2) {
      selectPeon();
    } else {
      console.log("Try again with the right selection.");
      continue;
    }
    
    processPeonActions();
    if (checkGameOver()) break;
    
    console.log("Computer's turn...");
    computerTurn();
    if (checkGameOver()) break;
  }
};

gameLoop();
