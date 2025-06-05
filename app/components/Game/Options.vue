<script setup lang="ts">
const gameStore = useGameStore();
const { gameOptions, amountOptions } = storeToRefs(gameStore);
const { alphabetOptions, setGameOption, startGame } = gameStore;
</script>

<template>
    <form @submit.prevent="startGame()">
        <article>
            <fieldset>
                <legend>Choose the alphabet you want to play with</legend>
                <div class="alphabets">
                    <GameAlphabet
                        v-for="alphabet in alphabetOptions"
                        :key="alphabet.type"
                        :title="alphabet.title"
                        :description="alphabet.description"
                        :type="alphabet.type"
                        :icon="alphabet.icon"
                    />
                </div>
                <input
                    v-model="gameOptions.alphabet.value"
                    type="hidden"
                    :aria-invalid="gameOptions.alphabet.error ? true : undefined"
                />
                <small v-if="gameOptions.alphabet.error">{{ gameOptions.alphabet.error }}</small>
            </fieldset>
            <hr />
            <fieldset>
                <legend>Choose how many ideograms you want to play with</legend>
                <div role="group">
                    <button
                        v-for="amount in amountOptions"
                        :key="amount"
                        type="button"
                        :class="gameOptions.amount.value === amount ? 'contrast' : 'secondary'"
                        @click="setGameOption('amount', amount)"
                    >
                        <span>{{ amount ? amount.toString() : '...' }}</span>
                    </button>
                </div>
                <input
                    v-model="gameOptions.amount.value"
                    type="hidden"
                    :aria-invalid="gameOptions.amount.error ? true : undefined"
                />
                <small v-if="gameOptions.amount.error">{{ gameOptions.amount.error }}</small>
            </fieldset>
            <button type="submit">
                <span>Start the Game</span>
            </button>
        </article>
    </form>
</template>

<style scoped>
form {
    max-width: 768px;
    margin-inline: auto;
}

form > article {
    margin-bottom: 0;
}

fieldset:last-child {
    margin-bottom: 0;
}

legend {
    margin-bottom: 1.5rem;
    text-align: center;
}

hr + fieldset {
    margin-top: 2rem;
}

.alphabets {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin-bottom: 1rem;
}

[role='group'] button {
    --pico-form-element-spacing-horizontal: 1rem;
}

[type='submit'] {
    margin-bottom: 0;
}
</style>
