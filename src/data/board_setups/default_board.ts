import { Colour } from '../../misc/colours/colour';
import { Pawn } from '../../chess_pieces/pawn';
import { EmptySpace } from '../../chess_pieces/emptySpace';
import { King } from '../../chess_pieces/king';
import { Queen } from '../../chess_pieces/queen';
import { Bishop } from '../../chess_pieces/bishop';
import { Knight } from '../../chess_pieces/knight';
import { Rook } from '../../chess_pieces/rook';
import { ChessBoard } from '../../chess_general/chessBoard';

export const DefaultChessBoard = new ChessBoard(
    [
        [new Rook(Colour.Cyan), new Knight(Colour.Cyan), new Bishop(Colour.Cyan), new Queen(Colour.Cyan), new King(Colour.Cyan), new Bishop(Colour.Cyan), new Knight(Colour.Cyan), new Rook(Colour.Cyan)],
        [new Pawn(Colour.Cyan), new Pawn(Colour.Cyan), new Pawn(Colour.Cyan), new Pawn(Colour.Cyan), new Pawn(Colour.Cyan), new Pawn(Colour.Cyan), new Pawn(Colour.Cyan), new Pawn(Colour.Cyan)],
        [new EmptySpace(), new EmptySpace(), new EmptySpace(), new EmptySpace(), new EmptySpace(), new EmptySpace(), new EmptySpace(), new EmptySpace()],
        [new EmptySpace(), new EmptySpace(), new EmptySpace(), new EmptySpace(), new EmptySpace(), new EmptySpace(), new EmptySpace(), new EmptySpace()],
        [new EmptySpace(), new EmptySpace(), new EmptySpace(), new EmptySpace(), new EmptySpace(), new EmptySpace(), new EmptySpace(), new EmptySpace()],
        [new EmptySpace(), new EmptySpace(), new EmptySpace(), new EmptySpace(), new EmptySpace(), new EmptySpace(), new EmptySpace(), new EmptySpace()],
        [new Pawn(Colour.White), new Pawn(Colour.White), new Pawn(Colour.White), new Pawn(Colour.White), new Pawn(Colour.White), new Pawn(Colour.White), new Pawn(Colour.White), new Pawn(Colour.White)],
        [new Rook(Colour.White), new Knight(Colour.White), new Bishop(Colour.White), new Queen(Colour.White), new King(Colour.White), new Bishop(Colour.White), new Knight(Colour.White), new Rook(Colour.White)]
    ]
);