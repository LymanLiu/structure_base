// import model from './model';
// import MultiView from '../../../core/MultiView';
// import Header from '../../logics/header/view.js';
// import Footer from '../../logics/footer/view.js';
console.log(MultiView)
class View {
    constructor() {
        // super();
        // this.comModel = model;
        this.initModel()
            .banner();
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

        return this;
    }

    banner() {
        //jQuery变量，我们习惯以$开头
        var $lis = $("#imageslist ul li");
        
        var idx = 0;

        //右按钮添加事件监听
        $("#rightBtn").click(function(){
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
        });

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

        return this;
    }

}

new View();
// require('../../../core/MultiView')
