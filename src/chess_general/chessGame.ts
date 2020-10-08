import { DefaultChessBoard } from '../data/board_setups/default_board';
import { ChessPiece } from './../chess_pieces/chessPiece';
import { Colour } from '../misc/colours/colour';
import { AlphabetToNumber } from './../misc/alphabetMap';
import { PlayerType } from '../players/playerType';
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
import { CellState } from './cellState';

export class ChessGame {

    defaultBoard: ChessBoard = DefaultChessBoard;
    activeBoard: ChessBoard;
    players: [Colour, PlayerType][];
    terminationStr: string = '%';
    objectives: ChessPiece[] = [];
    currentTurn: [Colour, PlayerType];

    constructor(board?: ChessBoard, players?: [Colour, PlayerType][]) {
        this.activeBoard = board || this.defaultBoard;
        this.players = players || [[Colour.White, PlayerType.Human], [Colour.Cyan, PlayerType.Human]];
        this.activeBoard.board.forEach(row => row.forEach(cell => {
            if (cell.piece.objective) {
                this.objectives.push(cell.piece);
            }
        }));
        this.currentTurn = this.players[0];
    }

    run(): void {
        let cont: boolean;
        do {
            cont = this.takeRound();
        }
        while (cont);
        console.log(this.isGameOver() ? this.getGOMsg() : "Session terminated");
    }

    takeTurn(): boolean {
        let cont = true;
        do {
            this.getMoveablePieces();
            let from = this.getPieceToMove();
            if (from.break) {
                return false;
            }

            //! to inconsistent with from
            let to = this.selectCoords("\'to\'");
            if (to.break) {
                return false;
            }

            cont = !this.activeBoard.checkMovement(from.coords, to.coords)[0];

            //! called many times!! - endless loop
            this.activeBoard.move(from.coords, to.coords);
            this.removeObjectivesCaptured();
            this.activeBoard.reset();
            this.activeBoard.display();

            input.question();
        }
        while (cont);
        return true;
    }

    takeRound(): boolean {
        for (let turn = 0; turn < this.players.length; turn++) {
            this.currentTurn = this.players[turn];
            if (!this.takeTurn() || this.isGameOver()) {
                return false;
            }
            this.activeBoard.reverse();
        }
        return true;
    }

    removeObjectivesCaptured(): void {
        let objectivesCaptured: Array<ChessPiece> = this.activeBoard.capturedPieces.filter(piece => piece.objective);
        this.objectives = this.objectives.filter(obj => !objectivesCaptured.includes(obj));
    }

    isGameOver(): boolean {
        return this.objectives.length === 1;
    }

    getGOMsg(): string {
        return `${this.objectives[0].owner} wins!`;
    }

    getPieceToMove(): { break: boolean, coords: [number, number] } {
        let from: { break: boolean, coords: [number, number] } = { break: true, coords: [0, 0] };
        let coords: [number, number];
        do {
            console.clear();
            this.activeBoard.display();
            from = this.selectCoords("\'from\'");
            coords = from.coords;
            if (from.break) {
                return { break: true, coords: [0, 0] };
            }
        }
        while (this.activeBoard.isOutOfBounds(coords) || this.activeBoard.board[coords[0]][coords[1]].piece.owner !== this.currentTurn[0]);
        console.clear();
        this.activeBoard.getProjection(coords);
        this.activeBoard.display();
        return from;
    }

    getMoveablePieces(): void {
        for (let row1 = 0; row1 < this.activeBoard.board.length; row1++) {
            for (let col1 = 0; col1 < this.activeBoard.board[0].length; col1++) {
                let cell = this.activeBoard.board[row1][col1];
                cell.piece.possMovements = [];
                for (let row = 0; row < this.activeBoard.board.length; row++) {
                    for (let col = 0; col < this.activeBoard.board[0].length; col++) {
                        if (this.activeBoard.checkMovement([row1, col1], [row, col])[0] && this.activeBoard.board[row1][col1].piece.owner === this.currentTurn[0]) {
                            cell.piece.possMovements.unshift([row, col]);
                        }
                    }
                }
                cell.state = cell.piece.possMovements.length > 0 && cell.piece.owner === this.currentTurn[0] ? CellState.Available : CellState.Normal;
            }
        }
    }

    selectCoords(direction: "\'from\'" | "\'to\'"): { break: boolean, coords: [number, number] } {
        let loc: string;
        do {
            loc = input.question(`Enter ${direction} Coordinates (e.g. A1, C4) [\'${this.terminationStr}\' to quit]: `).toUpperCase().trim();
            if (loc === this.terminationStr) {
                return { break: true, coords: [0, 0] };
            }
        }
        while (!this.validCoordinates(loc));
        let coords = this.activeBoard.convertCoordinates({str: loc});
        return { break: false, coords: coords.tuple };
    }

    validCoordinates(coords: string): boolean {
        return (coords.trim().length === 2) && (AlphabetToNumber.has(coords.charAt(0))) && [...Array(this.activeBoard.board[0].length + 1).keys()].includes(parseInt(coords.charAt(1)));
    }

    customRules(fn: (params: { from: [number, number], to: [number, number], pieceAtEnd: ChessPiece }) => any): any {

    }
}