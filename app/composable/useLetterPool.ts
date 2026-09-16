import { useLocalStorage } from '@vueuse/core';

import alphabets from '~/assets/alphabets.json';

function shuffle<T>(array: T[]) {
    const shuffledArray = [...array];

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [shuffledArray[i]!, shuffledArray[j]!] = [shuffledArray[j]!, shuffledArray[i]!];
    }

    return shuffledArray;
}

export function useLetterPool(gameOptions: Ref<GameOptions>) {
    const letterPool = useLocalStorage<LetterPool>('letter-pool', {
        ideograms: [],
        translations: [],
        totals: 0,
    });

    const selectedAlphabet = computed<Letter[]>(() => {
        return gameOptions.value.alphabet ? alphabets[gameOptions.value.alphabet] : [];
    });

    function generateLetterPool() {
        const letters = shuffle(selectedAlphabet.value).slice(0, gameOptions.value.amount);

        letterPool.value.ideograms = shuffle(letters.map((letter) => letter.ideogram));
        letterPool.value.translations = shuffle(letters.map((letter) => letter.translation));
        letterPool.value.totals = letters.length;
    }

    function resetLetterPool() {
        letterPool.value.ideograms = [];
        letterPool.value.translations = [];
        letterPool.value.totals = 0;
    }

    return {
        letterPool,
        selectedAlphabet,
        generateLetterPool,
        resetLetterPool,
    };
}
