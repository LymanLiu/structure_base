import React from 'react';

export default class view extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
        label: React.PropTypes.string,
        checked: React.PropTypes.bool,
        disabled: React.PropTypes.bool,
        defaultChecked: React.PropTypes.bool,
        onChange: React.PropTypes.func
    };

    static defaultProps = {
        defaultChecked: false,
        disabled: false
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
            checked: props.defaultChecked
        };
    }

    componentWillMount() {
        this._isMounted = true;
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        if (this.props.checked !== nextProps.checked) {
            this.setState({ checked: nextProps.checked });
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleChecked(e) {
        let checked = !this.state.checked
        this.setState({ checked });
        this.props.onChange && this.props.onChange(e, checked);
    }

    render() {
        return (
            <label className="ori-checkbox-root">
                <span className="input">
                    <span className={this.state.checked ? 'checked' : ''} />
                    <input
                        type="checkbox"
                        checked={this.state.checked}
                        disabled={this.props.disabled}
                        onChange={this.handleChecked.bind(this)}
                    />
                </span>
                <span className="label">{this.props.label}</span>
            </label>
        );
    }
}
