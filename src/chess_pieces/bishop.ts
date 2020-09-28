import { Colour } from './../misc/colour';
import { PieceType } from '../chess_general/pieceType';
import { ChessPiece } from './chessPiece';

export class Bishop implements ChessPiece {

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
        this.pieceType = PieceType.Bishop;
    }

    checkMovement(oldPosition: [number, number], newPosition: [number, number], pieceAtNewPos?: ChessPiece): boolean {
        return (Math.abs(newPosition[0] - oldPosition[0]) === Math.abs(newPosition[1] - oldPosition[1]));
    }
}