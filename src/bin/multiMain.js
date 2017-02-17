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

    ajax(name) {
        return {
            get(URL,queryJSON) {
                if (window.XMLHttpRequest) {
                    var xhr = new XMLHttpRequest();
                } else {
                    var xhr = new ActiveXObject('Microsoft.XMLHTTP');
                }
                var promise = new Promise((r, j) => {
                    xhr.onreadystatechange = function() {
                        try {
                            if (xhr.readyState == 4) {
                                if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                                    r(JSON.parse(xhr.responseText));
                                } else {
                                    j(JSON.parse(xhr.responseText));
                                }
                            }
                        } catch (err) {
                            j({}, err);
                        }
                    };
                });
                var querystring = _queryjson2querystring(queryJSON);
                xhr.open('get', URL + '?' + querystring, true);
                // xhr.open('GET', URL, true);
                xhr.send(null);
                return promise;

                function _queryjson2querystring(json) {
                    var arr = [];
                    for (var k in json) {
                        arr.push(k + '=' + encodeURIComponent(json[k]));
                    }
                    return arr.join('&');
                }
            },
            delete(URL) {
                if (window.XMLHttpRequest) {
                    var xhr = new XMLHttpRequest();
                } else {
                    var xhr = new ActiveXObject('Microsoft.XMLHTTP');
                }
                var promise = new Promise((r, j) => {
                    xhr.onreadystatechange = function() {
                        try {
                            if (xhr.readyState == 4) {
                                if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                                    r(JSON.parse(xhr.responseText));
                                } else {
                                    j(JSON.parse(xhr.responseText));
                                }
                            }
                        } catch (err) {
                            j({}, err);
                        }
                    };
                });
                // var querystring = this._queryjson2querystring(queryJSON);
                // xhr.open('get', URL + '?' + querystring, true);
                xhr.open('DELETE', URL, true);
                xhr.send(null);
                return promise;
            },
            post(URL, queryJSON) {
                if (window.XMLHttpRequest) {
                    var xhr = new window.XMLHttpRequest();
                } else {
                    var xhr = new ActiveXObject('Microsoft.XMLHTTP');
                }

                var promise = new Promise((r, j) => {
                    xhr.onreadystatechange = function() {
                        try {
                            if (xhr.readyState == 4) {
                                if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                                    r(JSON.parse(xhr.responseText));
                                } else {
                                    j(JSON.parse(xhr.responseText));
                                }
                            }
                        } catch (err) {
                            j(err);
                        }
                    };

                });

                var querystring = _queryjson2querystring(queryJSON);

                xhr.open('POST', URL, true);

                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xhr.send(querystring);

                function _queryjson2querystring(json) {
                    var arr = [];
                    for (var k in json) {
                        arr.push(k + '=' + encodeURIComponent(json[k]));
                    }
                    return arr.join('&');
                }

                return promise;
            }

        }[name].bind(this);
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
        // this.chooseLang = document.getElementById('chooseLang');
        this.$chooseLang = $('#chooseLang');
        this.$aDom = $('#header a');

        let lang = ~location.href.indexOf('cn') ? 'china' : 'russia';
        let fontSize = ~location.href.indexOf('cn') ? 16 : 12;
        this.$navLis.css('font-size', fontSize)
        this.$chooseLang.val(lang);

        // console.log(this.chooseLang)
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


$(function() {
    new Header();

});