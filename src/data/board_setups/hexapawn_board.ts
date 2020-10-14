import { EmptySpace } from '../../chess_pieces/emptySpace';
import { Colour } from '../../misc/colours/colour';
import { Pawn } from '../../chess_pieces/pawn';
import { ChessBoard } from '../../chess_general/chessBoard';

export const HexapawnBoard = new ChessBoard([
    [new Pawn(Colour.Cyan), new Pawn(Colour.Cyan), new Pawn(Colour.Cyan)],
    [new EmptySpace(), new EmptySpace(), new EmptySpace()],
    [new Pawn(Colour.White), new Pawn(Colour.White), new Pawn(Colour.White)]
]);