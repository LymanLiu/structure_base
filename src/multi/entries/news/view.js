// import model from './model';
// import MultiView from '../../../core/MultiView';
// import Header from '../../logics/header/view.js';
// import Footer from '../../logics/footer/view.js';
class View extends MultiView {
    constructor() {
        super();
        this.comModel = {};
        this.initEvent()
            .initModel();

    }

    initEvent() {

        this.$businessNews = $('#businessNews');
        this.$companyNews = $('#companyNews');
        this.$businessMore = $('#businessMore');
        this.$companyMore = $('#companyMore');

        this.lang = ~location.href.indexOf('cn') ? 'cn' : 'en';

        $.get(this.getApi('getNews'), {page: 1, pageSize: 3, type: 'business',lang: this.lang}, (res) => {
            res = JSON.parse(res);
            this.$businessNews.html(this.initNews(res.list, 'business'));
        });

        $.get(this.getApi('getNews'), {page: 1, pageSize: 3, type: 'company',lang: this.lang}, (res) => {
            res = JSON.parse(res);
            this.$companyNews.html(this.initNews(res.list, 'company'));
        });

        this.skipMore(this.$businessMore, 'business');
        this.skipMore(this.$companyMore, 'company');

        return this;
    }

    skipMore(dom , type) {
        
        dom[0].onclick = () => {
            location.href = location.origin + `/981/${this.lang}/newslist.html#${type}`;
        }
    }

    initNews(list,type) {
        if(!list) return;
       return list.map(item => {
            return `<li class="item">
                    <a href="/981/${this.lang}/newslistdetail.html#${type}?id=${item.id}">
                        <h4 class="title">${item.title}</h4>
                        <p class="time-box">${item.time}</p>
                        <div class="content-box">
                            ${item.content}
                        </div>
                    </a>
                </li>`
        })
    }

    initModel() {

        // $('h1').click(this.sayTest);
        
        // let header = new Header();
        // let footer = new Footer();


        this.model = {...this.comModel,
            ... {
                title: '<$- HOME $>'
            }
        };

        return this;
    }


}

new View();
