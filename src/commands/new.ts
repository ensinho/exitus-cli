import { Command } from 'commander';
import { generateFileFromTemplate } from '../utils/file-generator';
import { parseComponentName } from '../utils/name-parser';
import { logInfo, logSuccess, logError } from '../utils/logger';
import * as path from 'path';
import { promises as fs } from 'fs';

interface ComponentOptions {
  out: string;
  page: boolean;
  standalone: boolean;
  skipTest: boolean;
  withService: boolean;
}

const newCommand = new Command('new')
  .description('Create a new component')
  .argument('<component-name>', 'Name of the component to create')
  .option('-o, --out <path>', 'Output directory', 'src/app/pages/components')
  .option('--page', 'Generate as page (in pages/ folder)', false)
  .option('--standalone', 'Standalone component', true)
  .option('--skip-test', 'Skip test file generation', false)
  .option('--with-service', 'Generate companion service', false)
  .action((componentName: string, options: ComponentOptions) => {
    const parsedName = parseComponentName(componentName);
    
    logInfo(`Creating your new fresh component: ${parsedName.className}`);
    
    generateComponentFiles(parsedName, options)
      .then(() => {
        logSuccess(`Component ${parsedName.className} was made with perfection my dear dev.`);
      })
      .catch((error: Error) => {
        logError(`Error creating this component :P: ${error.message}`);
      });
  });

async function generateComponentFiles(
  componentName: { className: string; selector: string; folderName: string },
  options: ComponentOptions
): Promise<void> {
  const { className, selector, folderName } = componentName;
  
  // Determine output directory
  const baseDir = options.page 
    ? path.join(options.out.replace('/components', ''), folderName)
    : path.join(options.out, folderName);

  // Create output directory
  await fs.mkdir(baseDir, { recursive: true });
  
  logInfo(`Output directory: ${baseDir}`);

  // Template directory
  const templateDir = path.join(__dirname, '..', 'templates');

  // Prepare template data
  const templateData = {
    className,
    selector,
    folderName,
    componentName: className,
    fileName: folderName,
    // For service
    apiEndpoint: folderName.toLowerCase(),
    entityName: className,
    // For SCSS import path
    scssImportPath: options.page ? '../variables-Aluno.scss' : '../../variables-Aluno.scss'
  };

  try {
    // Generate TypeScript component file
    const tsTemplate = path.join(templateDir, 'component.ts.template');
    const tsOutput = path.join(baseDir, `${folderName}.component.ts`);
    await generateFileFromTemplate(tsTemplate, tsOutput, templateData);
    logInfo(`✓ Created ${folderName}.component.ts`);

    // Generate HTML template file
    const htmlTemplate = path.join(templateDir, 'component.html.template');
    const htmlOutput = path.join(baseDir, `${folderName}.component.html`);
    await generateFileFromTemplate(htmlTemplate, htmlOutput, templateData);
    logInfo(`✓ Created ${folderName}.component.html`);

    // Generate SCSS file
    const scssTemplate = path.join(templateDir, 'component.scss.template');
    const scssOutput = path.join(baseDir, `${folderName}.component.scss`);
    await generateFileFromTemplate(scssTemplate, scssOutput, templateData);
    logInfo(`✓ Created ${folderName}.component.scss`);

    // Generate spec file (unless skipped)
    if (!options.skipTest) {
      const specTemplate = path.join(templateDir, 'component.spec.ts.template');
      const specOutput = path.join(baseDir, `${folderName}.component.spec.ts`);
      await generateFileFromTemplate(specTemplate, specOutput, templateData);
      logInfo(`✓ Created ${folderName}.component.spec.ts`);
    }

    // Generate service file (if requested)
    if (options.withService) {
      const serviceTemplate = path.join(templateDir, 'service.ts.template');
      const serviceOutput = path.join(baseDir, `${folderName}.service.ts`);
      await generateFileFromTemplate(serviceTemplate, serviceOutput, templateData);
      logInfo(`✓ Created ${folderName}.service.ts`);
    }

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to generate files: ${errorMessage}`);
  }
}

export default newCommand;