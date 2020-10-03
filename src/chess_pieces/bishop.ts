import { Colour } from './../misc/colour';
import { PieceType } from '../chess_general/pieceType';
import { ChessPiece } from './chessPiece';

export class Bishop implements ChessPiece {

    unique: boolean = false;
    objective: boolean = false;
    hasMoved: boolean = false;
    canBeBlocked: boolean = true;
    pieceType: PieceType = PieceType.Bishop;
    possMovements: [number, number][] = [];

    constructor(
        public owner: Colour
    ) {}

    checkMovement(oldPosition: [number, number], newPosition: [number, number], pieceAtNewPos?: ChessPiece): boolean {
        return (Math.abs(newPosition[0] - oldPosition[0]) === Math.abs(newPosition[1] - oldPosition[1]));
    }
}