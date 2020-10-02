import 'colors';
import 'colorts/lib/string';
import { Colour } from '../misc/colour';
import { NumberToAlphabet } from '../misc/alphabetMap';
import { PieceType } from './pieceType';
import { EmptySpace } from '../chess_pieces/emptySpace';
import { ChessPiece } from '../chess_pieces/chessPiece';
import { Utilities } from '../misc/utilities';
import { Cell } from './cell';
import { CellState } from './cellState';
import { Colours } from '../misc/colours';

export class ChessBoard {

    dimensions: [number, number];
    capturedPieces: ChessPiece[];
    board: Cell[][];
    reversed: boolean;
    headers: { rowWidth: number, colHeight: number };

    constructor(
        board: ChessPiece[][],
        public piecesAllowed: PieceType[] = [...Object.values(PieceType)],
        public fontColour: Colour = Colour.Magenta,
        public bgColour: Colour = Colour.Grey,
        public highlight: Colour = Colour.Green
    ) {
        this.board = this.convertBoard(board);
        this.dimensions = [this.board.length, this.board[0].length];    // rows, columns
        this.capturedPieces = [];
        this.reversed = false;
        this.headers = { rowWidth: 2, colHeight: 1 };
    }

    convertBoard(board: ChessPiece[][]): Cell[][] {
        let boardCells = Utilities.declare2DArr(board.length, board[0].length);
        for (let row = 0; row < board.length; row++) {
            for (let col = 0; col < board[0].length; col++) {
                boardCells[row][col] = new Cell(board[row][col]);
            }
        }
        return boardCells;
    }

    checkUniques(): boolean {
        let uniques: [Colour, PieceType][] = [];
        for (let row = 0; row < this.board.length; row++) {
            for (let column = 0; column < this.board[0].length; column++) {
                if (this.board[row][column].piece.unique) {
                    if (Utilities.containsSubArray(uniques, [this.board[row][column].piece.owner, this.board[row][column].piece.pieceType])) {
                        return false;
                    }
                    else {
                        uniques.push([this.board[row][column].piece.owner, this.board[row][column].piece.pieceType]);
                    }
                }
            }
        }
        return true;
    }

    checkAllowed(): boolean {
        for (let row of this.board) {
            for (let piece of row) {
                if (!this.piecesAllowed.includes(piece.piece.pieceType)) {
                    return false;
                }
            }
        }
        return true;
    }

    isValid(): boolean {
        return this.checkUniques() && this.checkAllowed();
    }

    showProjection(coords: [number, number]): void {
        this.board.forEach((row, rowNum) => row.forEach((cell, colNum) => {
            if (this.checkMovement(coords, [rowNum, colNum])[0]) {
                cell.state = CellState.Projected;
            }
        }));
        this.board[coords[0]][coords[1]].state = CellState.Selected;
        this.display();
    }

    display(): void {
        let boardStr: string = "";
        boardStr += this.getHeader({});
        for (let row = 0; row < this.dimensions[0]; row++) {
            let header = this.getHeader({ row: row });
            let rowCells: Cell[] = [];
            for (let col = 0; col < this.dimensions[1]; col++) {
                rowCells.push(this.board[row][col]);
            }
            boardStr += Utilities.appendMultilineStr([header, ...rowCells.map(cell => cell.display())]);
        }
        console.log(boardStr);
        console.log(this.getCaptured());
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

    //! multilines?
    //! optimisation??
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
        else {
            // diagonal movement
            for (let i = Math.min(oldPos[0], newPos[0]) + 1, j = Math.min(oldPos[1], newPos[1]) + 1; i < Math.max(oldPos[0], newPos[0]) && j < Math.max(oldPos[1], newPos[1]); i++, j++) {
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

    checkMovement(oldPos: [number, number], newPos: [number, number]): [boolean, string] {
        // no move
        if (oldPos[0] === newPos[0] && oldPos[1] === newPos[1]) {
            return [false, "stationary"];
        }
        // check whether move is out of bounds
        else if (this.isOutOfBounds(newPos)) {
            return [false, "out of bounds"];
        }
        // check whether piece is able to make the move
        let validMove = this.board[oldPos[0]][oldPos[1]].piece.checkMovement(oldPos, newPos, this.board[newPos[0]][newPos[1]].piece);
        if (validMove) {
            // check if end position is occupied by a piece of the same colour
            if (this.board[oldPos[0]][oldPos[1]].piece.owner === this.board[newPos[0]][newPos[1]].piece.owner) {
                return [false, "same owner"];
            }
            // check whether move is blocked
            else if (this.board[oldPos[0]][oldPos[1]].piece.canBeBlocked) {
                return [this.pieceNotBlocked(oldPos, newPos), "blocked"];
            }
            // valid move
            else {
                return [true, ""];
            }
        }
        else {
            return [false, `invalid ${this.board[oldPos[0]][oldPos[1]].piece.pieceType.toLowerCase()}  move`];
        }
    }

    getPossibleMovements(pos: [number, number]): number[][] {
        throw new Error("Method not implemented!");
    }

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