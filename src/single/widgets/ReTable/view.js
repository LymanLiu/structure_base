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
        onChange: React.PropTypes.func
    };

    static defaultProps = {
        onChange: () => {}
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
                           {/*<th width="100px">
                               <ReCheckbox 
                                   label="全部"
                                   onChange={this.checked.bind(this, 999)}
                               />
                          </th>*/}
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
                                    {/*<td className="tc">
                                         <ReCheckbox 
                                            onChange={this.checked.bind(this, list[0])}
                                        />
                                    </td>*/}
                                </tr>
                            )                  
                        })}

                   </tbody>
                </table>

            </div>
        );
    }
}
