import { Colour } from './../misc/colour';
import { PieceType } from './pieceType';

export interface ChessPiece {
    owner: Colour;
    unique: boolean;
    objective: boolean;
    hasMoved: boolean;      // begins false
    canBeBlocked: boolean;
    pieceType: PieceType;    // represents char too
    possMovements: [number, number][];

    checkMovement(oldPosition: [number, number], newPosition: [number, number], pieceAtNewPos?: ChessPiece): boolean;
}