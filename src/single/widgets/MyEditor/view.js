import React from 'react';

//component


export default class view extends React.Component {
    // static propTypes = {
    //     getUM: React.PropTypes.func
    // };

    // static defaultProps = {
    //     getUM: () => {}
    // };

    constructor(props, context) {

        super(props, context);

        // init state;
        this.state = {

        };
    }
    componentWillMount() {
        this._isMounted = true;

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
