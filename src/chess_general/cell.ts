import { Colour } from './../misc/colour';
import { CellState } from './cellState';
import { ChessPiece } from './../chess_pieces/chessPiece';
import "colors";
import { Colours } from '../misc/colours';

export class Cell {

    static dimensions: { height: number, width: number } = { height: 3, width: 6 };
    state: CellState = CellState.Normal;

    constructor(
        public piece: ChessPiece
    ) { }

    getDisplay(): string {
        let cellDisplayArr = [];
        for (let row = 0; row < Cell.dimensions.height; row++) {
            //  top and bottom margin around piece
            if (row !== Math.floor((Cell.dimensions.height - 1) / 2)) {
                for (let column = 0; column < Cell.dimensions.width; column++) {
                    cellDisplayArr.push(' ');
                }
            }
            else {
                for (let column = 0; column < Cell.dimensions.width; column++) {
                    // left and right margin around piece
                    if (column !== Math.floor((Cell.dimensions.width - 1) / 2)) {
                        cellDisplayArr.push(' ');
                    }
                    else {
                        cellDisplayArr.push(Cell.colourPiece(this.piece));
                    }
                }
            }
            cellDisplayArr.push((row !== Cell.dimensions.height - 1) ? '\n' : '');
        }
        cellDisplayArr = cellDisplayArr.map(disp => (disp === '\n') ? disp : this.colourCell(disp));
        return cellDisplayArr.join(this.colourCell(''));
    }

    getBoardColour(): Colour {
        switch (this.state) {
            case CellState.Selected:
                return Colour.Blue;
            case CellState.Projected:
                return Colour.Green;
            case CellState.Available:
                return Colour.Magenta;
            default:
                return Colour.None;
        }
    }

    colourCell(display: string): string {
        return Colours.colourBG(display, this.getBoardColour());
    }

    static colourPiece(piece: ChessPiece): string {
        return Colours.colourText(piece.pieceType, piece.owner);
    }
}
