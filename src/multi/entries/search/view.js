// import model from './model';
// import MultiView from '../../../core/MultiView';
// import Header from '../../logics/header/view.js';
// import Footer from '../../logics/footer/view.js';
class View extends MultiView {
    constructor() {
        super();
        this.model = {};
        this.comModel = {};
        this.initModel();
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


        this.$searchBtn = $('#searchBtn');
        this.$orderID = $('#orderID');
        this.$searchResult = $('#searchResult');

        this.$searchBtn.click(() => this.onSearch() );

        this.orderID = !~location.search.indexOf('?orderID=') ? location.search.replace('?orderID=', '') : null;

        if(~location.search.indexOf('?orderID=')) {
            this.orderID = location.search.replace('?orderID=', '');
            // console.log(this.orderID)
            this.onSearch(this.orderID);
            this.$orderID.val(this.orderID);
        }

        return this;
    }

    onSearch(_orderID) {
        if (this.$orderID.val() === '' && !_orderID) {
            // this.$searchResult.html('<p style="color:red">请输入订单号</p>')
            alert('请输入订单号')
        } else {
            this.loadingEvent(this.$searchBtn[0], 'begin');
            var orderID = _orderID || this.$orderID.val();
            this.ajax('get')(this.getApi('searchOrder'), { orderID, lang: 'both' } )
            .then(res => {
                    this.loadingEvent(this.$searchBtn[0], 'done');
                    // res = JSON.parse(res);
                    console.log(res, 'search');
                    if (res === 0) {
                        this.$searchResult.html('<p style="color:red; text-align:center">没有该订单</p>');
                    } else {
                        var { list_cn, list_en } = res;
                        this.tpl = '';
                       if(list_cn) {
                            this.tplCN = `
                            <ul>
                                <li>订单号：${list_cn[0].orderID}</li>
                                <li>收件人: ${list_cn[0].consignee}</li>
                                <li>收件地址：${list_cn[0].address}</li>
                                <li>物流信息：${list_cn[0].logisticsInfo}</li>
                                <li>录入时间：${list_cn[0].inputTime}</li>
                            </ul> `;

                            this.tpl += this.tplCN;
                       }
                       if(list_en) {
                            this.tplEN = `
                                <ul>
                                    <li>订单号：${list_en[0].orderID}</li>
                                    <li>收件人: ${list_en[0].consignee}</li>
                                    <li>收件地址：${list_en[0].address}</li>
                                    <li>物流信息：${list_en[0].logisticsInfo}</li>
                                    <li>录入时间：${list_en[0].inputTime}</li>
                                </ul>
                            `;

                            this.tpl += this.tplEN;

                       }
                        this.$searchResult.html(this.tpl);
                    };
            })
            .catch(err => console.log(err));
        }
    }

    loadingEvent(dom, type) {
        if (type === 'begin') {
            this._html = dom.innerHTML;
            dom.className = 'disabledStyle';
            dom.disabled = true;
            this.loadingDot(dom);
        } else if (type === 'done') {
            dom.removeChild(this.loadingSpan);
            dom.className = '';
            dom.innerHTML = this._html;
            dom.disabled = false;
        }
    }

    loadingDot(loadingDom) {
        this.loadingSpan = document.createElement('span');
        for (let i = 0; i <= 2; i++) {
            var a = document.createElement('i');
            a.innerHTML = '.';
            this.loadingSpan.appendChild(a);
        }
        loadingDom.innerHTML += '中';
        loadingDom.appendChild(this.loadingSpan);
    }


}

new View();
