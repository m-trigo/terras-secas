// https://keyjs.dev/
// https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_code_values
// https://www.toptal.com/developers/keycode/table

// Finish combat, THEN
// Combat text shake
// CHECK STATUS (UI work)
// CHECK ENEMY (UI work)
// USE SKILL (Guitar, play Jonhy Guitar), "but it's useless"
// FIRST QUEST (exploration, SMT4 Menus and Rooms)

const alphabet = 'a b c d e f g h i j k l m n o p q r s t u v w x y z'.split(' ');
const digits = '0 1 2 3 4 5 6 7 8 9'.split(' ');
const margin = 4;

let nowPlaying = '';

function registerKeyboard() {
    alphabet.forEach(letter => s2d.input.registerButton(letter, [letter]));
    digits.forEach(digit => s2d.input.registerButton(digit, [digit]));
    s2d.input.registerButton('Enter', ['Enter']);
    s2d.input.registerButton(' ', [' ']);
    s2d.input.registerButton('Backspace', ['Backspace']);
    s2d.input.registerButton('up', ['Up', 'Arrow Up']);
    s2d.input.registerButton('down', ['Up', 'Arrow Down']);
    s2d.input.registerButton('left', ['Up', 'Arrow Left']);
    s2d.input.registerButton('right', ['Up', 'Arrow Right']);
}

function textToInput() {
    alphabet.forEach(letter => {
        if (s2d.input.buttonPressed(letter)) {
            input.append(letter.toUpperCase());
        }
    })

    digits.forEach(digit => {
        if (s2d.input.buttonPressed(digit)) {
            input.append(digit);
        }
    })

    if (s2d.input.buttonPressed(' ')) {
        input.append(' ');
    }

    if (s2d.input.buttonPressed('Backspace')) {
        input.value = input.value.substring(0, input.value.length - 1);
    }
}

function hasInput() {
    return s2d.input.buttonPressed('Enter') && input.value != "";
}

function initUI() {
    terminal.pos.x = margin * 4;
    terminal.pos.y = margin * 4;

    terminal2.pos.x = margin * 4;
    terminal2.pos.y = 12 * s2d.text.textHeight() + margin * 3;

    input.pos.x = margin * 4;
    input.pos.y = s2d.canvas.height() - s2d.text.textHeight() - margin * 3;
}

function drawUI() {
    s2d.canvas.clear('white');
    //s2d.debug.drawPixelGrid(50, 'black');

    // Screen Border
    s2d.rect.draw(s2d.rect.make(0, 0, s2d.canvas.width(), s2d.canvas.height()), 'black');

    // Terminal Border - tb (s)tart/(e)nd x/y
    let tbsx = margin * 2;
    let tbsy = terminal.pos.y - margin * 2;
    let tbex = s2d.canvas.width() - margin * 2;
    let tbey = tbsy + 11 * s2d.text.textHeight() + margin * 3;
    s2d.rect.draw(s2d.rect.make(tbsx, tbsy, tbex, tbey), 'black');
    terminal.render();

    // Terminal 2 Border - t2b (s)tart/(e)nd x/y
    let t2bsx = margin * 2;
    let t2bsy = terminal2.pos.y - margin * 2;
    let t2bex = s2d.canvas.width() - margin * 2;
    let t2bey = t2bsy + 10 * s2d.text.textHeight() + margin * 3;
    s2d.rect.draw(s2d.rect.make(t2bsx, t2bsy, t2bex, t2bey), 'black');
    terminal2.render();

    // Input Border - ib (s)tart/(e)nd x/y
    let ibsx = margin * 2;
    let ibsy = input.pos.y - margin * 1.5;
    let ibex = s2d.canvas.width() - margin * 2;
    let ibey = s2d.canvas.height() - margin * 2;
    s2d.rect.draw(s2d.rect.make(ibsx, ibsy, ibex, ibey), 'black');
    input.render();
}

function drawParty() {
    terminal2.clear();

    let header = stringFormat('10 27 8 8 8 8', ['NAME', 'STR/END/DEX/AGI/INS/PER', ' LUCK', ' RISK', 'STRESS', 'INJURY']);
    terminal2.append(header);

    let partyMemberNames = Object.keys(party.members);

    partyMemberNames.forEach(name => {

        // Will this work? Copy or Ref?
        // Good question, but it's read-only usage so it doesn't matter
        character = party.members[name];

        terminal2.append("");

        let stats = stringFormat('10 27 8 8 8 8', [
            character.NAME,
            ` ${character.STR} / ${character.END} / ${character.DEX} / ${character.AGI} / ${character.INS} / ${character.PER}`,
            "  " + character.LUCK,
            (character.RISK > 9 ? "  " : "   ") + character.RISK,
            '[NONE]',
            '[NONE]'
        ])

        terminal2.append(stats);
    });
}

function stopNowPlayingStartTrack(audioName) {
    if (nowPlaying !== '') {
        s2d.audio.pause(nowPlaying);
        console.log(`stopping ${nowPlaying}`);
    }
    s2d.audio.play(audioName);
    nowPlaying = audioName;
}

function load() {
    s2d.assets.loadFontFamily('SF Mono Regular', 'fonts/SFMonoRegular.otf');
    s2d.assets.loadAudio('log-1', './audio/log-1.mp3');

    // TODO: Need an error message if the file has the wrong name
    // Nick halp
    s2d.assets.loadAudio('bgm-1', './audio/wake-up-the-night.mp3');

    s2d.assets.loadAudio('bgm-2', './audio/Earthen Fury 1-0.mp3');
    s2d.assets.loadAudio('bgm-2-1', './audio/Earthen Fury 1-1.mp3');
    s2d.assets.loadAudio('bgm-2-2', './audio/Earthen Fury 1-2.mp3');
}

function init() {
    s2d.text.registerFont('default', 'SF Mono Regular', 18);
    s2d.text.useFont('default', 'black');
    registerKeyboard();
    initUI();

    enemyList.push(makeEnemy('Wasteland Aligator'));
}

function update(dt) {
    drawUI();
    drawParty();
    textToInput();

    if (needsPressToContinue()) {
        return;
    }

    // "Global" Commands # pause menu stuff
    if (hasInput()) {
        let clearInput = true;

        switch(input.value) {
            // Graphics
            case 'CLS':
            case 'CLEAR':
                terminal.clear();
                break;

            // Audio

            // VERY TEMPORARY IMPLEMENTATION YES? YES
            case 'LOG 1':
                stopNowPlayingStartTrack('log-1')
                // s2d.audio.play('log-1');
                break;
            case 'BGM 1':
                stopNowPlayingStartTrack('bgm-1')
                // s2d.audio.play('bgm-1');
                nowPlaying = 'bgm-1';
                break;
            case 'BGM 2':
            case 'BGM 2 PART 0':
                stopNowPlayingStartTrack('bgm-2')
                //s2d.audio.play('bgm-2');
                break;
            case 'BGM 2 PART 1':
                stopNowPlayingStartTrack('bgm-2-1')
                //s2d.audio.play('bgm-2-1');
                break;
            case 'BGM 2 PART 2':
                stopNowPlayingStartTrack('bgm-2-2')
                //s2d.audio.play('bgm-2-2');
                break;
            default:
                clearInput = false;
        }

        if (clearInput) {
            input.clear();
        }
    }

    // Combat
    if (!inCombat) {
        terminal.append("A Wasteland Aligator appears! --");
        inCombat = true;
    }
    else {
        combatRound();
    }

    // Exploration Commands # wrap this into a function of some kind
    if (hasInput()) {
        let clearInput = true;
        switch(input.value) {
            default:
                clearInput = false;
        }
        if (clearInput) {
            input.clear();
        }
    }

    // Input Clean-up
    if (hasInput()) {
        input.clear();
    }
}

function main() {
    s2d.core.init(800, 450, load, init, update);
}