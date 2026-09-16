export function useGameTimer() {
    const pendingTimeouts = ref<Set<ReturnType<typeof setTimeout>>>(new Set());

    function trackTimeout(callback: () => void, delay: number) {
        const id = setTimeout(() => {
            pendingTimeouts.value.delete(id);
            callback();
        }, delay);

        pendingTimeouts.value.add(id);
    }

    function clearPendingTimeouts() {
        pendingTimeouts.value.forEach((id) => clearTimeout(id));
        pendingTimeouts.value.clear();
    }

    return {
        trackTimeout,
        clearPendingTimeouts,
    };
}
