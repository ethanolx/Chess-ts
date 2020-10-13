import { Colour } from '../misc/colours/colour';
import { CellState } from './cellState';
import { ChessPiece } from './../chess_pieces/chessPiece';
import "colors";
import { Colours } from '../misc/colours/colours';

export class Cell {

    state: CellState = CellState.Normal;

    constructor(
        public piece: ChessPiece,
        public dimensions: { height: number, width: number }
    ) { }

    getDisplay(): string {
        let cellDisplayArr = [];
        for (let row = 0; row < this.dimensions.height; row++) {
            //  top and bottom margin around piece
            if (row !== Math.floor((this.dimensions.height - 1) / 2)) {
                for (let column = 0; column < this.dimensions.width; column++) {
                    cellDisplayArr.push(' ');
                }
            }
            else {
                for (let column = 0; column < this.dimensions.width; column++) {
                    // left and right margin around piece
                    if (column !== Math.floor((this.dimensions.width - 1) / 2)) {
                        cellDisplayArr.push(' ');
                    }
                    else {
                        cellDisplayArr.push(Cell.colourPiece(this.piece));
                    }
                }
            }
            cellDisplayArr.push((row !== this.dimensions.height - 1) ? '\n' : '');
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
            case CellState.Checked:
                return Colour.Red;
            case CellState.Checking:
                return Colour.Yellow;
            case CellState.Normal:
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
