import { Colour } from '../misc/colours/colour';
import { PieceType } from './pieceType';
import { EmptySpace } from './emptySpace';
import { ChessPiece } from './chessPiece';

export class Pawn implements ChessPiece {

    hasMoved: boolean = false;
    objective: boolean = false;
    unique: boolean = false;
    canBeBlocked: boolean = true;
    possMovements: [number, number][] = [];
    pieceType: PieceType = PieceType.Pawn;

    constructor(
        public owner: Colour,
    ) { }

    checkMovement(oldPosition: [number, number], newPosition: [number, number], pieceAtNewPosition: ChessPiece): boolean {
        // moves 1 space forward
        return ((newPosition[0] === oldPosition[0] - 1) && (newPosition[1] === oldPosition[1]) && (pieceAtNewPosition instanceof EmptySpace))
            // moves 2 spaces forward
            || ((newPosition[0] === oldPosition[0] - 2) && (newPosition[1] === oldPosition[1]) && (pieceAtNewPosition instanceof EmptySpace) && (!this.hasMoved))
            // moves 1 space forward diagonally (must capture)
            || ((newPosition[0] === oldPosition[0] - 1) && ((newPosition[1] === oldPosition[1] - 1) || (newPosition[1] === oldPosition[1] + 1)) && (!(pieceAtNewPosition instanceof EmptySpace)) && (pieceAtNewPosition.owner !== this.owner));
    }
}