// module.exports = {
// 	theme: 'yubisaki',
// 	title: 'HOME', 
// 	description: `lewis's blog`,

// }

module.exports = {
  title: '大前端之路', 
  description: '朱天和的博客',
  head: [
      ['link', { rel: 'icon', href: '/img/logo.ico' }],
      ['link', { rel: 'manifest', href: '/manifest.json' }],
  ],
	dest: './docs/dist',// 定义打包文件
	themeConfig: {
		nav: [
			{text: 'Blog', link: '/blog/'},
			{text: 'About', link: '/about/'},
			{text: 'CSDN', link: 'https://blog.csdn.net/u013205165'},
			{text: 'Github', link: 'https://github.com/zhutianhe'}
		],
    sidebar: [
      {
        title: '入门到精通',   // 必要的
        path: '/foo/',      // 可选的, 应该是一个绝对路径
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: [
          '/'
        ]
      },
      {
        title: '神坑纪',
        children: [ /* ... */ ]
      },
      
    ]
	},
	markdown: {
		anchor: {
			permalink: true
		},
		toc: {
			includeLevel: [1, 2]
		},
		config: md => {
			// 使用更多 markdown-it 插件！
			md.use(require('markdown-it-task-lists'))
			.use(require('markdown-it-imsize'), { autofill: true })
		}
	},
	postcss: {
		plugins: [require('autoprefixer')]
	},
}