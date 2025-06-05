<script setup lang="ts">
const { letters, type, title } = defineProps<{
    letters: GameLetters;
    type: LetterType;
    title: string;
}>();

const gameStore = useGameStore();
const { selectedLetters, correctLetters, errorLetters } = storeToRefs(gameStore);
const { setSelectedLetters, clearErrorLetters } = gameStore;
</script>

<template>
    <div class="letters">
        <h3 class="title">{{ title }}</h3>
        <article
            v-for="letter in letters[type]"
            :key="letter"
            class="letter"
            :class="{
                'is-active': selectedLetters[type] === letter,
                'is-correct': correctLetters.includes(letter),
                'is-incorrect': errorLetters.includes(letter),
            }"
            @click="setSelectedLetters(type, letter)"
            @animationend="clearErrorLetters(letter)"
        >
            {{ letter }}
        </article>
    </div>
</template>

<style scoped>
.letters {
    --grid-columns: 2;

    display: grid;
    grid-template-columns: repeat(var(--grid-columns), 1fr);
    gap: 1rem;
}

.title {
    grid-column: 1 / -1;
    margin-bottom: 1.5rem;
    text-align: center;
}

.letter {
    --color: var(--pico-card-color);
    --background-color: var(--pico-card-background-color);
    --border-color: var(--pico-muted-border-color);
    --opacity: 0.8;

    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 0;
    width: 100%;
    height: 100%;
    aspect-ratio: 1;
    background-color: var(--background-color);
    color: var(--color);
    border: 0.25rem solid var(--border-color);
    border-radius: 100%;
    font-size: 2rem;
    line-height: 1;
    user-select: none;
    opacity: var(--opacity);
    cursor: pointer;
    transition: all 0.3s ease-in-out;
}

.letter:is(:hover, .is-active) {
    --background-color: var(--pico-card-sectioning-background-color);
    --opacity: 1;
}

.letter.is-active {
    --border-color: var(--pico-primary-border);

    scale: 1.1;
}

.letter:is(.is-correct, .is-incorrect) {
    --color: var(--pico-contrast-inverse);
    --border-color: color-mix(in srgb, var(--background-color) 50%, var(--pico-primary-inverse));
    --opacity: 0.5;

    pointer-events: none;
}

.letter.is-correct {
    --background-color: var(--pico-ins-color);
}

.letter.is-incorrect {
    --background-color: var(--pico-del-color);

    animation: shakeX 1s ease-in-out both;
}

@keyframes shakeX {
    0%,
    to {
        transform: translateZ(0);
    }

    10%,
    30%,
    50%,
    70%,
    90% {
        transform: translate3d(-10px, 0, 0);
    }

    20%,
    40%,
    60%,
    80% {
        transform: translate3d(10px, 0, 0);
    }
}

@media (min-width: 768px) {
    .letters {
        --grid-columns: 3;
    }
}

@media (min-width: 1024px) {
    .letters {
        --grid-columns: 4;
    }
}

@media (min-width: 1280px) {
    .letters {
        grid-template-columns: repeat(auto-fit, minmax(122px, 1fr));
    }
}
</style>
