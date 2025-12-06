const config = {
  // Use the standard Conventional Commits configuration
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-case': [0, 'always', []],
    // Optionally add custom rules, e.g., requiring a scope
    // 'scope-case': [2, 'always', 'kebab-case'],
    // 'type-enum': [
    //   2,
    //   'always',
    //   ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore', 'perf', 'ci', 'build'],
    // ],
  },
}

export default config
