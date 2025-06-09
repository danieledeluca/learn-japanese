<script setup lang="ts">
const gameStore = useGameStore();
const { gameLetters, correctsCount, errorsCount } = storeToRefs(gameStore);
</script>

<template>
    <div class="bottom-bar">
        <nav class="container">
            <ul>
                <li>❌ Errors: {{ errorsCount }}</li>
            </ul>
            <ul>
                <li>
                    <button type="button" class="button-small contrast" @click="gameStore.newGame">
                        <span>Reset</span>
                    </button>
                </li>
            </ul>
            <ul>
                <li>🔠 Letters: {{ correctsCount }} / {{ gameLetters.totals }}</li>
            </ul>
        </nav>
    </div>
</template>

<style scoped>
.bottom-bar {
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: color-mix(in srgb, var(--pico-background-color) 50%, transparent);
    border-top: 1px solid var(--pico-muted-border-color);
    backdrop-filter: blur(20px);
    z-index: 2;
}

ul:has(button) {
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
}

li {
    display: flex;
    align-items: center;
    gap: 0.25rem;
}

li::before {
    content: none;
}

button {
    margin-top: 0;
    line-height: 1;
}
</style>
