// This is used to format the AI's responses to be more readable

export function addMarkdownNewlines(text: string): string {
  // Add newline before each numbered step (e.g., 1., 2., 3.)
  let withSteps = text.replace(/([0-9]+\. )/g, '\n$1');
  // Add newline before each bullet point
  withSteps = withSteps.replace(/(\* )/g, '\n$1');
  // Add newline before headings (e.g., ##, ###, etc.)
  withSteps = withSteps.replace(/(#+ )/g, '\n$1');
  // Optionally, add double newlines after periods followed by a capital letter (for paragraphs)
  withSteps = withSteps.replace(/\\. ([A-Z])/g, '.\n\n$1');
  return withSteps;
}