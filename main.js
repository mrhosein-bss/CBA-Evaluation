/**********************************************
 * There are 16 "TODO" items in main.js  *
 **********************************************/

let myRoster = [];
let enemyRoster = [];
let isBattleMode = false;
let activeHomeIndex = 0;
let activeEnemyIndex = 0;

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const logDiv = document.getElementById("battle-log");
const cmdInput = document.getElementById("command-input");
const movesContainer = document.getElementById("moves-container");

function addLog(msg) {
    logDiv.innerHTML += `<div>> ${msg}</div>`;
    logDiv.scrollTop = logDiv.scrollHeight;
}

async function loadRosters() {
    addLog("Loading home roster...");
    try {
        let res = await fetch("homeroster.txt");
        let text = await res.text();
        let lines = text.split('\n');
        
        for(let line of lines) {
            if(line.trim() === "") continue;
            let parts = line.split(' '); //splits the line into an array (e.g., "name" is parts[0], "attack" is parts[1], etc.)
            
            //1 TODO: Create new Character objects passing in parts[0], parts[1], parts[2], parts[3], parts[4].
                // Hint: Reminder to convert parameters to integers or floats as appropriate (all are Strings to begin with)
          
            //2 TODO: Push the new character into the myRoster array.

            //3 TODO: Call the fetchPokeData() method on the newly created character.
            
        }
        addLog("Home roster loaded.");
    } catch(e) {
        addLog("Error loading home roster.");
    }

    addLog("Loading enemy roster...");
    try {
        let resEnemy = await fetch("enemyroster.txt");
        let textEnemy = await resEnemy.text();
        let linesEnemy = textEnemy.split('\n');
        
        for(let line of linesEnemy) {
            if(line.trim() === "") continue;
            let parts = line.split(' ');
            
            //4 TODO: Instantiate a new Character object passing in the parts.
            //5 TODO: Push the new character into the enemyRoster array.
            //6 TODO: Call the fetchPokeData() method on the newly created character.
        }
        addLog("Enemy roster loaded.");
    } catch(e) {
        addLog("Error loading enemy roster.");
    }
}

function createCharacter() {
    let n = prompt("Enter Name:");
    let a = prompt("Enter Attack:");
    let d = prompt("Enter Defense:");
    let h = prompt("Enter Health:");
    let s = prompt("Enter Speed:");
    
    //7 TODO: Create a new Character object using the variables above.
    //8 TODO: Push it to myRoster.
    //9 TODO: Call fetchPokeData() on it.
    addLog(`Character ${n} has been created.`);
}

function viewCharacters() {
    addLog("--- Current Home Roster ---");
    for(let i=0; i<myRoster.length; i++) {
        addLog(`${i+1}. ${myRoster[i].toString()}`);
    }
}

function editCharacter() {
    //10 TO DO: Call the viewCharacters() function

    let index = prompt("Enter the roster index of the character you wish to edit:");
    let n = myRoster[index].getName(); 
    let attr = prompt("Enter the attribute you wish to change (attack, defense, health, speed):");
    let newVal = prompt("Enter the new value:");
    
    //11 TODO: Use the appropriate setter method to update the character's attribute.
    addLog(`Character ${n} has been edited.`);
}

function startBattle() {
    if(myRoster.length === 0 || enemyRoster.length === 0) {
        addLog("Please load rosters first.");
        return;
    }
    isBattleMode = true;
    activeHomeIndex = 0;
    activeEnemyIndex = 0;
    addLog("BATTLE COMMENCED!");
    updateBattleUI();
}

function updateBattleUI() {
    if(!isBattleMode) return;
    movesContainer.innerHTML = "";
    
    let activeChar = myRoster[activeHomeIndex];
    
    //12 TODO: Use your getter method to retrieve the moves array from activeChar.
    let currentMoves = []; // replace with your code
    
    for(let move of currentMoves) {
        let btn = document.createElement("button");
        btn.innerText = move.toUpperCase();
        btn.onclick = () => processTurn(move);
        movesContainer.appendChild(btn);
    }
}

function processTurn(playerMove) {
    let pChar = myRoster[activeHomeIndex];
    let eChar = enemyRoster[activeEnemyIndex];

    //13 TODO: Use getters to retrieve the enemy moves array, and select one (of 4) randomly, called enemyMove
    let enemyMove = ""; //replace with correct code

    //14 TODO: Use getters to retrieve the corresponding power of the move (same index position as the move)
    let ePower = 0; //replace with correct code
    let pPower = pChar.getPowers()[pChar.getMoves().indexOf(playerMove)];

    // Custom functions you can use
    function playerAttack() {
        let pDamage = Math.floor(0.5 * pPower * (pChar.getAttack() / eChar.getDefense())) + 1;
        eChar.setHealth(eChar.getHealth() - pDamage);
        addLog(`${pChar.getName()} used ${playerMove}! Dealt ${pDamage} damage.`);
    }
    
    function enemyAttack() {
        let eDamage = Math.floor(0.5 * ePower * (eChar.getAttack() / pChar.getDefense())) + 1;
        pChar.setHealth(pChar.getHealth() - eDamage);
        addLog(`${eChar.getName()} used ${enemyMove}! Dealt ${eDamage} damage.`); // TODO: update text to include the move name
    }
  
    //15 TODO: Determine who attacks first based on speed. 
    //16 TODO: Do one turn of attacks (faster character attacks once, then slower player attacks once)
        // Important note! If the slower character faints, do not let them attack this turn! 
    
    if (pChar.getHealth() <= 0) {
        addLog(`${pChar.getName()} fainted!`);
        activeHomeIndex++;
        if (activeHomeIndex >= myRoster.length) {
            addLog("All home characters fainted. You LOSE!");
            isBattleMode = false;
            return;
        }
    }
    
    if (eChar.getHealth() <= 0) {
        addLog(`${eChar.getName()} fainted!`);
        activeEnemyIndex++;
        if (activeEnemyIndex >= enemyRoster.length) {
            addLog("All enemy characters fainted. You WIN!");
            isBattleMode = false;
            return;
        }
    }
    
    updateBattleUI();
}

cmdInput.addEventListener("keypress", (e) => {
    if(e.key === "Enter") {
        let val = cmdInput.value.toLowerCase();
        cmdInput.value = "";
        
        if(val === "1") {
            loadRosters();
        } else if (val === "2") {
            createCharacter();
        } else if (val === "3") {
            viewCharacters();
        } else if (val === "4") {
            editCharacter();
        } else if (val === "5") {
            startBattle();
        } else {
            addLog("Command not recognized.");
        }
    }
});

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if(isBattleMode && myRoster.length > 0 && enemyRoster.length > 0) {
        let pChar = myRoster[activeHomeIndex];
        let eChar = enemyRoster[activeEnemyIndex];
        
        pChar.draw(ctx, 50, 200, true);
        eChar.draw(ctx, 350, 50, false);
    } else {
        ctx.fillStyle = "black";
        ctx.font = "16px Courier New";
        ctx.fillText("Waiting for battle to begin...", 100, 150);
    }
    
    requestAnimationFrame(gameLoop);
}

gameLoop();