import React from 'react';

//react-router;
import { Link } from 'react-router';

//component
import ReIcon from '../ReIcon';

export default class view extends React.Component {
    static propTypes = {
        label: React.PropTypes.string,
        errorText: React.PropTypes.string,
        successText: React.PropTypes.string,
        notfullWidth: React.PropTypes.bool,
        isTextarea: React.PropTypes.bool
    };

    static defaultProps = {
        label: 'default',
        notfullWidth: false,
        isTextarea: false
    }

    constructor(props, context) {

        super(props, context);

        // init state;
        this.state = {
            isEditorText: false,
            editVal: '',
        };
    }

    // componentWillReceiveProps(nextProps) {
    //     this.setState({
    //         errorText: nextProps.errorText
    //     })
    // }

    handleChange(e) {
        // console.log(e.target.value)
        this.setState({
            editVal: e.target.value
        });
        this.props.onChange && this.props.onChange(e, e.target.value);
    }

    handleViewFocus(e) {
        this.setState({
            isEditorText: true,
            editVal: e.target.value
        });
    }

    handleEditblur() {
        this.setState({
            isEditorText: false,

        });
    }

    //logic
    renderTextField() {
        return this.state.isEditorText ? this.rednerEditTextField() : this.renderViewTextField();

    }

    //view
    renderViewTextField() {
        let _props = {...this.props };
        _props.onChange && delete _props.onChange;
        _props.onFocus && delete _props.onFocus;
        delete _props.errorText;
        delete _props.notfullWidth;
        delete _props.isTextarea;
        _props.className && delete _props.className;
        _props.label && delete _props.label;

        if (this.props.isTextarea) {
            return (
                <textarea 
                    {..._props}
                    className="textarea"
                    onFocus={(...arg) => {this.handleViewFocus(...arg); this.props.onFocus && this.props.onFocus(...arg)} }
                />
            )
        } else {
            return (
                <input 
                    {..._props}
                    className="input"
                    onFocus={(...arg) => {this.handleViewFocus(...arg); this.props.onFocus && this.props.onFocus(...arg)} }
                />
            )

        }

    }

    rednerEditTextField() {
        let _props = {...this.props, ... { style: this.props.innerStyle } };
        _props.value && delete _props.value;
        _props.onBlur && delete _props.onBlur;
        _props.onChange && delete _props.onChange;
        delete _props.errorText;
        delete _props.notfullWidth;
        delete _props.isTextarea;
        _props.className && delete _props.className;
        _props.label && delete _props.label;

        if (this.props.isTextarea) {
            return (
                <textarea 
                    {..._props}
                    className="textarea"
                    value={this.state.editVal}
                    onChange={ (...arg) => { this.handleChange(...arg)} }
                    onBlur={(...arg) => {this.handleEditblur(); this.props.onBlur && this.props.onBlur(...arg)} }

                />
            )
        } else {
            return (
                <input 
                    {..._props}
                    className="input"
                    value={this.state.editVal}
                    onChange={ (...arg) => { this.handleChange(...arg)} }
                    onBlur={(...arg) => {this.handleEditblur(); this.props.onBlur && this.props.onBlur(...arg)} }

                />
            )

        }
    }

    renderLabel() {
        return (
            <label 
                className={this.props.labelClassName ? this.props.labelClassName + ' label': 'label'} >
                {this.props.label || 'default'}
            </label>
        )
    }

    renderError() {
        return (
            <p className="err-text"><ReIcon icon="tanhao" /> {this.props.errorText}</p>
        )
    }

    renderSuccess() {
        return (
            <p className="success-text"><ReIcon icon="zhengque" /> {this.props.successText}</p>
        )
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        let className = this.props.className ? "ori-retextfield-root " + this.props.className : "ori-retextfield-root ";
        className = this.props.notfullWidth ? className : className + " full-width ";
        className = this.props.errorText ? className + " err-box " : className;
        className = this.props.successText ? className + " success-box " : className;

        return (
            <div className={className} >
                {this.renderLabel()}
                {this.renderTextField()}
                {this.props.errorText ? this.renderError() : null}
                {this.props.successText ? this.renderSuccess() : null}
            </div>
        );
    }
}
