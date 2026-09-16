<template>
    <UHeader title="Learn Japanese" to="/" mode="drawer">
        <template #right>
            <UColorModeButton />

            <UTooltip text="Open on GitHub">
                <UButton
                    color="neutral"
                    variant="ghost"
                    to="https://github.com/danieledeluca/learn-japanese"
                    target="_blank"
                    icon="i-simple-icons-github"
                />
            </UTooltip>
        </template>
    </UHeader>
</template>
