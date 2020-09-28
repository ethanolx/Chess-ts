import { Colour } from './../misc/colour';
import { PieceType } from '../chess_general/pieceType';
import { ChessPiece } from './chessPiece';

export class Rook implements ChessPiece {

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
        this.pieceType = PieceType.Rook;
    }

    checkMovement(oldPosition: [number, number], newPosition: [number, number], pieceAtNewPos?: ChessPiece): boolean {
        // horizontal
        return (oldPosition[0] === newPosition[0])
        // vertical
        || (oldPosition[1] === newPosition[1]);
    }
}