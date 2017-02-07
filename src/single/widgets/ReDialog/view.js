import React from 'react';

//react-router;
import { Link } from 'react-router';

//component
import ReModal from '../../widgets/ReModal';
import ReIcon from '../../widgets/ReIcon';
import ReButton from '../../widgets/ReButton';

export default class view extends React.Component {
    static propTypes = {
        isModal: React.PropTypes.bool,
        isShow: React.PropTypes.bool,
        sureBtnDisabled: React.PropTypes.bool,
        dialogPending: React.PropTypes.string, // type: loading, success, error, alert, dialog
        dialogText: React.PropTypes.string,
        alertText: React.PropTypes.string,
        successText: React.PropTypes.string,
        errorText: React.PropTypes.string,
        title: React.PropTypes.string,
        onCancel: React.PropTypes.func,
        onConfirm: React.PropTypes.func,

    };

    static defaultProps = {
        isModal: true,
        isShow: false,
        dialogPending: 'alert',
        dialogText: '',
        successText: '',
        alertText: '',
        errorText: 'server error',
        title: '',
    }

    constructor(props, context) {

        super(props, context);


        // init state;
        this.state = {
            dialogPending: props.dialogPending,
            isShow: props.isShow,
            dialogText: props.dialogText,
            successText: props.successText,
            errorText: props.errorText,
            alertText: props.alertText,
            title: props.title || $$.LN.TIPS,
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

    componentWillReceiveProps(nextProps) {
        this.setState({
            dialogPending: nextProps.dialogPending,
            isShow: nextProps.isShow,
            dialogText: nextProps.dialogText,
            successText: nextProps.successText,
            errorText: nextProps.errorText,
            alertText: nextProps.alertText,
            title: nextProps.title

        });
    }


    //logic
    renderWhichComponent() {

        if (this.state.dialogPending === 'loading') {
            return this.renderCircularProgress()
        } else if (this.state.dialogPending === 'success') {
            return this.renderSuccess()
        } else if (this.state.dialogPending === 'error') {
            return this.renderError()
        } else if (this.state.dialogPending === 'alert') {
            return this.renderAlert()
        } else if (this.state.dialogPending === 'dialog') {
            return this.renderDialogHtml()
        }

    }

    //view
    renderDialog() {
        return (
            <Dialog
              modal={true}
              open={this.state.open}
            >   
                {this.renderWhichComponent()}

            </Dialog>
        )
    }

    renderDialogHtml() {
        return (
            <div className="dialog-box">
               <p className="dialog-text" >{this.state.dialogText}</p> 
            </div>
        )
    }

    renderCircularProgress() {
        return (
            <div className="circular-box">
                <svg className="circular" viewBox="25 25 50 50" >
                    <circle cx="50" cy="50" r="20" fill="none" className="path"></circle>
                </svg>
            </div>
        )
    }

    renderSuccess() {
        return (
            <div className="success-box">
                <ReIcon 
                    icon="zhengque" 
                    className="success-icon"
                />
                <p className="success-text" >{this.state.successText}</p>
            </div>

        )
    }

    renderError() {
        return (
            <div className="error-box">
                <ReIcon 
                    icon="tanhao" 
                    className="error-icon"
                />
                <p className="error-text" >{this.state.errorText}</p>
            </div>

        )
    }

    renderAlert() {
        return (
            <div className="dialog-box">
                {this.state.alertText}
            </div>

        )
    }

    renderComponent() {
        if (this.props.isModal) {
            return this.renderReModal();
        } else {
            return this.renderReSpinner();
        }
    }

    renderReModal() {
        return (
            <ReModal
                className="spinner-modal"
                isShow={this.state.isShow}
                type="horizontal"
                onClose={(e) => { this.props.onCancel && this.props.onCancel(e) }}
                horizontal="1rem 1rem">
                
               {this.renderReSpinner()}
            </ReModal>
        );
    }

    renderReSpinner() {
        return (
            <div className={this.props.className ? "orin-sw-respinner-root " + this.props.className : "orin-sw-respinner-root"} >
                <div className="title-box">
                    {this.state.title}
                    <span 
                        className="spinner-close"
                        onClick={(e) =>{ this.props.onCancel && this.props.onCancel(e) } }
                    >
                        <ReIcon 
                            icon="close" 
                        />
                    </span>
                </div>
                {this.props.children ? this.props.children : this.renderContent() }
                {this.state.dialogPending === 'dialog' ? this.renderFooter() : null }
            </div>
        );
    }

    renderContent() {
        return (
            <div className="content-box">
                {this.renderWhichComponent()}
            </div>
        );
    }

    renderFooter() {
        return (
            <div className="footer-box">
                <div className="btn-box">
                    <ReButton 
                        className="dialog-btn"
                        label={$$.LN.CANCEL}
                        onClick={(e) =>{ this.props.onCancel && this.props.onCancel(e) } }
                   />
                   <ReButton 
                        className={this.props.sureBtnDisabled ? "dialog-btn disable-style" : "dialog-btn"}
                        disabled={this.props.sureBtnDisabled}
                        label={$$.LN.OK}
                        onClick={(e) =>{ this.props.onConfirm && this.props.onConfirm(e) } }
                   />
                </div>
            </div>
        );
    }


    render() {

        return this.renderComponent();
    }
}
