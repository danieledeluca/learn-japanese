import Hiragana from '~/components/Game/Hiragana.vue';
import Katakana from '~/components/Game/Katakana.vue';

export const ALPHABET_OPTIONS: AlphabetOption[] = [
    {
        title: 'Hiragana',
        description: 'Phonetic alphabet used for native Japanese words',
        image: h(Hiragana),
        buttonLabel: 'Play with Hiragana',
        value: 'hiragana',
    },
    {
        title: 'Katakana',
        description: 'Phonetic alphabet used for foreign words and onomatopoeias',
        image: h(Katakana),
        buttonLabel: 'Play with Katakana',
        value: 'katakana',
    },
];

export const AMOUNT_OPTIONS: number[] = [15, 30, 50, 71];
