<template>
    <header>
        <nav class="container">
            <ul></ul>
            <ul>
                <li>Learn Japanese</li>
            </ul>
            <ul></ul>
        </nav>
    </header>
</template>

<style scoped>
header {
    position: sticky;
    top: 0;
    background-color: color-mix(in srgb, var(--pico-background-color) 50%, transparent);
    border-bottom: 1px solid var(--pico-muted-border-color);
    backdrop-filter: blur(20px);
    z-index: 2;
}
</style>
