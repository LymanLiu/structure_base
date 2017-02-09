import React from 'react';

export default class view extends React.Component {
    constructor(props, context) {

        // static propTypes = {
        //     onChange: React.propTypes.func
        // }
        // 

        super(props, context);

        //init state
        this.state = {
            list: [
                {
                    title: '订单',
                    type:'order',
                    isActive: true
                },
                {
                    title: '行业资讯',
                    type:'business',
                    isActive: false
                },
                {
                    title: '公司新闻',
                    type: 'company',
                    isActive: false
                }
            ]
        }

    }

    componentDidMount() {
        this._isMounted = true;
    }
    componentWillUnmount() {
        this._isMounted = false;
    }

    hanlderChoose(num,type, title) {
        // console.log(num,type)
       this.state.list.forEach((v,i) => num === i ? v.isActive = true : v.isActive = false );
       // console.log(this.state.list);
        this.setState({
            list: this.state.list
        });
        this.props.onChange && this.props.onChange(type, num, title);
    }

    render() {
        return (
            <div className="slider-root">
    			<ul className="slider-title">
                   {this.state.list.map((item, i) => {
                        return (
                            <li 
                                className={item.isActive ? 'active' : ''} 
                                onClick={() => this.hanlderChoose(i,item.type, item.title)}
                                key={"title" + i} >
                               {item.title}
                            </li>
                        )
                  })}
                </ul>
    		</div>
        )
    }
}

// view.propTypes = {
//     onChange: React.propTypes.func
// }
