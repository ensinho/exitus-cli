# exitus-cli

Exitus CLI is a command-line interface tool designed to streamline the creation of Angular components. It follows a structured approach to generate reusable, consistent components with predefined templates and best practices.

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Commands](#commands)
4. [Templates](#templates)
5. [Contributing](#contributing)
6. [License](#license)

## Installation

To install Exitus CLI globally, run the following command:

```bash
npm install -g exitus-cli
```

## Usage

Once installed, you can use the CLI to generate new components. The basic syntax is:

```bash
exitus-cli new <component-name> [options]
```

## Commands

### `new`

The `new` command is used to create a new Angular component. It accepts various options to customize the generation process.

#### Options

- `-o, --out <path>`: Specify the output directory for the generated component.
- `--page`: Generate a component as a page.
- `--standalone`: Create a standalone component (default: true).
- `--skip-test`: Skip the generation of the test file.
- `--with-service`: Generate a companion service for the component.
- `--dry-run`: Preview the generated files without creating them.

## Templates

Exitus CLI uses templates for generating component files. The following templates are available:

- **TypeScript Component**: `src/templates/component.ts.template`
- **HTML Template**: `src/templates/component.html.template`
- **SCSS Styles**: `src/templates/component.scss.template`
- **Unit Test**: `src/templates/component.spec.ts.template`

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your branch and create a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.