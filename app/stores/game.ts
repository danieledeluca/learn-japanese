import { useLocalStorage } from '@vueuse/core';

import { useLetterMatching } from '~/composable/useLetterMatching';
import { useLetterPool } from '~/composable/useLetterPool';

export const useGameStore = defineStore('game', () => {
    const toast = useToast();

    const gameStatus = useLocalStorage<GameStatus>('game-status', 'idle');

    const gameTimer = useLocalStorage<GameTimer>('game-timer', {
        start: 0,
        end: 0,
    });
    const gameOptions = useLocalStorage<GameOptions>('game-options', {
        alphabet: undefined,
        amount: undefined,
    });
    const gameScore = useLocalStorage<GameScore>('game-score', {
        time: '',
        precision: '',
        corrects: 0,
        errors: 0,
    });

    const showModal = ref(gameStatus.value === 'finished');

    const { letterPool, selectedAlphabet, generateLetterPool, resetLetterPool } = useLetterPool(gameOptions);
    const {
        selectedLetters,
        getLetterStatus,
        toggleLetterSelection,
        resetMatching,
    } = useLetterMatching(gameScore, selectedAlphabet);

    watch(() => gameScore.value.corrects, (corrects) => {
        if (corrects > 0 && corrects === letterPool.value.totals) {
            finishGame();
        }
    });

    function resetGameTimer() {
        gameTimer.value.start = 0;
        gameTimer.value.end = 0;
    }

    function resetGameScore() {
        gameScore.value.time = '';
        gameScore.value.precision = '';
        gameScore.value.corrects = 0;
        gameScore.value.errors = 0;
    }

    function startGame() {
        if (!gameOptions.value.alphabet) {
            toast.add({
                id: 'alphabet',
                color: 'error',
                title: `Please select an alphabet`,
            });

            return;
        }

        if (!gameOptions.value.amount) {
            toast.add({
                id: 'amount',
                color: 'error',
                title: `Please select an amount`,
            });

            return;
        }

        // const missingOptions = validateGameOptions(gameOptions.value);

        // if (missingOptions.length > 0) {
        //     missingOptions.forEach((key) => {
        //         toast.add({
        //             id: key,
        //             color: 'error',
        //             title: `Please select an ${key}`,
        //         });
        //     });

        //     return;
        // }

        generateLetterPool();

        gameStatus.value = 'playing';

        gameTimer.value.start = Date.now();
    }

    function finishGame() {
        gameStatus.value = 'finished';

        gameTimer.value.end = Date.now();

        gameScore.value.time = formatDuration(gameTimer.value.end - gameTimer.value.start);
        // eslint-disable-next-line style/max-len
        gameScore.value.precision = Math.max(0, (100 * (letterPool.value.totals - gameScore.value.errors) / letterPool.value.totals)).toFixed(2);

        showModal.value = true;
    }

    function resetGame() {
        gameStatus.value = 'idle';

        gameOptions.value.alphabet = undefined;
        gameOptions.value.amount = undefined;

        resetGameTimer();
        resetGameScore();
        resetLetterPool();
        resetMatching();
    }

    function replayGame() {
        resetGameTimer();
        resetGameScore();
        resetLetterPool();
        resetMatching();

        startGame();
    }

    return {
        gameStatus,
        gameOptions,
        gameScore,
        letterPool,
        selectedAlphabet,
        selectedLetters,
        showModal,
        startGame,
        resetGame,
        replayGame,
        toggleLetterSelection,
        getLetterStatus,
    };
});
