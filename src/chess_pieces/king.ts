import { NumberToAlphabet } from './../misc/alphabetMap';
import { Rook } from './rook';
import { Colour } from '../misc/colours/colour';
import { PieceType } from './pieceType';
import { ChessPiece } from './chessPiece';

export class King implements ChessPiece {

    unique: boolean = true;
    objective: boolean = true;
    hasMoved: boolean = false;
    canBeBlocked: boolean = true;
    pieceType: PieceType = PieceType.King;
    possMovements: [number, number][] = [];

    constructor(
        public owner: Colour
    ) { }

    checkMovement(oldPosition: [number, number], newPosition: [number, number], pieceAtNewPos: ChessPiece): boolean {
        // horizontal 1 step
        return (oldPosition[0] === newPosition[0] && ((oldPosition[1] === newPosition[1] + 1) || (oldPosition[1] === newPosition[1] - 1)))
            // vertical 1 step
            || (oldPosition[1] === newPosition[1] && ((oldPosition[0] === newPosition[0] + 1) || (oldPosition[0] === newPosition[0] - 1)))
            // diagonal 1 step
            || ((Math.abs(newPosition[0] - oldPosition[0]) === Math.abs(newPosition[1] - oldPosition[1])) && Math.abs(newPosition[0] - oldPosition[0]) === 1 && Math.abs(newPosition[1] - oldPosition[1]) === 1);
    }

    checkCastling(rookCoords: string, pieceAtNewPos: ChessPiece): [boolean, string] {
        if (pieceAtNewPos instanceof Rook) {
            if (this.hasMoved) {
                return [false, "king has moved"];
            }
            else if (pieceAtNewPos.hasMoved) {
                return [false, `rook at ${rookCoords} has moved`];
            }
            else if (this.owner !== pieceAtNewPos.owner) {
                return [false, "rook is opponent's piece"];
            }
            else {
                return [true, ""];
            }
        }
        else {
            return [false, "target is not a rook"];
        }
    }
}