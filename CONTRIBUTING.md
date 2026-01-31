# Contributing to CrochetPixel

First off, thanks for taking the time to contribute! 🎉

The following is a set of guidelines for contributing to CrochetPixel. These are just guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Getting Started

1.  **Fork the repository** on GitHub.
2.  **Clone your fork** locally:
    ```bash
    git clone [https://github.com/YOUR_USERNAME/crochet-pixel.git](https://github.com/YOUR_USERNAME/crochet-pixel.git)
    cd crochet-pixel
    ```
3.  **Install dependencies**:
    ```bash
    npm install
    ```
4.  **Create a branch** for your feature or fix:
    ```bash
    git checkout -b feature/amazing-feature
    ```

## Development Workflow

- Run the development server: `npm run dev`
- We use **TypeScript** for type safety. Please ensure no `any` types are used unless absolutely necessary.
- We use **Tailwind CSS** for styling.
- Ensure your code follows the existing project structure (components in `components/`, logic in `lib/`).

## How to Submit a Pull Request

1.  Push your changes to your fork:
    ```bash
    git push origin feature/amazing-feature
    ```
2.  Submit a **Pull Request** to the `main` branch of the original repository.
3.  Describe your changes clearly in the PR description.
4.  Link any relevant issues (e.g., "Fixes #123").

## Reporting Bugs

Bugs are tracked as GitHub issues. When filing an issue, explain the problem and include additional details to help maintainers reproduce the problem:

- Use a clear and descriptive title for the issue to identify the problem.
- Describe the exact steps which reproduce the problem.
- Provide specific examples to demonstrate the steps.

## License

By contributing, you agree that your contributions will be licensed under its MIT License.