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
        this.id = location.hash.match(/id=\d+/).join('').replace('id=', '');
        this.type = location.hash.replace('#', '');

        let title = this.type === 'business' ? '行业咨询' : '公司新闻';
        this.$newslistTitle.html(title);

        $.get(this.getApi('getNews'), {page: 1, pageSize: 1, type: this.type, id: this.id }, (res) => {
            res = JSON.parse(res);
            this.$newList.html(this.initNews(res.list));
        });

        return this;
    }
    initNews(list) {
        if(!list) return;
       return list.map(item => {
            return `<h2 class="title">${item.title}</h2>
                    <p class="time-box">${item.time}</p>
                    <div class="content-box">
                        ${item.content}
                    </div>`;
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
