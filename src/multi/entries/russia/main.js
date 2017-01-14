//node
const fs = require('fs');
const _ = require('underscore');

//core
const MultiMain = require('../../../core/MultiMain.js');

//inner
const Head = require('../../logics/head');
const Header = require('../../logics/header');
const Footer = require('../../logics/footer');
const SliderContainer = require('../../logics/sliderContainer');

class Frame extends MultiMain {

    constructor() {
        super();
        this.comModel = require('./model.js');
        this.model = {};
        this.tpl = fs.readFileSync(`${__dirname}/view.tpl`, 'utf8');
        this.initData()
            .initModel();
    }

    initData() {

        this.pageTwo = [
            {
                title: '一 俄罗斯清关优势产品：',
                content: [
                    '1、服装、布匹、鞋帽、眼镜、箱包、灯具、瓷砖、毛巾、床上用品、面料、渔具、建材、医疗器械、毛绒玩具、台布、蔬菜袋子、大小百货等疑难货物。',
                    '2、各类小型类机器、机械类设备、汽车配件、模具，暖气片，阀门管件，淋浴房及相关配件卫生洁具、工艺礼品、设备维修工具等五金设备类产品。',
                    '3、手机、手机配件、电脑、电脑配件、安防产品、行车记录仪、平板电脑、GPS、CVR、U盘、光纤线材、电子元器件、各类LED灯具设备类等高价值电子产品。',
                    '4、无论什么产品，无论什么牌子以及国外大品牌都可以做到一站式超速清关，双清关且安全、快捷的到达目的地。'
                ]
            },
             {
                title: '二 俄罗斯空运优势服务及时效：',
                content: [
                    '1、俄罗斯特快专递：客机带货，时效72小时以内到达莫斯科。',
                    '2、俄罗斯大货空运：全程空运，时效5-8天到莫斯科，16天俄罗斯全境。',
                    '3、俄罗斯小件空运：全程空运，15天俄罗斯全境派送上门。'    
                ]
            }
        ];

        this.pageThree =  [
            ['莫斯科', '圣彼得堡', '东方港' ,'海参崴'],
            ['乌苏里斯克', '伊尔库克斯', '巴罗夫克' ,'乌兰乌得'],
            ['雅库茨克', '托木斯克', '梁赞' ,'新罗西斯克'],
            ['克拉斯诺亚尔斯克', '彼尔姆', '新西伯利亚' ,'车里雅宾斯克'],
            ['秋明', '喀山', '叶卡捷琳堡' ,'罗斯托夫'],
            ['比尔姆', '弗拉基米尔', '萨马拉' ,'鄂木斯克'],
            ['鄂木斯克', '托木斯克', '乌法' ,'普斯科夫'],
            ['伏尔加格勒', '新罗西斯克', '白俄罗斯']
        ];

        this.pageFour = [
            ['圣彼得堡', '伏尔加格勒', '托木斯克' ,'雅库茨克'],
            ['切博克萨雷', '彼尔姆', '克拉斯诺亚尔斯克' ,'乌法'],
            ['喀山', '鄂木斯克', '下诺夫哥罗德' ,'叶卡捷琳堡'],
            ['新西伯利亚', '车里雅宾斯克', '伊尔库茨克' ,'乌兰乌德'],
            ['海参崴', '乌苏里', '哈巴罗夫斯克']
        ];

        this.sliderData = {
            title: '俄罗斯专线',
            sliderList : [
                '俄罗斯空运',
                '俄罗斯陆运',
                '俄罗斯快递'
            ],
            contentList : [
                {
                    pageOne: {
                        img: 1,
                        pageText: [
                            '亿宁国际货运代理有限公司（981Карго）是一家专注从事俄罗斯运输的品牌货代，公司总部在广州，公司经过多年的发展以在北京，义乌，都设立有分公司，我公司在俄罗斯境内成立了自已的清关团队，在运输方面我们做到了安全快捷，在清关方面我们做到了快速，各个环节精准控制，让客户无需担心清关的麻烦，我们一站式为你解决，随时随地都能掌握货物的运输状态。',   
                            '安全快捷的俄罗斯空运全程时效快空5-8天左右，慢空8-12天左右，货物统一在指定的国际机场装机起飞，广州白云国际机场，北京首都国际机场，石家庄国际货运机场，直达俄罗斯莫斯科谢列梅捷沃机场。我公司驻莫斯科办事处的工作人员接到货物后，用汽车分别派送货物到达目的地，送达客户手中实现一站式的服务。 ',
                            '安全快捷的俄罗斯空运是亿宁国际 (981Карго)对俄的主要运输方式之一，安全、快捷、一站式的俄罗斯空运，期待您的选择。'
                        ]
                    },
                    pageTwo:this.pageTwo,
                    pageThree: this.pageThree,
                    pageFour: []
                },
                {
                    pageOne: {
                        img: 2,
                        pageText: [
                            '随着近年俄罗斯放开中国电商的网络端口，俄罗斯客人也学会通过AliExpress  Alibaba, Taobao来购卖商品，俄罗斯快递行业也随之诞生。',
                            '亿宁国际推出到俄快递主要以服务老客户为主，追求安全，注重速度;只从事72小时以内到达莫斯科的莫斯科速递，和全境16天左右上门的俄罗斯到门快递两种运输方式，在很大程度上满足了客户对货物的安全和时效要求，深受广大客户的信赖和支持。',
                            '灵活高效的俄罗斯快递是亿宁国际(981Карго)对俄的主要运输方式之一，效率、省心、一站式的俄罗斯快递，期待您的选择!'
                        ]
                    },
                    pageTwo:this.pageTwo,
                    pageThree: this.pageThree,
                    pageFour: this.pageFour
                },
                {
                    pageOne: {
                        img: 3,
                        pageText: [
                            '亿宁国际货运代理有限公司（981Карго）是一家专注从事俄罗斯运输的品牌货代，公司总部在广州，公司经过多年的发展以在北京，义乌，都设立有分公司，我公司在俄罗斯境内成立了自已的清关团队，在运输方面我们做到了安全快捷，在清关方面我们做到了快速，各个环节精准控制，让客户无需担心清关的麻烦，我们一站式为你解决，随时随地都能掌握货物的运输状态。',
                            '安全经济快捷的俄罗斯陆运，陆运全程时效18-25天左右，陆运货物经过乌鲁木齐或满州里口岸出境，直达俄罗斯境内，货物到达终点站莫斯科然后在通过俄境内的物流分发到各个大中小城市到达客户手中。',
                            '安全经济快捷的俄罗斯陆运是亿宁国际货运 (981Карго)对俄的主要运输服务之一，安全、经济、一站式的俄罗斯专线陆运，期待您的选择!'
                        ]
                    },
                    pageTwo: this.pageTwo,
                    pageThree: this.pageThree,
                    pageFour: []
                }
               
            ]
        }
        return this;
    }

    initModel() {
        let head = new Head();
        let header = new Header();
        let footer = new Footer();
        let sliderContainer = new SliderContainer();

        this.model = _.extend(this.model, {
            head: head.render({ less: 'russia', title: '<$- RUSSIA_TITLE $>' }).html,
            header: header.render().html,
            footer: footer.render().html,
            sliderContainer: sliderContainer.render({sliderData: this.sliderData}).html
        });

        return this;
    }

}

module.exports = Frame;
