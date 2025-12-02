export function parseComponentName(name: string): { className: string; selector: string; folderName: string } {
    const kebabCaseName = name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    const className = kebabCaseName
        .split('-')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join('');
    const selector = `app-${kebabCaseName}`;
    
    return {
        className,
        selector,
        folderName: kebabCaseName
    };
}

export function validateComponentName(name: string): boolean {
    const namePattern = /^[a-zA-Z][a-zA-Z0-9-]*$/;
    return namePattern.test(name);
}