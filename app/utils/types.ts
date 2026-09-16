export type AlphabetValue = 'hiragana' | 'katakana';

export type AlphabetOption = {
    title: string;
    description: string;
    image: Component;
    buttonLabel: string;
    value: AlphabetValue;
};

export type GameStatus = 'idle' | 'playing' | 'finished';

export type GameTimer = {
    start: number;
    end: number;
};

export type GameOptions = {
    alphabet?: AlphabetValue;
    amount?: number;
};

export type GameScore = {
    time: string;
    precision: string;
    corrects: number;
    errors: number;
};

export type LetterType = 'ideogram' | 'translation';

export type LetterStatus = 'correct' | 'error' | 'done';

export type Letter = {
    ideogram: string;
    translation: string;
    label?: string;
};

export type LetterPool = {
    ideograms: string[];
    translations: string[];
    totals: number;
};

export type SelectedLetters = {
    ideogram?: string;
    translation?: string;
};
