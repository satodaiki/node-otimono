process.stdin.resume();
process.stdin.setEncoding('utf8');

var lines = [];
var reader = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});
reader.on('line', (line) => {
    if (line === '') reader.close();
    lines.push(line);
});
reader.on('close', () => {
    const BOARD_INFO = lines[0].split(' ');
    let board = createBoard(BOARD_INFO[0], BOARD_INFO[1]);
    let y = 0;
    for (let i = 1; i < lines.length; i++ ) {
        const BLOCK_INFO = lines[i].split(' ');
        createBlock(board, Number(BLOCK_INFO[0]), Number(BLOCK_INFO[1]), [Number(BLOCK_INFO[2]), y]);
        y += Number(BLOCK_INFO[0]);
    }
    let output = '';
    for (let i = board.length - 1; i >= 0; i-- ) {
        for (let l = 0; l < board[i].length; l++ ) {
            output += board[i][l];
        }
        output += '\n';
    }
    console.log(output);
});

function createBoard(height, width) {
    const DOT = '.';
    let board = [];
    for (let i = 0; i < height; i++) {
        board[i] = [];
        for (let l = 0; l < width; l++) {
            board[i].push(DOT);
        }
    }
    return board;
}

function createBlock(board, height, width, [x, y]) {
    for (let i = 0; i < height; i++ ) {
        for (let l = 0; l < width; l++ ) {
            board[y + i][x + l] = '#';
        }
    }
}
