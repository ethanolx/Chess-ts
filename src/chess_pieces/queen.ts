import { Colour } from './../misc/colour';
import { PieceType } from '../chess_general/pieceType';
import { ChessPiece } from './chessPiece';

export class Queen implements ChessPiece {

    unique: boolean;
    objective: boolean;
    hasMoved: boolean;
    canBeBlocked: boolean;
    pieceType: PieceType;

    constructor(
        public owner: Colour
    ) {
        this.unique = false;
        this.objective = false;
        this.hasMoved = false;
        this.canBeBlocked = true;
        this.pieceType = PieceType.Queen;
    }

    checkMovement(oldPosition: [number, number], newPosition: [number, number], pieceAtNewPos?: ChessPiece): boolean {
        // horizontal
        return (oldPosition[0] === newPosition[0])
        // vertical
        || (oldPosition[1] === newPosition[1])
        // diagonal
        || (Math.abs(newPosition[0] - oldPosition[0]) === Math.abs(newPosition[1] - oldPosition[1]));
    }
}