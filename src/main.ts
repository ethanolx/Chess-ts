import { EmptySpace } from './chess_pieces/emptySpace';
import { King } from './chess_pieces/king';
import { Colour } from './misc/colour';
import { Pawn } from './chess_pieces/pawn';
import { ChessBoard } from './chess_general/chessBoard';
import { ChessGame } from './chess_general/chessGame';
import { PlayerType } from './chess_general/playerType';

let hexpawn = new ChessBoard([
    [new Pawn(Colour.Black), new King(Colour.Black), new Pawn(Colour.Black)],
    [new EmptySpace(), new EmptySpace(), new EmptySpace()],
    [new Pawn(Colour.White), new King(Colour.White), new Pawn(Colour.White)],
]);

const chess = new ChessGame(hexpawn, [[Colour.White, PlayerType.Human], [Colour.Black, PlayerType.Human]]);
chess.run();
