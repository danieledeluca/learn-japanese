import type alphabets from '@/assets/alphabets.json';

export type AlphabetType = keyof typeof alphabets;

export type GameOptionType = 'alphabet' | 'amount';

export type GameOption<T> = {
    value: T | undefined;
    error: string;
};

export type GameOptions = {
    alphabet: GameOption<AlphabetType>;
    amount: GameOption<number>;
};

export type AlphabetOptions = {
    title: string;
    description: string;
    type: AlphabetType;
    icon: Component;
};

export type LetterType = 'ideogram' | 'translation';

export type GameLetters = Record<LetterType, string[][]> & {
    totals: number;
};
