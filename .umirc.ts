import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'piniadux',
  mode: 'site',
  favicon: 'https://sooniter.github.io/img/piniadux/logo.png',
  logo: 'https://sooniter.github.io/img/piniadux/logo.png',
  outputPath: 'docs-dist',
  history: {
    type: 'hash',
  },
  navs: {
    // 多语言 key 值需与 locales 配置中的 key 一致
    'en-US': [
      // null, // null 值代表保留约定式生成的导航，只做增量配置
      {
        title: 'Guide',
        path: '/guide',
      },
      {
        title: 'API',
        path: '/API',
      },
      {
        title: 'Links',
        children: [
          {
            title: 'Github Repository',
            path: 'https://github.com/SoonIter/pinia-dux',
          },
          {
            title: 'npm',
            path: 'https://www.npmjs.com/package/piniadux',
          },
        ],
      },
      {
        title: 'About Me',
        children: [
          {
            title: 'JueJin',
            path: 'https://juejin.cn/user/3809127289339464',
          },
          {
            title: 'Github',
            path: 'https://github.com/SoonIter',
          },
        ],
      },
    ],
    'zh-CN': [
      // null, // null 值代表保留约定式生成的导航，只做增量配置
      {
        title: '说明',
        path: '/zh-CN/guide',
      },
      {
        title: 'API',
        path: '/zh-CN/API',
      },
      {
        title: '链接',
        children: [
          {
            title: 'Github Repository',
            path: 'https://github.com/SoonIter/pinia-dux',
          },
          {
            title: 'npm',
            path: 'https://www.npmjs.com/package/piniadux',
          },
        ],
      },
      {
        title: '关于我',
        children: [
          {
            title: '掘金',
            path: 'https://juejin.cn/user/3809127289339464',
          },
          {
            title: 'Github',
            path: 'https://github.com/SoonIter',
          },
        ],
      },
      {
        title: '案例',
        path: '/zh-CN/demo',
      },
    ],
  },
});
