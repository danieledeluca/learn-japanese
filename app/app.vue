<script setup lang="ts">
useSeoMeta({
    titleTemplate: (titleChunk) => {
        return titleChunk ? `${titleChunk} | Learn Japanese` : 'Learn Japanese';
    },
    // eslint-disable-next-line style/max-len
    description: 'Learn hiragana and katakana for free with interactive matching games. Practice Japanese characters, track your progress, and master the alphabet fast.',
});
</script>

<template>
    <UApp>
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </UApp>
</template>
