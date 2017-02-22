// import model from './model';
// import MultiView from '../../../core/MultiView';
// import Header from '../../logics/header/view.js';
// import Footer from '../../logics/footer/view.js';
class View extends MultiView {
    constructor() {
        super();
        this.model={};
        this.comModel = {};
        this.initModel()
            .initEvent();
    }

    initEvent() {
        this.$newslistTitle=$('#newslistTitle');
        this.$newList=$('#newList');
        this.type = location.hash.replace('#', '');
        this.lang = ~location.href.indexOf('cn') ? 'cn' : 'en';

        let title = this.type === 'business' ? '行业咨询' : '公司新闻';
        this.$newslistTitle.html(title);

        $.get(this.getApi('getNews'), {page: 1, pageSize: 6, type: this.type, lang: this.lang}, (res) => {
            res = JSON.parse(res);
            this.$newList.html(this.initNews(res.list, this.type));
        });

        $(window).bind('hashchange', function() {
            location.reload();   
            // location.href = location.href;
        });

        return this;
    }


     initNews(list, type) {
        if(!list) return;
       return list.map(item => {
            return ` <li class="item">
                    <a href="/981/${this.lang}/newslistdetail.html#${type}?id=${item.id}">
                    <h4 class="title">${item.title}</h4>
                    <p class="time-box">${item.time}</p>
                    <div class="content-box">
                        ${item.content}
                    </div>
                    </a>
                </li>`;
        })
    }


    initModel() {

        // $('h1').click(this.sayTest);
        
        // let header = new Header();
        // let footer = new Footer();
        // 
        
       


        this.model = {...this.comModel,
            ... {
                title: '<$- HOME $>'
            }
        };

        return this;
    }


}

new View();
