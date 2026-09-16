<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui';

const { label, hint, isSelected, status } = defineProps<{
    label: string;
    hint?: string;
    isSelected: boolean;
    status?: LetterStatus;
}>();

const emits = defineEmits<{
    toggleLetter: [letter: string];
}>();

const buttonColor = computed<ButtonProps['color']>(() => {
    if (isSelected) {
        return 'secondary';
    }

    if (status === 'correct') {
        return 'primary';
    }

    if (status === 'error') {
        return 'error';
    }

    return 'neutral';
});

function handleClick() {
    if (status === 'correct' || status === 'error') {
        return;
    }

    emits('toggleLetter', hint || label);
}
</script>

<template>
    <UButton
        variant="subtle"
        :color="buttonColor"
        size="4xl"
        :disabled="status === 'done'"
        class="relative aspect-square transition-all disabled:opacity-30"
        :class="{
            'animate-letter-pulse': status === 'correct',
            'animate-shake-x': status === 'error',
        }"
        block
        @click="handleClick"
    >
        <div>{{ label }}</div>
        <div v-if="hint" class="absolute top-1 right-1 text-sm">
            {{ hint }}
        </div>
    </UButton>
</template>
