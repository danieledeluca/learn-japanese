<script setup lang="ts">
const gameStore = useGameStore();
const { showGame } = storeToRefs(gameStore);
</script>

<template>
    <AppHeader />
    <div class="page-wrapper container">
        <GameOptions v-if="!showGame" />
        <Game v-else />
    </div>
    <AppFooter v-if="!showGame" />
    <GameBottomBar v-else />
</template>
