<script setup lang="ts">
const { letters, type, title } = defineProps<{
    letters: GameLetters;
    type: LetterType;
    title: string;
}>();

const gameStore = useGameStore();
const { selectedLetters, doneLetters, correctLetters, errorLetters } = storeToRefs(gameStore);
const { setSelectedLetters } = gameStore;
</script>

<template>
    <div class="letters">
        <h3 class="title">{{ title }}</h3>
        <template v-for="[letter, solution] in letters[type]" :key="letter">
            <article
                v-if="letter && solution"
                class="letter"
                :class="{
                    'is-active': selectedLetters[type] === letter,
                    'is-done': doneLetters.includes(letter),
                    'is-correct': correctLetters.includes(solution),
                    'is-incorrect': errorLetters.includes(letter),
                }"
                @click="setSelectedLetters(type, letter)"
            >
                {{ letter }}
            </article>
        </template>
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
    --color: var(--pico-primary-inverse);
    --background-color: var(--pico-card-background-color);
    --border-color: var(--pico-muted-border-color);

    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 0;
    padding: 0;
    width: 100%;
    aspect-ratio: 4 / 3;
    background-color: var(--background-color);
    color: var(--color, var(--pico-color));
    border: 0.125rem solid var(--border-color);
    font-size: 1.5rem;
    line-height: 1;
    user-select: none;
    cursor: pointer;
    opacity: var(--opacity, 1);
    transition: all 0.3s ease-in-out;
}

.letter:hover {
    --background-color: var(--pico-card-sectioning-background-color);
}

.letter:is(.is-active, .is-correct, .is-incorrect) {
    --background-color: color-mix(in srgb, var(--color) 10%, transparent 100%);
}

.letter:is(.is-done, .is-correct, .is-incorrect) {
    pointer-events: none;
}

.letter.is-active {
    --border-color: var(--pico-primary-border);
    --color: var(--pico-primary);
}

.letter.is-done {
    --opacity: 0.3;
}

.letter:is(.is-correct, .is-incorrect) {
    --border-color: var(--color);
}

.letter.is-correct {
    --color: var(--pico-ins-color);

    animation: pulse 1s ease-in-out both;
}

.letter.is-incorrect {
    --color: var(--pico-del-color);

    animation: shakeX 1s ease-in-out both;
}

@keyframes pulse {
    0% {
        -webkit-transform: scaleX(1);
        transform: scaleX(1);
    }

    50% {
        -webkit-transform: scale3d(1.05, 1.05, 1.05);
        transform: scale3d(1.05, 1.05, 1.05);
    }

    to {
        -webkit-transform: scaleX(1);
        transform: scaleX(1);
    }
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
