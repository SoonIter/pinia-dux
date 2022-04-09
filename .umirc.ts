import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'pinia-dux',
  favicon:
    'https://github.com/SoonIter/pinia-dux/blob/master/docs/assets/logo.png?raw=true',
  logo: 'https://github.com/SoonIter/pinia-dux/blob/master/docs/assets/logo.png?raw=true',

  outputPath: 'docs-dist',
  history: {
    type: 'hash',
  },
  // more config: https://d.umijs.org/config
});
