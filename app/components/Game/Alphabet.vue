<script setup lang="ts">
const { title, description, type } = defineProps<{
    title: string;
    description: string;
    type: AlphabetType;
    icon: Component;
}>();

const gameStore = useGameStore();
const { gameOptions } = storeToRefs(gameStore);
const { setGameOption } = gameStore;
</script>

<template>
    <div class="alphabet" :class="gameOptions.alphabet.value === type ? 'is-active' : ''">
        <h3 class="title">{{ title }}</h3>
        <small class="description">{{ description }}</small>
        <article @click="setGameOption('alphabet', type)">
            <component :is="icon"></component>
        </article>
        <button
            type="button"
            class="button-small"
            :class="gameOptions.alphabet.value === type ? 'contrast' : 'secondary'"
            @click="setGameOption('alphabet', type)"
        >
            <span>Play with {{ title }}</span>
        </button>
    </div>
</template>

<style scoped>
.alphabet {
    --article-border-color: var(--pico-form-element-border-color);
    --svg-opacity: 0.7;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    text-align: center;
}

.alphabet:is(:hover, .is-active) {
    --svg-opacity: 1;
}

.alphabet.is-active {
    --article-border-color: var(--pico-muted-color);
    --svg-scale: 1.1;
}

.title {
    margin-bottom: 0;
}

.description {
    display: block;
    color: var(--pico-muted-color);
}

article {
    margin-top: auto;
    margin-bottom: 0;
    padding: 0;
    width: 100%;
    background-color: var(--pico-card-sectioning-background-color);
    border: 1px solid var(--article-border-color);
    overflow: hidden;
    transition: all 0.1s ease-in-out;
    cursor: pointer;
}

svg {
    width: 100%;
    opacity: var(--svg-opacity);
    scale: var(--svg-scale);
    transition:
        all 0.3s ease-in-out,
        scale 0.1s ease-in-out;
}
</style>
