import globals from 'globals';
import pluginJs from '@eslint/js';


export default [
  {languageOptions: { globals: {
    ...globals.browser,
    ...globals.node,
  },

  ecmaVersion: 'latest',
  sourceType: 'module', }},
  pluginJs.configs.recommended,
  {
    rules: {
      indent: ['error', 2],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
    },
  }
];