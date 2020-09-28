import { Colour } from './../misc/colour';
import { PieceType } from '../chess_general/pieceType';
import { ChessPiece } from './chessPiece';

export class King implements ChessPiece {

    unique: boolean;
    objective: boolean;
    hasMoved: boolean;
    canBeBlocked: boolean;
    pieceType: PieceType;

    constructor(
        public owner: Colour
    ) {
        this.unique = true;
        this.objective = true;
        this.hasMoved = false;
        this.canBeBlocked = false;
        this.pieceType = PieceType.King;
    }

    checkMovement(oldPosition: [number, number], newPosition: [number, number], pieceAtNewPos?: ChessPiece): boolean {
        // horizontal 1 step
        return (oldPosition[0] === newPosition[0] && ((oldPosition[1] === newPosition[1] + 1) || (oldPosition[1] === newPosition[1] - 1)))
        // vertical 1 step
        || (oldPosition[1] === newPosition[1] && ((oldPosition[0] === newPosition[0] + 1) || (oldPosition[0] === newPosition[1] - 1)))
        // diagonal 1 step
        || ((Math.abs(newPosition[0] - oldPosition[0]) === Math.abs(newPosition[1] - oldPosition[1])) && Math.abs(newPosition[0] - oldPosition[0]) === 1 && Math.abs(newPosition[1] - oldPosition[1]) === 1);
    }
}