import React from 'react';

//component
import ReButton from '../ReButton';


export default class view extends React.Component {
    static propTypes = {
        onAdd: React.PropTypes.func,
        onSearch: React.PropTypes.func,
        onFixed: React.PropTypes.func,
        onDelete: React.PropTypes.func,
        isShowSearch: React.PropTypes.bool,
        isShowFixed: React.PropTypes.bool,
        isShowDelete: React.PropTypes.bool,
    };

    static defaultProps = {
        onAdd: () => {},
        onSearch: () => {},
        onFixed: () => {},
        onDelete: () => {},
        isShowSearch: true,
        isShowFixed: true,
        isShowDelete: true,
    }

    //icon 参考 libs/font/demo_symbol.html

    constructor(props, context) {

        super(props, context);


        // init state;
        this.state = {

        };

        this.list = [{
            'label': '增加',
            'action': 'Add',
        }];
        this.props.isShowSearch && this.list.push({ 'label': '查询', 'action': 'Search' });
        this.props.isShowFixed && this.list.push({ 'label': '修改', 'action': 'Fixed' });
        this.props.isShowDelete && this.list.push({ 'label': '删除', 'action': 'Delete' });
    }
    componentWillMount() {
        this._isMounted = true;

    }

    componentDidMount() {

    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    renderList() {
        return this.list.map((item, i) => {

            return (
                <ReButton
                    key={'four' + i}
                    label={item.label}
                    onClick={() => this.props['on'+item.action]() }
                />
            )

        })
    }

    render() {
        var useTag = `<use xlink:href=#icon-${this.props.icon}></use>`;

        return (
            <div className="four-btns-root">
                { this.renderList() }
           </div>
        );
    }
}
