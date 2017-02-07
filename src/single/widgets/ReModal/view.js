import React from 'react';

/**
 * @component ReModal
 *
 * <ReModal
 *      isShow={this.state.isShow}
 *      type="horizontal"
 *      horizontal="3rem 3rem">
 *      <div style={{width:280,height:160,backgroundColor:'#fff'}}>Modal</div>
 * </ReModal>
 *
 * @param {boolean} isShow
 * - true | false
 *
 * @param {string} type
 * - auto | position | horizontal
 *
 * @param {string} position
 * - 1rem | 2rem 2rem | 1rem 2rem 3rem 4rem
 *
 * @param {string} horizontal
 * - 3rem 3rem | 80%
 */

export default class view extends React.Component {
    static propTypes = {
        className: React.PropTypes.string,
        isShow: React.PropTypes.bool.isRequired,
        type: React.PropTypes.string.isRequired,
        horizontal: React.PropTypes.string,
        position: React.PropTypes.string,
        onClose: React.PropTypes.func,
    };

    static defaultProps = {
        isShow: false,
        type: 'auto',
        isShowWrapper: false
    }

    constructor(props, context) {

        super(props, context);
        // init state;
        this.state = {
            isShow: props.isShow,
            opacity: 0,
            type: props.type,
            style: {},
            isShowWrapper: false
        };
        this.timer = null;
    }

    componentWillMount() {
        this._isMounted = true;
        this.getType();
    }

    componentDidMount() {}

    componentWillUnmount() {
        this._isMounted = false;
        clearInterval(this.timer);
    }

    componentWillReceiveProps({ isShow, type }) {
        this.setState({
            isShow,
            type
        });
    }

    handleHideClick() {
        this.setState({
            opacity: 0,
            isShowWrapper: false
        })
        this.timer = setInterval(() => {
            this.setState({
                isShow: false
            })
            clearInterval(this.timer);
        }, 500);

    }

    setPosition() {
        let style = {};
        if (this.props.position) {
            let position = this.props.position.split(' ');
            switch (position.length) {
                case 1:
                    {
                        style['top'] = this.props.position;
                        style['right'] = this.props.position;
                        style['bottom'] = this.props.position;
                        style['left'] = this.props.position;
                    }
                    break;
                case 2:
                    {
                        style['top'] = position[0];
                        style['bottom'] = position[0];
                        style['right'] = position[1];
                        style['left'] = position[1];
                    }
                    break;
                case 4:
                    {
                        style['top'] = position[0];
                        style['bottom'] = position[1];
                        style['right'] = position[2];
                        style['left'] = position[3];
                    }
                    break;
            }
        }
        this.setState({
            style
        })
    }

    setHorizontal() {
        let style = {};
        if (this.props.horizontal) {
            let horizontalArray = this.props.horizontal.split(' ');
            if (horizontalArray.length == 1) {
                style['width'] = this.props.horizontal;
                style['left'] = '50%';
                style['WebkitTransform'] = 'translate3d(-50%,-50%,0)';
                style['MozTransform'] = 'translate3d(-50%,-50%,0)';
                style['OTransform'] = 'translate3d(-50%,-50%,0)';
                style['transform'] = 'translate3d(-50%,-50%,0)';
            } else {
                style['left'] = horizontalArray[0];
                style['right'] = horizontalArray[1];
            }
        }
        this.setState({
            style
        });
    }

    getType() {
        switch (this.props.type) {
            case 'position':
                {
                    this.setState({
                        type: 'position'
                    });
                    this.setPosition();
                }
                break;
            case 'horizontal':
                {
                    this.setState({
                        type: 'horizontal'
                    });
                    this.setHorizontal();
                }
                break;
            default:
                {
                    this.setState({
                        type: 'auto'
                    });
                }
        }
    }

    render() {
        let show = this.state.isShowWrapper ? ' show' : '';
        if(this.state.isShow){
            clearInterval(this.timer);
            this.timer = setInterval(() => {
                this.setState({
                    opacity: .7,
                    isShowWrapper: this.state.isShow
                })
                clearInterval(this.timer);
            }, 5);
        }

        return (
            <div className={"orin-sw-remodal-root" + (this.props.className ? " "+ this.props.className : "")} style={{'display': this.state.isShow ? 'block' : 'none'}}>
                <div className="orin-sw-remodal-mask"
                     style={{'opacity': this.state.opacity}}
                     onClick={(e) => {this.props.onClose && this.props.onClose(e); this.handleHideClick(); }}>
                </div>
                <div className={'orin-sw-remodal-wrapper orin-sw-remodal-' + this.state.type + show}
                     style={this.state.style}>{this.props.children}</div>
            </div>
        );
    }
}
