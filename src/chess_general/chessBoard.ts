import 'colors';
import 'colorts/lib/string';
import { Colour } from '../misc/colour';
import { NumberToAlphabet } from '../misc/alphabetMap';
import { PieceType } from '../chess_pieces/pieceType';
import { EmptySpace } from '../chess_pieces/emptySpace';
import { ChessPiece } from '../chess_pieces/chessPiece';
import { Utilities } from '../misc/utilities';
import { Cell } from './cell';
import { CellState } from './cellState';
import { Colours } from '../misc/colours';

export class ChessBoard {

    dimensions: [number, number];
    capturedPieces: ChessPiece[] = [];
    board: Cell[][];
    reversed: boolean = false;
    headers: { rowWidth: number, colHeight: number } = { rowWidth: 2, colHeight: 1 };

    constructor(
        board: ChessPiece[][],
        public piecesAllowed: PieceType[] = [...Object.values(PieceType)],
        public fontColour: Colour = Colour.Magenta,
        public bgColour: Colour = Colour.Grey,
        public highlight: Colour = Colour.Green
    ) {
        if (this.checkBoard(board)) {
            this.board = this.convertBoard(board);
        }
        else {
            this.board = [];
        }
        this.dimensions = [this.board.length, this.board[0].length];    // rows, columns
    }

    //$ Board Validation and Conversion
    convertBoard(board: ChessPiece[][]): Cell[][] {
        let boardCells = Utilities.declare2DArr(board.length, board[0].length);
        for (let row = 0; row < board.length; row++) {
            for (let col = 0; col < board[0].length; col++) {
                boardCells[row][col] = new Cell(board[row][col]);
            }
        }
        return boardCells;
    }

    checkUniques(board: ChessPiece[][]): boolean {
        let uniques: [Colour, PieceType][] = [];
        for (let row = 0; row < board.length; row++) {
            for (let column = 0; column < board[0].length; column++) {
                if (board[row][column].unique) {
                    if (Utilities.containsSubArray(uniques, [board[row][column].owner, board[row][column].pieceType])) {
                        return false;
                    }
                    else {
                        uniques.push([board[row][column].owner, board[row][column].pieceType]);
                    }
                }
            }
        }
        return true;
    }

    checkAllowed(board: ChessPiece[][]): boolean {
        for (let row of board) {
            for (let piece of row) {
                if (!this.piecesAllowed.includes(piece.pieceType)) {
                    return false;
                }
            }
        }
        return true;
    }

    checkBoard(board: ChessPiece[][]): boolean {
        return this.checkUniques(board) && this.checkAllowed(board);
    }

    //$ Display
    getProjection(coords: [number, number]): void {
        this.board.forEach((row, rowNum) => row.forEach((cell, colNum) => {
            cell.state = this.checkMovement(coords, [rowNum, colNum])[0] ? CellState.Projected : CellState.Normal;
        }));
        this.board[coords[0]][coords[1]].state = CellState.Selected;
    }

    display(): void {
        let boardStr: string = "";
        boardStr += Utilities.appendMultilineStr([this.getHeader({}), this.getColourStopper(true)]);
        for (let row = 0; row < this.dimensions[0]; row++) {
            let header = this.getHeader({ row: row });
            let rowCells: Cell[] = [];
            for (let col = 0; col < this.dimensions[1]; col++) {
                rowCells.push(this.board[row][col]);
            }
            boardStr += Utilities.appendMultilineStr([header, ...rowCells.map(cell => cell.getDisplay()), this.getColourStopper()]);
        }
        console.log(boardStr);
        console.log(this.getCaptured());
    }

    getColourStopper(colHeader: boolean = false): string {
        return colHeader ? Utilities.repeatString('|', this.headers.colHeight, "vertical") : Utilities.repeatString('|', Cell.dimensions.height, "vertical");
    }

    getCaptured(): string {
        if (this.capturedPieces.length === 0) {
            return "No Captured Pieces";
        }
        else {
            let capturedPieces = "Captured Pieces: ";
            this.capturedPieces.forEach(piece => capturedPieces += Cell.colourPiece(piece) + " , ");
            capturedPieces += "\b\b ";
            return capturedPieces;
        }
    }

    getHeader(marker: { row?: number }): string {
        let header: string = "";
        const rowNum = this.reversed ? this.dimensions[0] - (marker.row || 0) - 1 : marker.row || 0;

        // row header (alphabetical)
        if (marker.row !== undefined) {
            for (let i = 0; i < Cell.dimensions.height; i++) {
                if (i !== Math.floor((Cell.dimensions.height - 1) / 2)) {
                    header += this.colour(Utilities.getWhiteSpace(this.headers.rowWidth));
                }
                else {
                    let rowHeader = Utilities.getWhiteSpace(this.headers.rowWidth);
                    rowHeader = Utilities.replaceCharInStr(rowHeader, (NumberToAlphabet.get(rowNum) || ''), 0);
                    header += this.colour(rowHeader);
                }
                header += (i !== Cell.dimensions.height - 1) ? '\n' : '';
            }
        }
        // col header (numerical)
        else {
            header += this.colour(Utilities.getWhiteSpace(this.headers.rowWidth));
            for (let i = 0; i < this.dimensions[1]; i++) {
                let colHeader = Utilities.getWhiteSpace(Cell.dimensions.width);
                colHeader = Utilities.replaceCharInStr(colHeader, (`${(!this.reversed) ? i + 1 : this.dimensions[1] - i}`), Math.floor((Cell.dimensions.width - 1) / 2));
                header += this.colour(colHeader);
            }
            for (let i = 1; i < this.headers.colHeight; i++) {
                header += '\n';
                header += this.colour(Utilities.getWhiteSpace(this.headers.rowWidth + Cell.dimensions.width * this.dimensions[1]));
            }
            header += '\n';
        }
        return header;
    }

    //$ Movement Validation
    move(oldPos: [number, number], newPos: [number, number]): void {
        if (this.checkMovement(oldPos, newPos)[0]) {
            if (!(this.board[newPos[0]][newPos[1]].piece instanceof EmptySpace)) {
                this.capturedPieces.push(this.board[newPos[0]][newPos[1]].piece);
            }
            this.board[newPos[0]][newPos[1]].piece = this.board[oldPos[0]][oldPos[1]].piece;
            this.board[newPos[0]][newPos[1]].piece.hasMoved = true;
            this.board[oldPos[0]][oldPos[1]].piece = new EmptySpace();
        }
        else {
            console.log("Error: " + this.checkMovement(oldPos, newPos)[1]);
        }
    }

    checkMovement(oldPos: [number, number], newPos: [number, number]): [boolean, string] {
        let oldPiece = this.board[oldPos[0]][oldPos[1]].piece;
        let newPiece = this.board[newPos[0]][newPos[1]].piece;
        // no move
        if (oldPos[0] === newPos[0] && oldPos[1] === newPos[1]) {
            return [false, "stationary"];
        }
        // check whether move is out of bounds
        else if (this.isOutOfBounds(newPos)) {
            return [false, "out of bounds"];
        }
        // check whether piece is able to make the move
        let validMove = oldPiece.checkMovement(oldPos, newPos, newPiece);
        if (validMove) {
            // check if end position is occupied by a piece of the same colour
            if (oldPiece.owner === newPiece.owner) {
                return [false, "same owner"];
            }
            // check whether move is blocked
            else if (oldPiece.canBeBlocked) {
                return [this.pieceNotBlocked(oldPos, newPos), "blocked"];
            }
            // valid move
            else {
                return [true, ""];
            }
        }
        else {
            return [false, `invalid ${oldPiece.pieceType.toLowerCase()}  move`];
        }
    }

    pieceNotBlocked(oldPos: [number, number], newPos: [number, number]): boolean {
        if (oldPos[0] === newPos[0]) {
            // horizontal movement
            for (let i = Math.min(oldPos[1], newPos[1]) + 1; i < Math.max(oldPos[1], newPos[1]); i++) {
                if (!(this.board[oldPos[0]][i].piece instanceof EmptySpace)) {
                    return false;
                }
            }
        }
        else if (oldPos[1] === newPos[1]) {
            // vertical movement
            for (let i = Math.min(oldPos[0], newPos[0]) + 1; i < Math.max(oldPos[0], newPos[0]); i++) {
                if (!(this.board[i][oldPos[1]].piece instanceof EmptySpace)) {
                    return false;
                }
            }
        }
        else if (newPos[1] - oldPos[1] === newPos[0] - oldPos[0]) {
            // \ diagonal movement
            for (let i = Math.min(oldPos[0], newPos[0]) + 1, j = Math.min(oldPos[1], newPos[1]) + 1; i < Math.max(oldPos[0], newPos[0]) && j < Math.max(oldPos[1], newPos[1]); i++, j++) {
                if (!(this.board[i][j].piece instanceof EmptySpace)) {
                    return false;
                }
            }
        }
        else if (newPos[1] - oldPos[1] === oldPos[0] - newPos[0]) {
            // / diagonal movement
            for (let i = Math.max(oldPos[0], newPos[0]) - 1, j = Math.min(oldPos[1], newPos[1]) + 1; i < Math.max(oldPos[0], newPos[0]) && j < Math.max(oldPos[1], newPos[1]); i--, j++) {
                if (!(this.board[i][j].piece instanceof EmptySpace)) {
                    return false;
                }
            }
        }
        return true;
    }

    isOutOfBounds(pos: [number, number]): boolean {
        return pos[0] >= this.dimensions[0] || pos[1] >= this.dimensions[1];
    }

    //$ General
    colour(str: string): string {
        let colouredString = Colours.colourBG(Colours.colourText(str, this.fontColour), this.bgColour);
        return colouredString;
    }

    reverse(): void {
        this.board.reverse();
        for (let row of this.board) {
            row.reverse();
        }
        this.reversed = !this.reversed;
    }

    reset(): void {
        for (let row of this.board) {
            for (let cell of row) {
                cell.state = CellState.Normal;
            }
        }
    }
}