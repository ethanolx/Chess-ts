import { Colour } from './../misc/colour';
import { PieceType } from '../chess_general/pieceType';
import { ChessPiece } from './chessPiece';

export class Rook implements ChessPiece {

    unique: boolean = false;
    objective: boolean = false;
    hasMoved: boolean = false;
    possMovements: [number, number][] = [];
    canBeBlocked: boolean = true;
    pieceType: PieceType = PieceType.Rook;

    constructor(
        public owner: Colour
    ) { }

    checkMovement(oldPosition: [number, number], newPosition: [number, number], pieceAtNewPos?: ChessPiece): boolean {
        // horizontal
        return (oldPosition[0] === newPosition[0])
            // vertical
            || (oldPosition[1] === newPosition[1]);
    }
}