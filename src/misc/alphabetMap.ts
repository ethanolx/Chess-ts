let Amap = new Map<string, number>();
let Nmap = new Map<number, string>();

for (let i = 0; i < 26; i++) {
    Amap.set(String.fromCharCode(i + 65), i);
}
for (let i = 0; i < 26; i++) {
    Nmap.set(i, String.fromCharCode(i + 65));
}

export const AlphabetToNumber = Amap;
export const NumberToAlphabet = Nmap;
