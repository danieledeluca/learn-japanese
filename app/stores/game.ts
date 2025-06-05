import alphabets from '@/assets/alphabets.json';
import Hiragana from '~/components/Game/Hiragana.vue';
import Katakana from '~/components/Game/Katakana.vue';

export const useGameStore = defineStore('game', () => {
    const showGame = useLocalStorage('show-game', false);

    const gameOptions = useLocalStorage<GameOptions>('game-options', {
        alphabet: {
            value: undefined,
            error: '',
        },
        amount: {
            value: undefined,
            error: '',
        },
    });

    const selectedAlphabet = computed<{ [key: string]: string }>(() => {
        const alphabet = gameOptions.value.alphabet.value;

        return alphabet ? alphabets[alphabet] : {};
    });

    const alphabetOptions: AlphabetOptions[] = [
        {
            title: 'Hiragana',
            description: 'Phonetic alphabet used for native Japanese words',
            type: 'hiragana',
            icon: markRaw(Hiragana),
        },
        {
            title: 'Katakana',
            description: 'Phonetic alphabet used for foreign words and onomatopoeias',
            type: 'katakana',
            icon: markRaw(Katakana),
        },
    ];

    const maxAmount = computed(() => Object.entries(selectedAlphabet.value).length);
    const amountOptions = computed(() => [15, 30, 50, maxAmount.value]);

    const gameLetters = useLocalStorage<GameLetters>('game-letters', {
        ideogram: [],
        translation: [],
        totals: 0,
    });
    const selectedLetters = ref<Record<LetterType, string>>({
        ideogram: '',
        translation: '',
    });
    const correctLetters = useLocalStorage<string[]>('correct-letter', []);
    const errorLetters = ref<string[]>([]);

    const correctsCount = computed(() => correctLetters.value.length / 2);
    const errorsCount = useLocalStorage('errors-count', 0);

    function clearGameOptionsError() {
        Object.values(gameOptions.value).forEach((option) => {
            option.error = '';
        });
    }

    function setGameOption(option: 'alphabet', value: AlphabetType | undefined): void;
    function setGameOption(option: 'amount', value: number | undefined): void;
    function setGameOption(option: GameOptionType, value: AlphabetType | number | undefined) {
        gameOptions.value[option].value = value;
    }

    function validateGameOptions() {
        Object.values(gameOptions.value).forEach((option) => {
            option.error = option.value ? '' : 'This field is required';
        });
    }

    function startGame() {
        validateGameOptions();

        const hasErrors = Object.values(gameOptions.value).some((option) => option.error);

        if (!hasErrors) {
            generateGameLetters();

            showGame.value = true;
        }
    }

    function generateGameLetters() {
        const shuffledAlphabet = shuffleArray(Object.entries(selectedAlphabet.value)).splice(
            0,
            gameOptions.value.amount.value || maxAmount.value,
        );

        gameLetters.value.ideogram = shuffleArray(shuffledAlphabet.map((letter) => letter[0]));
        gameLetters.value.translation = shuffleArray(shuffledAlphabet.map((letter) => letter[1]));
        gameLetters.value.totals = shuffledAlphabet.length;
    }

    function setSelectedLetters(type: LetterType, value: string) {
        selectedLetters.value[type] = value;
    }

    function clearErrorLetters(letter: string) {
        const index = errorLetters.value.findIndex((_letter) => _letter === letter);

        errorLetters.value.splice(index, 1);
    }

    function resetGame() {
        showGame.value = false;

        gameOptions.value.alphabet.value = undefined;
        gameOptions.value.amount.value = undefined;

        gameLetters.value.ideogram = [];
        gameLetters.value.translation = [];
        gameLetters.value.totals = 0;

        correctLetters.value = [];

        errorsCount.value = 0;
    }

    watch(
        () => selectedLetters,
        () => {
            const areBothSelected = Object.values(selectedLetters.value).every((letter) => letter);

            if (areBothSelected) {
                const ideogram = selectedLetters.value.ideogram;
                const translation = selectedLetters.value.translation;

                if (selectedAlphabet.value[ideogram] === translation) {
                    correctLetters.value.push(ideogram, translation);
                } else {
                    errorsCount.value++;

                    errorLetters.value.push(ideogram, translation);
                }

                setTimeout(() => {
                    selectedLetters.value.ideogram = '';
                    selectedLetters.value.translation = '';
                });
            }

            if (gameLetters.value.totals && gameLetters.value.totals === correctsCount.value) {
                const percentage = Math.round(
                    100 - (100 * errorsCount.value) / gameLetters.value.totals,
                );
                const alertText =
                    percentage <= 0
                        ? `You finished with a ${errorsCount.value} errors`
                        : `You finished with a ${percentage}% success rate`;

                modal('success', 'Congratulation!', alertText, 'Play again', resetGame);
            }
        },
        {
            deep: true,
            immediate: true,
        },
    );

    onMounted(() => {
        clearGameOptionsError();
    });

    return {
        showGame,
        gameOptions,
        alphabetOptions,
        amountOptions,
        gameLetters,
        selectedLetters,
        correctLetters,
        errorLetters,
        correctsCount,
        errorsCount,
        setGameOption,
        startGame,
        setSelectedLetters,
        clearErrorLetters,
        resetGame,
    };
});
