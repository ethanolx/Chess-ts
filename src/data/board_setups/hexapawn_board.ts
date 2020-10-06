import { EmptySpace } from '../../chess_pieces/emptySpace';
import { King } from '../../chess_pieces/king';
import { Colour } from '../../misc/colour';
import { Pawn } from '../../chess_pieces/pawn';
import { ChessBoard } from '../../chess_general/chessBoard';

export const HexapawnBoard = new ChessBoard([
    [new Pawn(Colour.Cyan), new King(Colour.Cyan), new Pawn(Colour.Cyan)],
    [new EmptySpace(), new EmptySpace(), new EmptySpace()],
    [new Pawn(Colour.White), new King(Colour.White), new Pawn(Colour.White)],
]);