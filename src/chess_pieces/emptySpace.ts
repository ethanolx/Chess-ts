import { Colour } from './../misc/colour';
import { PieceType } from './pieceType';
import { ChessPiece } from './chessPiece';

export class EmptySpace implements ChessPiece {

    owner: Colour = Colour.None;
    unique: boolean = false;
    hasMoved: boolean = false;
    objective: boolean = false;
    canBeBlocked: boolean = false;
    pieceType: PieceType = PieceType.Null;
    possMovements: [number, number][] = [];

    checkMovement(oldPosition: [number, number], newPosition: [number, number], pieceAtNewPos?: ChessPiece): boolean {
        return false;
    }
}