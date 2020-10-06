import 'colors';

export abstract class Utilities {
    static compareArrays(arr1: Array<any>, arr2: Array<any>): boolean {
        if (arr1.length !== arr2.length) {
            return false;
        }
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) {
                return false;
            }
        }
        return true;
    }

    static containsSubArray(array: Array<Array<any>>, subArray: Array<any>): boolean {
        for (let el of array) {
            if (el.length === subArray.length) {
                let same = true;
                for (let i = 0; i < el.length; i++) {
                    if (el[i] !== subArray[i]) {
                        same = false;
                    }
                }
                if (same) {
                    return true;
                }
            }
        }
        return false;
    }

    static appendMultilineStr(multiStrings: string[]): string {
        let combinedStr = "";
        do {
            multiStrings.forEach((str, index) => {
                combinedStr += str.includes('\n') ? str.substring(0, str.indexOf('\n')) : str;
                multiStrings[index] = str.includes('\n') ? str.substring(str.indexOf('\n') + 1) : '';
            });
            combinedStr += '\n';
        }
        while (multiStrings.filter(str => str.length > 0).length > 0);
        return combinedStr;
    }

    static declare2DArr(rows: number, cols: number): Array<Array<any>> {
        let arr2D = new Array<Array<any>>(rows);
        for (let i = 0; i < arr2D.length; i++) {
            arr2D[i] = new Array<any>(cols);
        }
        return arr2D;
    }

    static getWhiteSpace(spaces: number, column: boolean = false): string {
        return Utilities.repeatString(' ', spaces, column ? "vertical" : "horizontal");
    }

    static repeatString(str: string, times: number, direction: "horizontal" | "vertical"): string {
        let repeatedStr = "";
        for (let i = 0; i < times; i++) {
            repeatedStr += direction === "vertical" ? str + '\n' : str;
        }
        if (direction === "vertical") {
            repeatedStr = repeatedStr.replace(/\n$/, '');
        }
        return repeatedStr;
    }

    static replaceCharInStr(str: string, char: string, index: number): string {
        return str.substr(0, index) + char + str.substring(index + 1);
    }
}