export function validateGameOptions(options: GameOptions): (keyof GameOptions)[] {
    return (Object.keys(options) as (keyof GameOptions)[]).filter((key) => !options[key]);
}
