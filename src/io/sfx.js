/*  needsPressToContinue    */

const minBlockInSeconds = 0.1;
let blockStartedAt = 0;

function needsPressToContinue() {
    if (terminal.log.length < 1) return false;

    let blockingLineIndex = -1;
    for (let index in terminal.log) {
        if (terminal.log[index].substr(-2) === "--") {
            blockingLineIndex = index;
            break;
        }
    }

    if (blockingLineIndex == -1) return false;

    if (!blockStartedAt) {
        blockStartedAt = s2d.time.elapsed();
    }

    if (s2d.time.elapsed() - blockStartedAt < minBlockInSeconds) return false;

    if (blockingLineIndex != -1 && s2d.input.anyButtonPressed()) {
        terminal.log[blockingLineIndex] = terminal.log[blockingLineIndex].slice(0, " --".length * -1);
        blockStartedAt = 0;
        input.clear();
    }

    return blockingLineIndex != -1;
}

/*  characterInjury         */
