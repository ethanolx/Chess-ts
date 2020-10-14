import { TestChessBoard } from './data/board_setups/test_board';
import { ChessGame } from './chess_general/chessGame';
import { Colour } from './misc/colours/colour';
import { PlayerType } from './players/playerType';

// const chess = new ChessGame(hexpawn, [[Colour.White, PlayerType.Human], [Colour.Cyan, PlayerType.Human]]);
const chess = new ChessGame(TestChessBoard, [[Colour.White, PlayerType.Human], [Colour.Cyan, PlayerType.Human]]);
chess.run();