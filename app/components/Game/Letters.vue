<script setup lang="ts">
const { title, letters, letterType, showHint } = defineProps<{
    title: string;
    letters: string[];
    letterType: LetterType;
    showHint?: boolean;
}>();

const gameStore = useGameStore();
const { selectedAlphabet, selectedLetters } = storeToRefs(gameStore);

function getLetterLabel(letter: string) {
    const currentLetter = selectedAlphabet.value.find((selectedLetter) => selectedLetter[letterType] === letter);
    const letterLabel = currentLetter?.[letterType] || '';

    return showHint ? currentLetter?.label || letterLabel : letterLabel;
}
</script>

<template>
    <div>
        <div class="mb-4 truncate text-center text-2xl font-bold sm:mb-6 md:text-3xl lg:mb-8">
            {{ title }}
        </div>
        <div class="grid grid-cols-2 gap-4 sm:grid-cols-[repeat(auto-fill,minmax(70px,1fr))]">
            <GameLetter
                v-for="letter in letters"
                :key="letter"
                :label="getLetterLabel(letter)"
                :hint="showHint && getLetterLabel(letter) !== letter ? letter : undefined"
                :isSelected="selectedLetters[letterType] === letter"
                :status="gameStore.getLetterStatus(letterType, letter)"
                @toggleLetter="(value) => gameStore.toggleLetterSelection(letterType, value)"
            />
        </div>
    </div>
</template>
