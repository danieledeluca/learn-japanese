<script setup lang="ts">
const gameStore = useGameStore();
const { gameOptions } = storeToRefs(gameStore);
</script>

<template>
    <UCard variant="subtle" class="mx-auto max-w-2xl">
        <div class="grid gap-6 sm:gap-8">
            <div class="grid gap-4 sm:gap-6">
                <div class="text-center text-xl text-muted">
                    Choose the alphabet you want to play with
                </div>
                <div class="grid grid-cols-2 gap-4 text-center sm:gap-6">
                    <div v-for="alphabet in ALPHABET_OPTIONS" :key="alphabet.value" class="flex flex-col gap-4 sm:gap-6">
                        <h2 class="text-3xl font-bold">
                            {{ alphabet.title }}
                        </h2>
                        <div class="text-muted">
                            {{ alphabet.description }}
                        </div>
                        <div
                            class="mt-auto aspect-square overflow-hidden rounded-lg border border-muted bg-muted transition-colors"
                            :class="{
                                'text-muted': gameOptions.alphabet !== alphabet.value,
                            }"
                            @click="gameOptions.alphabet = alphabet.value"
                        >
                            <component :is="alphabet.image" />
                        </div>
                        <UButton
                            :variant="gameOptions.alphabet === alphabet.value ? 'solid' : 'subtle'"
                            color="neutral"
                            :label="alphabet.buttonLabel"
                            block
                            @click="gameOptions.alphabet = alphabet.value"
                        />
                    </div>
                </div>
            </div>
            <USeparator icon="i-lucide-gamepad-2" />
            <div class="grid gap-4 sm:gap-6">
                <div class="text-center text-xl text-muted">
                    Choose how many ideograms you want to play with
                </div>
                <UFieldGroup class="w-full">
                    <UButton
                        v-for="amount in AMOUNT_OPTIONS"
                        :key="amount"
                        :variant="gameOptions.amount === amount ? 'solid' : 'subtle'"
                        color="neutral"
                        :label="amount.toString()"
                        block
                        @click="gameOptions.amount = amount"
                    />
                </UFieldGroup>
            </div>
            <UButton
                size="xl"
                label="Start the game"
                block
                @click="gameStore.startGame"
            />
        </div>
    </UCard>
</template>
