const config = {
    apiHost: () => 'http://www.981cargo.com/static/libs/php/',

}

const API = {
    getNews: () => `get_news.php`, //get
    getOrder: () => `get_order.php`, //get
    insertNews: () => `insert_news.php`, //post
    insertOrder: () => `insert_order.php`, //post
    searchOrder: () => `search_order.php`, //post
    signIn: () => `sign_in.php`, //post
    signOut: () => `sign_out.php`, //delete
}

window.MultiView = class MultiView {
    constructor() {
    	this.api = API;
    	this.config = config;
    }

    getApi(name) {
    	return this.config.apiHost() + this.api[name]();
    }

    sayTest() {
        console.log('hello')
    }
}


//header
class Header extends MultiView {
    constructor() {
        super();
        this.model = {};
        this.initModel()
            .initEvent();
    }

    initEvent() {
        this.$navLis = $('.header .wrapper ul .level_1');
        this.$chooseLang = $('#chooseLang');
        this.$aDom = $('#header a');

        let lang = ~location.href.indexOf('cn') ? 'china' : 'russia';
        this.$chooseLang.val(lang);

        // this.$navLis.click(function(event) {
        //     $(this).addClass('cur').siblings().removeClass('cur');
        // });

        this.$chooseLang.change(function(e) {
            var val = $(this).val();
            // console.log(val)
            switch (val) {
                case 'china':
                    window.location.href = location.origin + location.pathname.replace('en', 'cn');
                    break;
                case 'russia':
                    window.location.href = location.origin + location.pathname.replace('cn', 'en');
                    break;
            }
        });

        // this.initTab();
        return this;
    }

    initTab() {

        this.pageList = ['index', 'about', 'russia', 'ua', 'whiteRussia', 'search', 'news', 'contact'];

        for (let i = 0; i < this.pageList.length; i++) {
                // console.log(this.$navLis.eq(i), i)
            if( location.href.indexOf( this.pageList[i]) > -1 ) {
                console.log(this.pageList[i], i)

                this.$navLis.eq(i).addClass('cur')
            }
        };
    }

    initModel() {
        this.model = {...this.model, ...{
            title: '<$- HOME $>'
        }};
        return this;
    }


}

new Header();