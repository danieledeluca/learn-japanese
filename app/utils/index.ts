export function shuffleArray<T>(array: T[]) {
    const shuffledArray = [...array];

    for (let i = shuffledArray.length - 1; i >= 1; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [shuffledArray[i]!, shuffledArray[j]!] = [shuffledArray[j]!, shuffledArray[i]!];
    }

    return shuffledArray;
}
