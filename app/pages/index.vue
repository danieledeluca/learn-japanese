<script setup lang="ts">
import type { ButtonProps, PageFeatureProps } from '@nuxt/ui';

const gameStore = useGameStore();

const links = computed<ButtonProps[]>(() => {
    if (gameStore.gameStatus !== 'idle') {
        return [
            {
                label: 'Continue game',
                to: '/game',
                icon: 'i-lucide-fast-forward',
            },
            {
                variant: 'subtle',
                color: 'neutral',
                label: 'Start a new game instead',
                to: '/game',
                icon: 'i-lucide-refresh-ccw',
                onClick: gameStore.resetGame,
            },
        ];
    }

    return [
        {
            label: 'Start game',
            to: '/game',
            icon: 'i-lucide-play',
        },
    ];
});

const features: PageFeatureProps[] = [
    {
        title: 'Two alphabets',
        description: 'Practice hiragana and katakana separately, at your own pace.',
        icon: 'i-lucide-languages',
    },
    {
        title: 'Instant feedback',
        description: 'Know right away if a match is correct, no waiting.',
        icon: 'i-lucide-zap',
    },
    {
        title: 'Pick your round size',
        description: 'Choose how many characters to practice, from a quick 15 to the full set.',
        icon: 'i-lucide-list-ordered',
    },
    {
        title: 'Pick up where you left off',
        description: 'Your progress is saved locally, so you can continue anytime.',
        icon: 'i-lucide-history',
    },
];
</script>

<template>
    <UPageHero
        title="Learn Japanese"
        description="Learn hiragana and katakana with free, interactive matching games."
        :links
    />
    <USeparator icon="i-lucide-gamepad-2" />
    <UPageSection
        headline="How it works"
        title="Learn by matching, not memorizing"
        description="A simple, focused way to build muscle memory for hiragana and katakana."
        icon="i-lucide-graduation-cap"
        orientation="horizontal"
        :features
    >
        <img src="/online-learning.svg" alt="Online learning">
    </UPageSection>
</template>
