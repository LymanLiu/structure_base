import React from 'react';
import Reflux from 'reflux';

//react-router;
import { Link } from 'react-router';

import Store from './store.js';
import Actions from './actions.js';
import styles from './style.js';


//component
import ReButton from '../../widgets/ReButton';
import ReTextField from '../../widgets/ReTextField';
import FourButton from '../../widgets/FourButton';
import ReDialog from '../../widgets/ReDialog';
import PageTable from '../PageTable';

export default class view extends React.Component {
    static propTypes = {};

    static defaultProps = {
        //name: 'component name'
    };
    constructor(props, context) {
        super(props, context);

        //connect to reflux;
        this.styles = styles;
        this.actions = new Actions();
        this.store = new Store(this.actions);
        this.store.listen((data) => {
            if (this._isMounted) this.setState(data);
        });

        //init state
        this.state = this.store.getState();

        this.thData = {
            en: ['orderID', 'consignee', 'address', 'logisticsInfo', 'inputTime'],
            cn: ['订单号', '收件人', '收件地址', '物流信息', '录入时间']
        };
    }

    componentDidMount() {
        this._isMounted = true;
    }
    componentWillUnmount() {
        this._isMounted = false;
        this.actions.removeEvents(); //do not delete
    }

    renderReDialogContent() {

        if (this.state.pending === 'add') {
            return this.renderAddContent();
        } else if (this.state.pending === 'search') {
            return this.renderSearchContent();
        }
    }

    renderAddContent() {
        return (
            <div className="add-content">
                <ReTextField 
                    className="edit-textfiled"
                    label="订单号"
                    placeholder="请输入订单号"
                    value={this.state.orderID}
                    onFocus={() => this.actions.focus('orderID')}
                    onChange={(e)=>this.actions.setVal('orderID',e.target.value)}
                    errorText={this.state.orderIDErrorText}
                />
                <ReTextField 
                    className="edit-textfiled"
                    label="收件人"
                    placeholder="请输入收件人姓名"
                    value={this.state.consignee}
                    onFocus={() => this.actions.focus('consignee')}
                    onChange={(e)=>this.actions.setVal('consignee',e.target.value)}
                    errorText={this.state.consigneeErrorText}
                />

                <ReTextField 
                    className="edit-textfiled"
                    label="收件人地址"
                    placeholder="请输入收件人地址"
                    value={this.state.address}
                    onFocus={() => this.actions.focus('address')}
                    onChange={(e)=>this.actions.setVal('address',e.target.value)}
                    errorText={this.state.addressErrorText}
                />
                <ReTextField 
                    isTextarea={true}
                    className="edit-textfiled"
                    label="物流信息"
                    placeholder="请输入物流信息"
                    value={this.state.logisticsInfo}
                    onFocus={() => this.actions.focus('logisticsInfo')}
                    onChange={(e)=>this.actions.setVal('logisticsInfo',e.target.value)}
                    errorText={this.state.logisticsInfoErrorText}
                />
            </div>
        )
    }

    renderSearchContent() {
        return (
            <div className="add-content">
                <div className="search-box afterClear">
                    <div className="input-box">
                        <ReTextField 
                            className="edit-textfiled"
                            label="订单号"
                            placeholder="请输入订单号"
                            value={this.state.orderID}
                            onChange={(e)=>this.actions.setVal('orderID',e.target.value)}
                            errorText={this.state.orderIDErrorText}
                        />
                    </div>
                     <ReButton
                        disabled={this.state.searchBtn} 
                        className="search-btn"
                        label="查询"
                        onClick={()=> this.actions.search()}
                    />
                </div>
                {!this.state.isResult ? <div className="result-box">
                   <b> {this.state.resText} </b>
                </div> :  <table className="result-box">
                            <tbody>
                   {    
                        this.state.reslist.map((v, i) => {
                            return (
                                <tr
                                    key={"s" + i}
                                >
                                    <td>{this.thData.cn[i]}</td> <td  dangerouslySetInnerHTML={{ __html: v }}></td>
                                </tr>
                            );
                        })
                   }
              </tbody> </table>}
            </div>
        )
    }

    render() {
        return (
            <div className="order-form-root">
                <FourButton 
                    onAdd={() => this.actions.forbtn('add')}
                    onSearch={() => this.actions.forbtn('search')}
                    onFixed={() => this.actions.forbtn('fixed')}
                    onDelete={() => this.actions.forbtn('delete')}
                />

               <PageTable 
                    api={$$.getApi('getOrder')}
                    thData={this.thData}
                    onRefresh={this.actions.refresh}
                    onEditor={(arg) => this.actions.editor(arg)}
                    onDelete={(arg) => this.actions.delete(arg)}
                    isShowDel={this.state.isShowDel}
                    isShowEidt={this.state.isShowEidt}
               />

                <ReDialog
                    title={ this.state.dialogTitle }
                    isShow={this.state.dialogShow}
                    dialogPending={this.state.dialogPending}
                    onCancel={() => this.actions.dialogClose()}
                    onConfirm={() => this.actions.result(this.props.type)}
                    sureBtnDisabled={this.state.sureBtnDisabled}
                    isShowSureBtn={this.state.isShowSureBtn}
                    className='model-edit-dialog'
                > 
                    <div className="edit-container">
                        { this.renderReDialogContent() }
                    </div>
                </ReDialog>
            </div>
        )
    }
}

// view.propTypes = {
//     name: React.propTypes.string
// }
