<script setup lang="ts">
const gameStore = useGameStore();
const { gameLetters, selectedLetters } = storeToRefs(gameStore);
</script>

<template>
    <div class="game">
        <GameLetters :letters="gameLetters" type="ideogram" title="Ideograms" />
        <GameLetters :letters="gameLetters" type="translation" title="Translations" />
    </div>
    <input v-model="selectedLetters.ideogram" type="hidden" />
    <input v-model="selectedLetters.translation" type="hidden" />
</template>

<style scoped>
.game {
    position: relative;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2.5rem;
}

.game::after {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    display: inline-block;
    height: 100%;
    width: 2px;
    background-color: var(--pico-muted-color);
    translate: -50%;
}
</style>
