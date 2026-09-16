import { useLocalStorage } from '@vueuse/core';

import { useGameTimer } from './useGameTimer';

function getLetterKey(type: LetterType, value: string) {
    return `${type}:${value}`;
}

export function useLetterMatching(gameScore: Ref<GameScore>, selectedAlphabet: Ref<Letter[]>) {
    const { trackTimeout, clearPendingTimeouts } = useGameTimer();

    const selectedLetters = reactive<SelectedLetters>({
        ideogram: undefined,
        translation: undefined,
    });

    const letterStatuses = useLocalStorage('letter-statuses', new Map<string, LetterStatus>());

    function getLetterStatus(type: LetterType, value: string): LetterStatus | undefined {
        return letterStatuses.value.get(getLetterKey(type, value));
    }

    function toggleLetterSelection(type: LetterType, value: string) {
        selectedLetters[type] = selectedLetters[type] === value ? undefined : value;
    }

    function resolveSelection(ideogram: string, translation: string, isMatch: boolean) {
        if (isMatch) {
            gameScore.value.corrects++;
        } else {
            gameScore.value.errors++;
        }

        const ideogramKey = getLetterKey('ideogram', ideogram);
        const translationKey = getLetterKey('translation', translation);
        const status: LetterStatus = isMatch ? 'correct' : 'error';

        letterStatuses.value.set(ideogramKey, status);
        letterStatuses.value.set(translationKey, status);

        trackTimeout(() => {
            if (isMatch) {
                letterStatuses.value.set(ideogramKey, 'done');
                letterStatuses.value.set(translationKey, 'done');
            } else {
                letterStatuses.value.delete(ideogramKey);
                letterStatuses.value.delete(translationKey);
            }
        }, 1000);
    }

    function resetMatching() {
        clearPendingTimeouts();

        letterStatuses.value.clear();

        selectedLetters.ideogram = undefined;
        selectedLetters.translation = undefined;

        gameScore.value.corrects = 0;
        gameScore.value.errors = 0;
    }

    watch(selectedLetters, async () => {
        if (!Object.values(selectedLetters).every(Boolean)) {
            return;
        }

        const { ideogram, translation } = selectedLetters;

        if (!ideogram || !translation) {
            return;
        }

        const letter = selectedAlphabet.value.find((l) => l.ideogram === ideogram && l.translation === translation);

        resolveSelection(ideogram, translation, !!letter);

        await nextTick();

        selectedLetters.ideogram = undefined;
        selectedLetters.translation = undefined;
    }, {
        deep: true,
    });

    onMounted(() => {
        letterStatuses.value.entries().forEach(([LetterKey, status]) => {
            if (status === 'correct') {
                letterStatuses.value.set(LetterKey, 'done');
            }
        });
    });

    return {
        selectedLetters,
        getLetterStatus,
        toggleLetterSelection,
        resetMatching,
    };
}
