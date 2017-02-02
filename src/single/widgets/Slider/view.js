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
                    title: '新闻',
                    type:'news1',
                    isActive: true
                },
                {
                    title: '新闻2',
                    type: 'news2',
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

    hanlderChoose(num,type) {
        // console.log(num,type)
       this.state.list.forEach((v,i) => num === i ? v.isActive = true : v.isActive = false );
       // console.log(this.state.list);
        this.setState({
            list: this.state.list
        });
        this.props.onChange && this.props.onChange(type, num);
    }

    render() {
        return (
            <div className="slider-root">
    			<ul className="slider-title">
                   {this.state.list.map((item, i) => {
                        return (
                            <li 
                                className={item.isActive ? 'active' : ''} 
                                onClick={() => this.hanlderChoose(i,item.type)}
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
