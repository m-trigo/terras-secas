let turn = 0;
let turnsElapsed = 0;
let enemyList = [];

let inCombat = false;
let combatStep = 0; // What do you do?

function enemyTurn() {
    let biteLog = bite(enemyList[0], party.members.Maria);
    biteLog.forEach(logLine => terminal.append(logLine));
}

function combatRound() {

    // Describe the scene
    // Prompt the players - What do you do?
    // When all the players choose, run the combat

    switch (combatStep) {
        case 0:
            terminal.append("");
            terminal.append("What do you do?");
            terminal.append("A) Attack");
            terminal.append("R) Run [ Not Implemented ]");
            combatStep++;
            break;
    }

    let combatLog = [];

    // Combat Commands
    if (hasInput()) {
        let clearInput = true;
        switch(input.value) {
            case 'R':
                combatLog = combatLog.concat(['Nothing happens.']);
                turn++;
                break;
            case 'A':
                let stabLog = stab(party.members.Maria, enemyList[0]);
                combatLog = combatLog.concat(stabLog);
                turn++;
                break;
            default:
                clearInput = false;
        }

        if (clearInput) {
            input.clear();
        }

        terminal.clear();
        combatLog.forEach(logLine => terminal.append(logLine));
    }

    if (turnsElapsed < turn) {
        enemyTurn();
        turnsElapsed++;
        combatStep = 0;
    }
}