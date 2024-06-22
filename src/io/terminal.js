let terminal = { 
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
            s2d.text.print(this.log[logIndex], 0, lineHeight * rowIndex);
        }
    }
}
