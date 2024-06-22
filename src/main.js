function load() {
    s2d.assets.loadFontFamily('SF Mono Regular', 'fonts/SFMonoRegular.otf');
}

function init() {
    s2d.text.registerFont('default', 'SF Mono Regular', 18);
    s2d.text.useFont('default', 'black');

    s2d.canvas.resizeTo(window.innerWidth, window.innerHeight - 32);
    console.log(`res: ${window.innerWidth} by ${window.innerHeight}`);

    s2d.input.registerButton('Enter', ['Enter']);
}

function update(dt) {
    s2d.text.registerFont('default', 'SF Mono Regular', window.innerWidth/15);

    s2d.canvas.clear('white');
    s2d.debug.drawPixelGrid(32, 'black');
    terminal.render();

    if (s2d.input.buttonPressed('Enter')) {
        let cin = document.getElementById('cin');
        console.log(cin);
        terminal.append(cin.value);
        cin.value = '';
    }
}

function main() {
    s2d.core.init(512, 512, load, init, update);
}