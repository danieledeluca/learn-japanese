<script setup lang="ts">
const gameStore = useGameStore();
const { gameScore, showModal } = storeToRefs(gameStore);

const action = ref<'reset' | 'replay'>();

function handleClose() {
    if (action.value === 'replay') {
        gameStore.replayGame();
        return;
    }

    gameStore.resetGame();
}

function handleReplay() {
    action.value = 'replay';
    showModal.value = false;
}

function handleReset() {
    action.value = 'reset';
    showModal.value = false;
}
</script>

<template>
    <UModal
        v-model:open="showModal"
        title="Congratulation!"
        :ui="{
            content: 'max-w-xl',
            footer: 'justify-end',
        }"
        @after:leave="handleClose"
    >
        <template #body>
            <div class="grid gap-4 sm:grid-cols-3 sm:gap-6">
                <UCard variant="soft">
                    <div class="relative">
                        <div class="font-semibold text-muted uppercase">
                            Errors
                        </div>
                        <div class="text-2xl font-bold">
                            {{ gameScore.errors }}
                        </div>
                        <UButton
                            variant="ghost"
                            color="error"
                            size="xs"
                            icon="i-lucide-x"
                            class="absolute top-0 right-0"
                            tabindex="-1"
                        />
                    </div>
                </UCard>
                <UCard variant="soft">
                    <div class="relative">
                        <div class="font-semibold text-muted uppercase">
                            Time
                        </div>
                        <div class="text-2xl font-bold">
                            {{ gameScore.time }}
                        </div>
                        <UButton
                            variant="ghost"
                            color="secondary"
                            size="xs"
                            icon="i-lucide-timer"
                            class="absolute top-0 right-0"
                            tabindex="-1"
                        />
                    </div>
                </UCard>
                <UCard variant="soft">
                    <div class="relative">
                        <div class="font-semibold text-muted uppercase">
                            Precision
                        </div>
                        <div class="text-2xl font-bold">
                            {{ gameScore.precision }}%
                        </div>
                        <UButton
                            variant="ghost"
                            size="xs"
                            icon="i-lucide-target"
                            class="absolute top-0 right-0"
                            tabindex="-1"
                        />
                    </div>
                </UCard>
            </div>
        </template>
        <template #footer>
            <UButton
                variant="outline"
                color="neutral"
                label="Play again"
                icon="i-lucide-repeat"
                @click="handleReplay"
            />
            <UButton label="New game" icon="i-lucide-plus" @click="handleReset" />
        </template>
    </UModal>
</template>
