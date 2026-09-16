<script setup lang="ts">
useSeoMeta({
    title: 'Game',
});

const gameStore = useGameStore();
const { gameStatus, letterPool } = storeToRefs(gameStore);
</script>

<template>
    <GameOptions v-if="gameStatus === 'idle'" />
    <template v-else>
        <div class="grid grid-cols-[1fr_auto_1fr] gap-4 *:min-w-0 sm:gap-6 lg:gap-8">
            <GameLetters title="Ideograms" :letters="letterPool.ideograms" letterType="ideogram" />
            <USeparator orientation="vertical" />
            <GameLetters
                title="Translations"
                :letters="letterPool.translations"
                letterType="translation"
                :showHint="true"
            />
        </div>
        <GameBar />
        <GameModal />
    </template>
</template>
