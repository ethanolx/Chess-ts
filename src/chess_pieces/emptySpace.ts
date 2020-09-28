import { Colour } from './../misc/colour';
import { PieceType } from '../chess_general/pieceType';
import { ChessPiece } from './chessPiece';

export class EmptySpace implements ChessPiece {

    owner: Colour;
    unique: boolean;
    hasMoved: boolean;
    objective: boolean;
    canBeBlocked: boolean;
    pieceType: PieceType

    constructor() {
        this.owner = Colour.None;
        this.unique = false;
        this.hasMoved = false;
        this.objective = false;
        this.canBeBlocked = false;
        this.pieceType = PieceType.Null;
    }

    checkMovement(oldPosition: [number, number], newPosition: [number, number], pieceAtNewPos?: ChessPiece): boolean {
        return false;
    }
}