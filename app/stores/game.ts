import alphabets from '@/assets/alphabets.json';
import Hiragana from '~/components/Game/Hiragana.vue';
import Katakana from '~/components/Game/Katakana.vue';

export const useGameStore = defineStore('game', () => {
    const showGame = useLocalStorage('show-game', false);
    const timeStart = useLocalStorage('time-start', 0);

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

    const selectedAlphabet = computed<Letter[]>(() => {
        const alphabet = gameOptions.value.alphabet.value;

        return alphabet ? alphabets[alphabet] : [];
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
    const doneLetters = useLocalStorage<string[]>('done-letters', []);
    const correctLetters = ref<string[]>([]);
    const errorLetters = ref<string[]>([]);

    const correctsCount = useLocalStorage('corrects-count', 0);
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
            timeStart.value = new Date().getTime();
        }
    }

    function generateGameLetters() {
        const shuffledLetters = shuffleArray(selectedAlphabet.value).splice(
            0,
            gameOptions.value.amount.value || maxAmount.value,
        );

        gameLetters.value.ideogram = shuffleArray(shuffledLetters);
        gameLetters.value.translation = shuffleArray(shuffledLetters);
        gameLetters.value.totals = shuffledLetters.length;
    }

    function setSelectedLetters(type: LetterType, value: string) {
        selectedLetters.value[type] = value;
    }

    function clearCorrectLetters(letter: string) {
        const index = correctLetters.value.findIndex((_letter) => _letter === letter);

        correctLetters.value.splice(index, 1);
    }

    function clearErrorLetters(letter: string) {
        const index = errorLetters.value.findIndex((_letter) => _letter === letter);

        errorLetters.value.splice(index, 1);
    }

    function playAgain() {
        generateGameLetters();

        timeStart.value = new Date().getTime();

        doneLetters.value = [];

        correctsCount.value = 0;
        errorsCount.value = 0;
    }

    function newGame() {
        showGame.value = false;

        timeStart.value = 0;

        gameOptions.value.alphabet.value = undefined;
        gameOptions.value.amount.value = undefined;

        gameLetters.value.ideogram = [];
        gameLetters.value.translation = [];
        gameLetters.value.totals = 0;

        doneLetters.value = [];

        correctsCount.value = 0;
        errorsCount.value = 0;
    }

    watch(
        () => selectedLetters,
        () => {
            const areBothSelected = Object.values(selectedLetters.value).every((letter) => letter);

            if (areBothSelected) {
                const ideogram = selectedLetters.value.ideogram;
                const translation = selectedLetters.value.translation;

                const letter = selectedAlphabet.value.find(
                    (letter) => letter.ideogram === ideogram,
                );

                if (letter && letter.translation === translation) {
                    correctsCount.value++;

                    correctLetters.value.push(`${ideogram}${translation}`);

                    setTimeout(() => {
                        clearCorrectLetters(`${ideogram}${translation}`);

                        doneLetters.value.push(ideogram, translation);
                    }, 1000);
                } else {
                    errorsCount.value++;

                    errorLetters.value.push(ideogram, translation);

                    setTimeout(() => {
                        clearErrorLetters(ideogram);
                        clearErrorLetters(translation);
                    }, 1000);
                }

                setTimeout(() => {
                    selectedLetters.value.ideogram = '';
                    selectedLetters.value.translation = '';
                });
            }

            if (gameLetters.value.totals && gameLetters.value.totals === correctsCount.value) {
                const timeEnd = new Date().getTime();
                const time = new Intl.DateTimeFormat(window.navigator.language, {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false,
                    hourCycle: 'h24',
                    timeZone: 'UTC',
                }).format(timeEnd - timeStart.value);

                const percentage = Math.round(
                    100 - (100 * errorsCount.value) / gameLetters.value.totals,
                );

                let alertText = `
                    <div class="grid">
                        <div>
                            <div><small>❌ Errors</small></div>
                            <div><strong>${errorsCount.value}</strong></div>
                        </div>
                        <div>
                            <div><small>⏱️ Time</small></div>
                            <div><strong>${time}</strong></div>
                        </div>
                `;

                if (percentage > 0) {
                    alertText += `
                        <div>
                            <div><small>🎯 Success rate</small></div>
                            <div><strong>${percentage}%</strong></div>
                        </div>`;
                }

                alertText += `</div>`;

                modal(
                    'success',
                    'Congratulation!',
                    alertText,
                    'Play again',
                    'New game',
                    playAgain,
                    newGame,
                );
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
        doneLetters,
        correctLetters,
        errorLetters,
        correctsCount,
        errorsCount,
        setGameOption,
        startGame,
        setSelectedLetters,
        clearErrorLetters,
        newGame,
    };
});
