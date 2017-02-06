import React from 'react';
import { Editor, EditorState } from 'draft-js';

export default class view extends React.Component {
    static propTypes = {
        onChange: React.PropTypes.func,
    };

    static defaultProps = {
        onChange: () => {}
    };

    constructor(props) {
        super(props);
        this.state = { editorState: EditorState.createEmpty() };
        this.onChange = (editorState) => {
            this.setState({ editorState });
            this.props.onChange(editorState)
        };
    }
    render() {
        return (
            <Editor editorState={this.state.editorState} onChange={this.onChange} />
        );
    }
}
