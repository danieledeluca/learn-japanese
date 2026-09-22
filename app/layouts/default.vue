<script setup lang="ts">
const route = useRoute();
</script>

<template>
    <AppHeader />
    <UMain class="py-4 sm:py-6 lg:py-8" :class="route.name === 'game' ? 'pb-16 sm:pb-20!' : ''">
        <UContainer>
            <slot />
        </UContainer>
    </UMain>
    <AppFooter />
</template>
