<script setup lang="ts">
const gameStore = useGameStore();
const { letterPool, gameScore } = storeToRefs(gameStore);
</script>

<template>
    <div class="pointer-events-none fixed inset-4 grid items-end sm:inset-6 lg:inset-8">
        <UCard variant="subtle" class="pointer-events-auto backdrop-blur-sm">
            <div class="grid grid-cols-[1fr_auto_1fr] items-center gap-4 sm:gap-6">
                <div class="flex items-center gap-2">
                    <UButton
                        variant="ghost"
                        color="error"
                        icon="i-lucide-x"
                        tabindex="-1"
                    />
                    <span class="font-bold">{{ gameScore.errors }}</span>
                </div>
                <div class="text-center">
                    <UButton
                        color="neutral"
                        label="New game"
                        icon="i-lucide-rotate-ccw"
                        @click="gameStore.resetGame"
                    />
                </div>
                <div class="flex items-center justify-end gap-2">
                    <span class="font-bold">{{ gameScore.corrects }}/{{ letterPool.totals }}</span>
                    <UButton
                        variant="ghost"
                        color="primary"
                        icon="i-lucide-languages"
                        tabindex="-1"
                    />
                </div>
            </div>
        </UCard>
    </div>
</template>
