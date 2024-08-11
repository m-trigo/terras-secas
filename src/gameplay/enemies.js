// https://pontodoconhecimento.com/animais-da-fauna-brasileira/

const enemies = {
    "Wasteland Aligator" : {
        "NAME": 'Wasteland Aligator',
        "HEALTH": 12,
        "MOVES": [
            bite
            // ambush
            // dive/swim
        ],
        "DAMAGE": 0,
        "STATUS": []
    },
    "Wasteland Wildcat" : {
        "NAME": 'Wasteland Wildcat',
        "HEALTH": 10,
        "MOVES": [
            bite
            // ambush
        ],
        "DAMAGE": 0,
        "STATUS": []
    }
}

function makeEnemy(name) {
    return Object.create(enemies[name]);
}