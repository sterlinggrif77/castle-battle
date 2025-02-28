const prompt = require('prompt-sync')();

let playerHp = 10;
let computerHp = 10;
let playerBarracks = [];

const clearConsole = function() {
  console.clear();
};

const displayStatus = function() {
  console.log("=======================================");
  console.log("             GAME STATUS               ");
  console.log("=======================================");
  console.log(`🛡️  Player HP:   ${"❤ ".repeat(Math.max(0, playerHp)).trim()}`);
  console.log(`🤖 Computer HP: ${"❤ ".repeat(Math.max(0, computerHp)).trim()}`);
  console.log("=======================================\n");
};

const createPeon = function() {
  let name = prompt("Enter peon name: ");
  playerBarracks.push({ name: name, job: "nothing" });
  console.log(`✅ ${name} has been added to your barracks!\n`);
  displayStatus();
};

const selectPeon = function() {
  if (playerBarracks.length === 0) {
    console.log("⚠️  No peons available!\n");
    displayStatus();
    return;
  }
  const peonNames = playerBarracks.map((peon) => peon.name).join(", ");
  let peonName = prompt(`Enter peon name: ( ${peonNames} )`);
  let peon = playerBarracks.find((p) => p.name === peonName);
  if (peon) {
    while (true) {
      console.log("=======================================");
      console.log(`🔧 Choose job for ${peon.name.toUpperCase()}`);
      console.log("1: ⚔️ Attack");
      console.log("2: 🏥 Repair");
      console.log("3: 🔙 Back");
      let job = parseInt(prompt("Choose Option: (1 / 2 / 3): ")) - 1;
      let jobs = ["attack", "repair"];
      if (job === 2) {
        return;
      } else if (job >= 0 && job < jobs.length) {
        peon.job = jobs[job];
        console.log(`✅ ${peon.name} is now assigned to ${peon.job.toUpperCase()}\n`);
        processPeonActions();
        if (checkGameOver()) return;
        console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
        console.log("           COMPUTER'S TURN             ");
        console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
        computerTurn();
        if (checkGameOver()) return;
      } else {
        console.log("⚠️  Invalid job selection. Try again.\n");
      }
    }
  } else {
    console.log("⚠️  Peon not found!\n");
    displayStatus();
  }
};

const processPeonActions = function() {
  playerBarracks.forEach(peon => {
    if (peon.job === "repair") {
      playerHp += 1;
      console.log(`🔧 ${peon.name}🛡️ repaired!  Player HP: ${"❤ ".repeat(Math.max(0, playerHp)).trim()}\n`);
    } else if (peon.job === "attack") {
      computerHp -= 1;
      console.log(`⚔️  ${peon.name} attacked the computer! 🤖 Computer HP: ${"❤ ".repeat(Math.max(0, computerHp)).trim()}\n`);
    }
  });
};

const computerTurn = function() {
  let damageOrHeal = Math.random() < 0.5 ? "damage" : "heal";
  let amount = Math.floor(Math.random() * 5) + 1;
  if (damageOrHeal === "damage") {
    playerHp = Math.max(0, playerHp - amount);
    console.log(`🤖 Computer attacked you for ${amount} damage! 🛡️  Player HP: ${"❤ ".repeat(Math.max(0, playerHp)).trim()}\n`);
  } else {
    computerHp += amount;
    console.log(`🤖 Computer healed itself for ${amount} HP! 🤖 Computer HP: ${"❤ ".repeat(Math.max(0, computerHp)).trim()}\n`);
  }
  displayStatus();
};

const checkGameOver = function() {
  if (playerHp <= 0 && computerHp <= 0) {
    console.log("⚔️  It's a tie!\n");
    return true;
  } else if (playerHp <= 0) {
    console.log("💀 Computer wins!\n");
    return true;
  } else if (computerHp <= 0) {
    console.log("🎉 You win!\n");
    return true;
  }
  return false;
};

const gameLoop = function() {
  while (true) {
    clearConsole();
    displayStatus();
    if (checkGameOver()) return;
    console.log("=======================================");
    console.log("            PLAYER'S TURN              ");
    console.log("=======================================");
    console.log("1: 👷 Create peon");
    console.log("2: 🎯 Choose peon");
    let choice = parseInt(prompt("Choose option: (1 / 2): "));
    if (choice === 1) {
      createPeon();
    } else if (choice === 2) {
      selectPeon();
    } else {
      console.log("⚠️  Try again with the right selection.\n");
      displayStatus();
    }
  }
};

gameLoop();
