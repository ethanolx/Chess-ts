import { Colour } from './../misc/colour';
import { PieceType } from '../chess_general/pieceType';
import { EmptySpace } from './emptySpace';
import { ChessPiece } from './chessPiece';

export class Pawn implements ChessPiece {

    hasMoved: boolean;
    objective: boolean;
    canBeBlocked: boolean;
    unique: boolean;
    pieceType: PieceType;

    constructor(
        public owner: Colour,
    ) {
        this.hasMoved = false;
        this.objective = false;
        this.unique = false;
        this.canBeBlocked = true;
        this.pieceType = PieceType.Pawn
    }

    checkMovement(oldPosition: [number, number], newPosition: [number, number], pieceAtNewPosition: ChessPiece): boolean {
        // moves 1 space forward
        return ((newPosition[0] === oldPosition[0] - 1) && (newPosition[1] === oldPosition[1]) && (pieceAtNewPosition instanceof EmptySpace))
        // moves 2 spaces forward
        || ((newPosition[0] === oldPosition[0] - 2) && (newPosition[1] === oldPosition[1]) && (pieceAtNewPosition instanceof EmptySpace) && (!this.hasMoved))
        // moves 1 space forward diagonally (must capture)
        || ((newPosition[0] === oldPosition[0] - 1) && ((newPosition[1] === oldPosition[1] - 1) || (newPosition[1] === oldPosition[1] + 1)) && (!(pieceAtNewPosition instanceof EmptySpace)) && (pieceAtNewPosition.owner !== this.owner));
    }
}