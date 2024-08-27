/*
    Moves to Implement 

    [x] Bite
    [x] Stab
    [ ] Escape
    [ ] ???
*/


function bite(src, dst) {
    let total = d6() + d6();
    let damage = 0;

    if (total > 10) {
        damage = d6_heavy();
        //dst.STATUS.push('BLEEDING');
    }
    else if (total > 7) {
        damage = d6();
    }
    else {
        damage = d6_light();
        //src.STATUS.push('EXPOSED');
    }

    dst.RISK += damage;

    let log = [];//[ `# [bite] (${total}) -> damage (${damage})` ];

    let lastLine = `${src.NAME} tries to bite ${dst.NAME} --`;
    if (total > 10) {
        //log.push(`${src.NAME} bites ${dst.NAME} --`);
        //lastLine = `${dst.NAME} is BLEEDING!`;
    }

    if (dst.RISK > dst.LUCK) {
        lastLine = `${src.NAME} bites ${dst.NAME} --`;
    }

    log.push(lastLine);
    return log;
}

function escape() {
    // Add failure
    
}

function stab(src, dst) {
    let total = d6() + d6();
    let damage = 0;

    if (total > 10) {
        damage = d6_heavy();
        //dst.STATUS.push('BLEEDING');
    }
    else if (total > 7) {
        damage = d6();
    }
    else {
        damage = d6_light();
        //src.STATUS.push('EXPOSED');
    }

    dst.DAMAGE += damage;

    let log = [];//[ `# [stab] (${total}) -> damage (${damage})` ];
    let lastLine = `${src.NAME} stabs ${dst.NAME} --`;
    if (total > 10) {
        //lastLine += " --";
        //log.push(lastLine);
        //lastLine = `${dst.NAME} is BLEEDING!`;
    }

    log.push(lastLine);
    return log;
}
