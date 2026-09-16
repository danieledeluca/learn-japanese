<script setup lang="ts">
import type { NuxtError } from '#app';

const { error } = defineProps<{
    error: NuxtError;
}>();

useSeoMeta({
    title: 'Page not found',
    description: 'We are sorry but this page could not be found.',
});
</script>

<template>
    <UApp>
        <UError :error="error" />
    </UApp>
</template>
