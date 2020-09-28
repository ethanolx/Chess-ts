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
    objectives: ChessPiece[] = [];

    constructor(players?: [Colour, PlayerType][], board?: ChessBoard) {
        this.players = players || [[Colour.White, PlayerType.Human], [Colour.Cyan, PlayerType.Human]];
        this.activeBoard = board || this.defaultBoard;
        this.activeBoard.board.forEach(row => row.forEach(cell => {
            if (cell.piece.objective) {
                this.objectives.push(cell.piece);
            }
        }));
    }

    run(): void {
        do {
            this.nextRound();
        }
        while (true);
    }

    nextTurn(turn: number): boolean {
        do {
            let from = this.getPieceToMove(turn);
            if (from === [-1, -1]) {
                break;
                return false;
            }
            let to = this.selectCoords("\'to\'");
            this.activeBoard.move(from, to);
            this.activeBoard.reset();
            this.activeBoard.display();

            input.question();
        }
        while (true);
        return true;
    }

    nextRound(): void {
        for (let turn = 0; turn < this.players.length; turn++) {
            this.nextTurn(turn);
            this.activeBoard.reverse();
        }
    }

    isGameOver(): boolean {
        return this.objectives.length === 1;
    }

    getPieceToMove(turn: number): [number, number] {
        let from: [number, number] = [-1, -1];
        do {
            console.clear();
            this.activeBoard.display();
            from = this.selectCoords("\'from\'");
        }
        while((!this.activeBoard.isOutOfBounds(from) || this.activeBoard.board[from[0]][from[1]].piece.owner !== this.players[turn][0]) && from !== [-1, -1]);
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