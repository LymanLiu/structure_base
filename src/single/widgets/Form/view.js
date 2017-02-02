import React from 'react';

export default class view extends React.Component {
    constructor(props, context) {

        // static propTypes = {
        //     onChange: React.propTypes.func,
        //     inputInitDate: React.propTypes.array,
        //     textareaInitDate: React.propTypes.array,
        //     imgInitDate: React.propTypes.array,
        // }
        // 

        super(props, context);

        //init state
        this.state = {
           
        }

    }

    componentDidMount() {
        this._isMounted = true;
    }
    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <div className="Form-root">
    			
    		</div>
        )
    }
}

// view.propTypes = {
//     onChange: React.propTypes.func
// }
