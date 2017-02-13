import React from 'react';

//react-router;
import { Link } from 'react-router';

//component
import ReCheckbox from '../ReCheckbox'


export default class view extends React.Component {
    static propTypes = {
        //name: React.PropTypes.string,
        tdData: React.PropTypes.array.isRequired,
        thData: React.PropTypes.array.isRequired,
        onEditor: React.PropTypes.func,
        onDelete: React.PropTypes.func,
        isShowDel: React.PropTypes.bool,
        isShowEidt: React.PropTypes.bool,
    };

    static defaultProps = {
        onEditor: () => {},
        onDelete: () => {},
        isShowDel: false,
        isShowEidt: false
    };

    constructor(props, context) {

        super(props, context);


        // init state;
        this.state = {
            checkArr: []
        };
    }
    componentWillMount() {
        this._isMounted = true;

    }

    componentDidMount() {

    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    checked(id, e, b) {
        console.log(id, e, b)
        if (b) {
            if (id === 999) {
                this.state({ checkArr: [] })
            }
        } else {

        }
    }

    render() {

        var td = this.props.tdData;
        var th = this.props.thData;

        return (
            <div className="orin-sw-retable-root" >
                <table>
                    <thead>
                        <tr>
                            <th width="80px">序号</th>
                           { th.map((res, i) => {
                                return (
                                    <th key={'th' + i}>{res}</th>
                                )
                           })}
                           {this.props.isShowEidt ? <th>修改</th> : null}
                           {this.props.isShowDel ? <th>删除</th> : null}
                       </tr>
                    </thead>
                   <tbody>
                       {td.map((list, i) => {
                            return (
                                <tr key={"tr" + i}>
                                    <td className="tc">{i + 1}</td>
                                   {list.map((item, i) => {
                                     return (
                                        <td key={'td' + i}>
                                            <div  dangerouslySetInnerHTML={{__html: item}} className="inner-box"></div>
                                        </td>
                                    )                                   
                                   })}
                                    {this.props.isShowEidt ? <td className="edit" onClick={() => this.props.onEditor({id: list[0]})}>修改</td> : null}
                                    {this.props.isShowDel ? <td className="del" onClick={() => this.props.onDelete({id: list[0]})}>删除</td> : null}
                                </tr>
                            )                  
                        })}

                   </tbody>
                </table>

            </div>
        );
    }
}
