import React from 'react';

//component


export default class view extends React.Component {
    static propTypes = {
        value: React.PropTypes.any
    };

    static defaultProps = {
       value: ''
    };

    constructor(props, context) {

        super(props, context);

        // init state;
        this.state = {
            value : props.value
        };
    }
    componentWillMount() {
        this._isMounted = true;

    }

    componentWillReceiveProps({ value }) {
        if(value != this.state.value) {
          this.setState({
             value
          });
          UE.getEditor('myEditor').setContent(value);
        }
    }

    componentDidMount() {
          //实例化编辑器
          var um = UE.getEditor('myEditor');
          um.addListener('blur',function(){
              $('#focush2').html('编辑器失去焦点了')
          });
          um.addListener('focus',function(){
              $('#focush2').html('')
          });

    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        var html = ` <script type="text/plain" id="myEditor" style="width:100%;height:300px;"></script>`;

        return (
           <div className="my-editor-root">
              <div dangerouslySetInnerHTML={{ __html: html }} />
              <div className="clear"></div>
           </div>
        );
    }
}
