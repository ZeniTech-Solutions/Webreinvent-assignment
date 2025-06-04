import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt(
  // ...Custom flat configs append after nuxt's configs
)
  .prepend(

  )
  // Override some rules in a specific config, based on their name
  .override("nuxt/typescript/rules", {
    rules: {
      // ...Override rules, for example:
      "@typescript-eslint/ban-types": "off",
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/no-shadow": ["error"],
      "@typescript-eslint/array-type": ["error", { default: "array" }],
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
      "@typescript-eslint/no-explicit-any": "warn",
    },
  });