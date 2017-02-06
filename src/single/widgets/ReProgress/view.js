import React from 'react';

export default class view extends React.Component {
    static propTypes = {
        mode: React.PropTypes.string,
        indText: React.PropTypes.string,
        percentage: React.PropTypes.number,
        permeated: React.PropTypes.bool,
    };

    static defaultProps = {
        percentage: 0,
        mode: 'determinate',
        indText: '',
        permeated: false
    }


    constructor(props, context) {
        super(props, context);
        this.state = {

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

    renderDeterminate() {
        let percentage = this.props.percentage < 0 ? 0 : this.props.percentage > 100 ? 100 : this.props.percentage

        return (
            <div className={ this.props.className ? "ori-progress-root " + this.props.className : "ori-progress-root" } >
                <div className="progress-wrapper">
                    <div
                        className="progress"
                        style={{ width: `${percentage}%` }}
                    />
                </div>
                <span className="percentage">{percentage}%</span>
            </div>
        );
    }

    renderIndeterminate() {
        return (
            <div className={ this.props.className ? "ori-progress-root " + this.props.className : "ori-progress-root" } >
                <div className="progress-wrapper">
                    <div
                        className={this.props.permeated ? "progress permeated" : "progress ind-progress"}
                    />
                </div>
                <span className="percentage">{this.props.indText}</span>
            </div>
        );
    }

    render() {
        if (this.props.mode === 'indeterminate') {
            return this.renderIndeterminate();
        } else {
            return this.renderDeterminate();
        }
    }
}
