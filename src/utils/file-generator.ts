import { promises as fs } from 'fs';
import path from 'path';

/**
 * Generates a file from a template and writes it to the specified output path.
 * 
 * @param templatePath - The path to the template file.
 * @param outputPath - The path where the generated file will be saved.
 * @param data - An object containing data to replace placeholders in the template.
 */
export async function generateFileFromTemplate(templatePath: string, outputPath: string, data: Record<string, any>): Promise<void> {
    try {
        const template = await fs.readFile(templatePath, 'utf-8');
        const content = replacePlaceholders(template, data);
        await fs.mkdir(path.dirname(outputPath), { recursive: true });
        await fs.writeFile(outputPath, content);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error(`Error generating file: ${errorMessage}`);
    }
}

/**
 * Replaces placeholders in the template with actual data.
 * 
 * @param template - The template string with placeholders.
 * @param data - An object containing data to replace placeholders.
 * @returns The template string with placeholders replaced by actual data.
 */
function replacePlaceholders(template: string, data: Record<string, any>): string {
    return Object.keys(data).reduce((result, key) => {
        const placeholder = new RegExp(`{{${key}}}`, 'g');
        return result.replace(placeholder, data[key]);
    }, template);
}