export interface CommandOptions {
  out?: string;
  page?: boolean;
  standalone?: boolean;
  skipTest?: boolean;
  withService?: boolean;
  dryRun?: boolean;
}

export interface ComponentTemplate {
  name: string;
  path: string;
  options: CommandOptions;
}

export interface FileGenerationResult {
  success: boolean;
  message: string;
  filePath?: string;
}

export interface Logger {
  log: (message: string) => void;
  error: (message: string) => void;
  warn: (message: string) => void;
}