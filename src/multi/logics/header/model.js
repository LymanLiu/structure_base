const host = '/981/<$- LNAG $>/';
module.exports = {
   navlist: [
   		{
   			name: '<$- NAV_HOME $>',
            url: `${host}`
   		},
   		{
   			name: '<$- NAV_ABOUT $>',
             url: `${host}about.html`

   		},
   		{
   			name: '<$- NAV_RUSSIA $>',
             url: `${host}russia.html`
   		},
   		{
   			name: '<$- NAV_UA $>',
            url: `${host}ua.html`,
   		},
   		{
   			name: '<$- NAV_WHITE_RUSSIA $>',
            url: `${host}whiterussia.html`
   		},
   		{
   			name: '<$- NAV_WULIU $>',
            url: `${host}search.html`
   		},
   		{
   			name: '<$- NAV_NEWS $>',
            url: `${host}news.html`,
            child: ['行业资讯', '公司新闻']
   		},
   		{
   			name: '<$- NAV_CONTACT $>',
            url: `${host}contact.html`
   		}
   ]
};
