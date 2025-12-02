export function logInfo(message: string): void {
    console.log(`INFO: ${message}`);
}

export function logWarning(message: string): void {
    console.warn(`WARNING: ${message}`);
}

export function logError(message: string): void {
    console.error(`ERROR: ${message}`);
}

export function logSuccess(message: string): void {
    console.log(`SUCCESS: ${message}`);
}