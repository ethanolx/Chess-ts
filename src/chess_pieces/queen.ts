import { Colour } from './../misc/colour';
import { PieceType } from '../chess_general/pieceType';
import { ChessPiece } from './chessPiece';

export class Queen implements ChessPiece {

    unique: boolean = false;
    objective: boolean = false;
    hasMoved: boolean = false;
    canBeBlocked: boolean = true;
    pieceType: PieceType = PieceType.Queen;
    possMovements: [number, number][] = [];

    constructor(
        public owner: Colour
    ) { }

    checkMovement(oldPosition: [number, number], newPosition: [number, number], pieceAtNewPos?: ChessPiece): boolean {
        // horizontal
        return (oldPosition[0] === newPosition[0])
            // vertical
            || (oldPosition[1] === newPosition[1])
            // diagonal
            || (Math.abs(newPosition[0] - oldPosition[0]) === Math.abs(newPosition[1] - oldPosition[1]));
    }
}