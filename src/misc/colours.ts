import { Colour } from './colour';

export abstract class Colours {

    static colourText(str: string, colour: Colour): string {
        switch (colour) {
            case Colour.Black:
                return str.black;
            case Colour.Blue:
                return str.blue;
            case Colour.Cyan:
                return str.cyan;
            case Colour.Green:
                return str.green;
            case Colour.Grey:
                return str.grey;
            case Colour.Magenta:
                return str.magenta;
            default:
                return str;
        }
    }

    static colourBG(str: string, colour: Colour): string {
        switch (colour) {
            case Colour.Black:
                return str.bgBlack;
            case Colour.Blue:
                return str.bgBlue;
            case Colour.Cyan:
                return str.bgCyan;
            case Colour.Green:
                return str.bgGreen;
            case Colour.Grey:
                return str.bgGrey;
            case Colour.Magenta:
                return str.bgMagenta;
            default:
                return str;
        }
    }
}