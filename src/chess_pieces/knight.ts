import { Colour } from './../misc/colour';
import { PieceType } from '../chess_general/pieceType';
import { ChessPiece } from './chessPiece';

export class Knight implements ChessPiece {

    unique: boolean = false;
    objective: boolean = false;
    hasMoved: boolean = false;
    canBeBlocked: boolean = false;
    pieceType: PieceType = PieceType.Knight;
    possMovements: [number, number][] = [];

    constructor(
        public owner: Colour
    ) { }

    checkMovement(oldPosition: [number, number], newPosition: [number, number], pieceAtNewPos?: ChessPiece): boolean {
        // horizontal move first
        return (Math.abs(newPosition[0] - oldPosition[0]) === 1 && Math.abs(newPosition[1] - oldPosition[1]) === 2)
            // vertical move first
            || (Math.abs(newPosition[1] - oldPosition[1]) === 1 && Math.abs(newPosition[0] - oldPosition[0]) === 2);
    }
}