import { ChessPiece } from './../chess_pieces/chessPiece';
import { Colour } from './../misc/colour';
import { AlphabetToNumber } from './../misc/alphabetMap';
import { PlayerType } from './playerType';
import { Pawn } from './../chess_pieces/pawn';
import { EmptySpace } from './../chess_pieces/emptySpace';
import { King } from './../chess_pieces/king';
import { Queen } from './../chess_pieces/queen';
import { Bishop } from './../chess_pieces/bishop';
import { Knight } from './../chess_pieces/knight';
import { Rook } from './../chess_pieces/rook';
import { ChessBoard } from './chessBoard';
import * as input from 'readline-sync';
import { Utilities } from '../misc/utilities';

export class ChessGame {

    defaultBoard: ChessBoard = new ChessBoard(
        [
            [new Rook(Colour.Cyan), new Knight(Colour.Cyan), new Bishop(Colour.Cyan), new Queen(Colour.Cyan), new King(Colour.Cyan), new Bishop(Colour.Cyan), new Knight(Colour.Cyan), new Rook(Colour.Cyan)],
            [new Pawn(Colour.Cyan), new Pawn(Colour.Cyan), new Pawn(Colour.Cyan), new Pawn(Colour.Cyan), new Pawn(Colour.Cyan), new Pawn(Colour.Cyan), new Pawn(Colour.Cyan), new Pawn(Colour.Cyan)],
            [new EmptySpace(), new EmptySpace(), new EmptySpace(), new EmptySpace(), new EmptySpace(), new EmptySpace(), new EmptySpace(), new EmptySpace()],
            [new EmptySpace(), new EmptySpace(), new EmptySpace(), new EmptySpace(), new EmptySpace(), new EmptySpace(), new EmptySpace(), new EmptySpace()],
            [new EmptySpace(), new EmptySpace(), new EmptySpace(), new EmptySpace(), new EmptySpace(), new EmptySpace(), new EmptySpace(), new EmptySpace()],
            [new EmptySpace(), new EmptySpace(), new EmptySpace(), new EmptySpace(), new EmptySpace(), new EmptySpace(), new EmptySpace(), new EmptySpace()],
            [new Pawn(Colour.White), new Pawn(Colour.White), new Pawn(Colour.White), new Pawn(Colour.White), new Pawn(Colour.White), new Pawn(Colour.White), new Pawn(Colour.White), new Pawn(Colour.White)],
            [new Rook(Colour.White), new Knight(Colour.White), new Bishop(Colour.White), new Queen(Colour.White), new King(Colour.White), new Bishop(Colour.White), new Knight(Colour.White), new Rook(Colour.White)]
        ]
    );
    activeBoard: ChessBoard;
    players: [Colour, PlayerType][];
    terminationStr: string = '%';
    objectives: number = 0;
    objectivesCaptured: number = 0;

    constructor(board?: ChessBoard, players?: [Colour, PlayerType][]) {
        this.activeBoard = board || this.defaultBoard;
        this.players = players || [[Colour.White, PlayerType.Human], [Colour.Cyan, PlayerType.Human]];
        this.activeBoard.board.forEach(row => row.forEach(cell => {
            if (cell.piece.objective) {
                this.objectives++;
            }
        }));
    }

    run(): void {
        let cont: boolean;
        do {
            cont = this.takeRound();
        }
        while (cont);
        console.log(this.isGameOver() ? this.getGOMsg() : "Session terminated");
    }

    takeTurn(turn: number): boolean {
        let cont = true;
        do {
            let from = this.getPieceToMove(turn);
            if (Utilities.compareArrays(from, [-1, -1])) {
                return false;
            }
            //! to inconsistent with from
            let to = this.selectCoords("\'to\'");
            cont = !this.activeBoard.checkMovement(from, to)[0];
            this.checkObjectiveCapture(from, to);

            //! called many times!! - endless loop
            this.activeBoard.move(from, to);
            this.activeBoard.reset();
            this.activeBoard.display();

            input.question();
        }
        while (cont);
        return true;
    }

    takeRound(): boolean {
        for (let turn = 0; turn < this.players.length; turn++) {
            if (!this.takeTurn(turn) || this.isGameOver()) {
                return false;
            }
            this.activeBoard.reverse();
        }
        return true;
    }

    checkObjectiveCapture(from: [number, number], to: [number, number]): void {
        if (this.activeBoard.checkMovement(from, to)[0] && this.activeBoard.board[to[0]][to[1]].piece.objective) {
            this.objectivesCaptured++;
        }
    }

    isGameOver(): boolean {
        return this.objectives === this.objectivesCaptured + 1;
    }

    getGOMsg(): string {
        return `Someone has won!`;
    }

    getPieceToMove(turn: number): [number, number] {
        let from: [number, number] = [-1, -1];
        do {
            console.clear();
            this.activeBoard.display();
            from = this.selectCoords("\'from\'");
            if (Utilities.compareArrays(from, [-1, -1])) {
                return [-1, -1];
            }
        }
        while (this.activeBoard.isOutOfBounds(from) || this.activeBoard.board[from[0]][from[1]].piece.owner !== this.players[turn][0]);
        console.clear();
        this.activeBoard.showProjection(from);
        return from;
    }

    selectCoords(direction: "\'from\'" | "\'to\'"): [number, number] {
        let piece: string;
        do {
            piece = input.question(`Enter ${direction} Coordinates (e.g. A1, C4) [\'${this.terminationStr}\' to quit]: `).toUpperCase();
            if (piece.trim() === this.terminationStr) {
                return [-1, -1];
            }
        }
        while (!this.validCoordinates(piece));
        let row_coord = (this.activeBoard.reversed) ? this.activeBoard.dimensions[0] - (AlphabetToNumber.get(piece.charAt(0)) || 0) - 1 : AlphabetToNumber.get(piece.charAt(0)) || 0;
        let col_coord = (this.activeBoard.reversed) ? this.activeBoard.dimensions[1] - parseInt(piece.charAt(1)) : parseInt(piece.charAt(1)) - 1;
        return [row_coord, col_coord];
    }

    validCoordinates(coords: string): boolean {
        return (coords.trim().length === 2) && (AlphabetToNumber.has(coords.charAt(0)));
    }
}