// @ts-check
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");

module.exports = tseslint.config(
  {
    files: ["**/*.ts"],
    ignores: ["projects/**/*"],
    extends: [...angular.configs.tsRecommended],
    processor: angular.processInlineTemplates,
    rules: {
      "@angular-eslint/prefer-standalone": "off",
      // Materi Week 2 dan 6 memakai NgModule serta constructor injection.
      "@angular-eslint/prefer-inject": "off",
      "@angular-eslint/component-class-suffix": [
        "error",
        { suffixes: ["Page", "Component"] },
      ],
      "@angular-eslint/component-selector": [
        "error",
        { type: "element", prefix: "app", style: "kebab-case" },
      ],
      "@angular-eslint/directive-selector": [
        "error",
        { type: "attribute", prefix: "app", style: "camelCase" },
      ],
    },
  },
  {
    files: ["**/*.html"],
    extends: [...angular.configs.templateRecommended],
    rules: {
      // Materi Week 4 memakai *ngIf dan *ngFor, bukan @if dan @for.
      "@angular-eslint/template/prefer-control-flow": "off",
      "@angular-eslint/template/eqeqeq": "off",
    },
  }
);
