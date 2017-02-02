class TicTacToe {
    constructor() {
        this.currPlayer = 'x';
        this.cTurnsCount = 0;//count of correct turns
        this.marksStore = [];
        for (var i = 0; i < 3; i++)
            this.marksStore[i] = new Array(3).fill(null);
        this.lastCell = null;//last marked cell
        this.cTurnsLimit = 9;
    }

    getCurrentPlayerSymbol() {
        return this.currPlayer;
    }

    nextTurn(rowIndex, columnIndex) {
        if (
            this.marksStore[rowIndex][columnIndex] === null && !this.isFinished()
        ) {
            this.marksStore[rowIndex][columnIndex] = this.currPlayer;
            this.currPlayer = (this.currPlayer === 'x') ? 'o' : 'x';
            this.lastCell = {row: rowIndex, col: columnIndex};
            this.cTurnsCount++;

        }
    }

    isFinished() {

        if (this.noMoreTurns()) 
            return true;
        else
            return this.haveWinner();

    }

    getWinner() {
        if(this.haveWinner())
            return this.currPlayer==='x' ? 'o': 'x';
        else
            return null;
    }

    haveWinner() {

        if (this.lastCell) {

            var rowInd = this.lastCell.row;
            var colInd = this.lastCell.col;
            var row = this.marksStore[rowInd];
            var col = this.marksStore.map(row => row[colInd]);

            if (rowInd == colInd) {
                if (
                    this.marksStore[0][0] === this.marksStore[1][1] &&
                    this.marksStore[0][0] === this.marksStore[2][2]
                ) {

                    return true;
                }
            }

            if ((rowInd + colInd) === this.marksStore.length - 1) {
                if (
                    this.marksStore[0][2] === this.marksStore[1][1] &&
                    this.marksStore[0][2] === this.marksStore[2][0]
                ) {

                    return true;
                }
            }

            var winRow = row.every(item => item === row[0]);
            var winCol = col.every(item => item === col[0]);
            return (winRow || winCol);
        }
        return false;
    }

    noMoreTurns() {
        if (this.cTurnsCount === this.cTurnsLimit)
            return true;
        else 
            return false;
    }

    isDraw() {
        if (this.noMoreTurns() && !this.getWinner())
            return true;
        else
            return false;
    }

    getFieldValue(rowIndex, colIndex) {
        return this.marksStore[rowIndex][colIndex];
    }
}

module.exports = TicTacToe;
