function stringFormat(templateStr, arguments) {
    let output = "";

    let columns = templateStr.split(' ');
    let argIndex = 0;
    columns.forEach(col => {
        let arg = arguments[argIndex];
        let padding = col - arg.toString().length;
        output += arg;
        output += ' '.repeat(padding);
        argIndex++;
    });

    return output;
}

let terminal = {
    pos: s2d.vec.zero,
    rows: 11,
    log: [],
    lastPrintIndex: 0,

    append(str) {
        this.log.push(str);
    },

    clear() {
        this.log = [];
        this.lastPrintIndex = 0;
    },

    render() {
        for (let logIndex = 0; logIndex < this.log.length; logIndex++) {
            let lineText = this.log[logIndex];
            if (lineText.substr(-2) === "--") {
                this.lastPrintIndex = logIndex;
                break;
            }
        }

        let offset = (this.lastPrintIndex + 1) - this.rows; // why?
        if (offset < 0) {
            offset = 0;
        }

        for (let logIndex = offset; logIndex < this.log.length && logIndex <= this.lastPrintIndex; logIndex++) {
            let rowIndex = logIndex - offset;
            let lineHeight = s2d.text.textHeight('default');
            let lineText = this.log[logIndex];
            s2d.text.print(lineText, this.pos.x, this.pos.y + lineHeight * rowIndex);
        }

        if (this.lastPrintIndex < this.log.length - 1) {
            this.lastPrintIndex++;
        }
    }
}

let terminal2 = {
    pos: s2d.vec.zero,
    rows: 10,
    log: [],

    append(str) {
        this.log.push(str);
    },

    clear() {
        this.log = [];
    },

    render() {
        let offset = this.log.length - this.rows;
        if (offset < 0) {
            offset = 0;
        }

        for (let logIndex = offset; logIndex < this.log.length; logIndex++) {
            let rowIndex = logIndex - offset;
            let lineHeight = s2d.text.textHeight('default');
            s2d.text.print(this.log[logIndex], this.pos.x, this.pos.y + lineHeight * rowIndex);
        }
    }
}

let input = {
    pos: s2d.vec.zero,
    value: "",

    append(str) {
        this.value += str;
    },

    clear() {
        this.value = "";
    },

    render() {
        s2d.text.print(this.value, this.pos.x, this.pos.y);
    }
}