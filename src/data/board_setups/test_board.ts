import { Colour } from '../../misc/colours/colour';
import { Pawn } from '../../chess_pieces/pawn';
import { EmptySpace } from '../../chess_pieces/emptySpace';
import { King } from '../../chess_pieces/king';
import { Queen } from '../../chess_pieces/queen';
import { Bishop } from '../../chess_pieces/bishop';
import { Knight } from '../../chess_pieces/knight';
import { Rook } from '../../chess_pieces/rook';
import { ChessBoard } from '../../chess_general/chessBoard';

export const TestChessBoard = new ChessBoard(
    [
        [new Pawn(Colour.Cyan), new King(Colour.Cyan), new EmptySpace()],
        [new EmptySpace(), new EmptySpace(), new EmptySpace()],
        [new Pawn(Colour.White), new King(Colour.White), new Pawn(Colour.White)]
    ]
);