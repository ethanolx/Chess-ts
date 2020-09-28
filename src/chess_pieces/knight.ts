import { Colour } from './../misc/colour';
import { PieceType } from '../chess_general/pieceType';
import { ChessPiece } from './chessPiece';

export class Knight implements ChessPiece {

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
        this.canBeBlocked = false;
        this.pieceType = PieceType.Knight
    }

    checkMovement(oldPosition: [number, number], newPosition: [number, number], pieceAtNewPos?: ChessPiece): boolean {
        // horizontal move first
        return (Math.abs(newPosition[0] - oldPosition[0]) === 1 && Math.abs(newPosition[1] - oldPosition[1]) === 2)
        // vertical move first
        || (Math.abs(newPosition[1] - oldPosition[1]) === 1 && Math.abs(newPosition[0] - oldPosition[0]) === 2);
    }
}