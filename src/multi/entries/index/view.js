// import model from './model';
// import MultiView from '../../../core/MultiView';
// import Header from '../../logics/header/view.js';
// import Footer from '../../logics/footer/view.js';
// console.log(MultiView)
class View extends MultiView {
    constructor() {
        super();
        // this.comModel = model;
        this.initModel();
            // .banner();
    }

    say() {
        alert('say')
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

        this.lang = ~location.href.indexOf('cn') ? 'cn' : 'en';

        this.$searchBtn = $('#searchBtn');
        this.$orderID = $('#orderID');

        this.$searchBtn.click(() => {
            if(this.$orderID.val() === '') {
                alert('请输入订单号')
            } else {
                let orderID = this.$orderID.val();
                location.href = location.origin + `/981/${this.lang}/search.html?orderID=${orderID}`;
            }
        });

        $.get(this.getApi('bannerImg'), {page: 1, pageSize: 3, lang: this.lang}, (res) => {
            res = JSON.parse(res);
            // console.log(res, 'banner')

            var tpl = '';
            res.list.forEach((item, i) => {
                tpl += `
                    <li><img src="${this.bannerHost}${item.pic}" alt="" /></li>
                `;
            });
            $("#imageslist ul").html(tpl);
            this.banner();

        });

        return this;
    }

    banner() {
        //jQuery变量，我们习惯以$开头
        var $lis = $("#imageslist ul li");
        
        var idx = 0;

        this.handelRight = function(){
            if($lis.eq(idx).is(":animated")){
                return;
            }
            //老图淡出
            $lis.eq(idx).fadeOut(1000);
            //信号量改变
            idx++;
            if(idx > $lis.length - 1){
                idx = 0;
            }
            //新图淡入
            $lis.eq(idx).fadeIn(1000);
        }

        //右按钮添加事件监听
        $("#rightBtn").click(this.handelRight);

        //左按钮添加事件监听
        $("#leftBtn").click(function(){
            if($lis.eq(idx).is(":animated")){
                return;
            }
            //老图淡出
            $lis.eq(idx).fadeOut(1000);
            //信号量改变
            idx--;
            if(idx < 0){
                idx = $lis.length - 1;
            }
            //新图淡入
            $lis.eq(idx).fadeIn(1000);
        });

        setInterval(this.handelRight , 3000)

        return this;
    }

}

new View();
// require('../../../core/MultiView')
