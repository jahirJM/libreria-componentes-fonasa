declare module "prompts" {
  interface PromptObject {
    type: string;
    name: string;
    message: string;
    initial?: unknown;
  }

  function prompts(
    questions: PromptObject | PromptObject[]
  ): Promise<Record<string, unknown>>;

  export default prompts;
}
