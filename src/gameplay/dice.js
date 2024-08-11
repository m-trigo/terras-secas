function d6() {
    return Math.floor(Math.random() * 6) + 1;
}

function d6_light() {
    return Math.min(d6(), d6(), 5);
}

function d6_heavy() {
    return Math.max(d6(), d6(), 2);
}