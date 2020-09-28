import { Colour } from './../misc/colour';
import { PieceType } from '../chess_general/pieceType';

export interface ChessPiece {
    owner: Colour,
    unique: boolean,
    objective: boolean,
    hasMoved: boolean,      // begins false
    canBeBlocked: boolean,
    pieceType: PieceType    // represents char too

    checkMovement(oldPosition: [number, number], newPosition: [number, number], pieceAtNewPos?: ChessPiece): boolean;
}