import React from 'react';
import {
        CompositeDecorator,
        ContentBlock,
        ContentState,
        Editor,
        EditorState,
        convertFromHTML,
        convertToRaw,
      } from 'draft-js';

// export default class view extends React.Component {
//         static propTypes = {
//             onChange: React.PropTypes.func,
//         };

//         static defaultProps = {
//             onChange: () => {}
//         };
//         constructor(props) {
//           super(props);
//           this.state = {editorState: EditorState.createEmpty()};

//           this.focus = () => this.refs.editor.focus();
//            this.onChange = (editorState) => {
//             this.setState({ editorState });
//             this.props.onChange(editorState);
//         };

//           this.handleKeyCommand = (command) => this._handleKeyCommand(command);
//           this.onTab = (e) => this._onTab(e);
//           this.toggleBlockType = (type) => this._toggleBlockType(type);
//           this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
//         }

//         _handleKeyCommand(command) {
//           const {editorState} = this.state;
//           const newState = RichUtils.handleKeyCommand(editorState, command);
//           if (newState) {
//             this.onChange(newState);
//             return true;
//           }
//           return false;
//         }

//         _onTab(e) {
//           const maxDepth = 4;
//           this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
//         }

//         _toggleBlockType(blockType) {
//           this.onChange(
//             RichUtils.toggleBlockType(
//               this.state.editorState,
//               blockType
//             )
//           );
//         }

//         _toggleInlineStyle(inlineStyle) {
//           this.onChange(
//             RichUtils.toggleInlineStyle(
//               this.state.editorState,
//               inlineStyle
//             )
//           );
//         }

//         render() {
//           const {editorState} = this.state;

//           // If the user changes block type before entering any text, we can
//           // either style the placeholder or hide it. Let's just hide it now.
//           let className = 'RichEditor-editor';
//           var contentState = editorState.getCurrentContent();
//           if (!contentState.hasText()) {
//             if (contentState.getBlockMap().first().getType() !== 'unstyled') {
//               className += ' RichEditor-hidePlaceholder';
//             }
//           }

//           return (
//             <div className="RichEditor-root">
//               <BlockStyleControls
//                 editorState={editorState}
//                 onToggle={this.toggleBlockType}
//               />
//               <InlineStyleControls
//                 editorState={editorState}
//                 onToggle={this.toggleInlineStyle}
//               />
//               <div className={className} onClick={this.focus}>
//                 <Editor
//                   blockStyleFn={getBlockStyle}
//                   customStyleMap={styleMap}
//                   editorState={editorState}
//                   handleKeyCommand={this.handleKeyCommand}
//                   onChange={this.onChange}
//                   onTab={this.onTab}
//                   placeholder="Tell a story..."
//                   ref="editor"
//                   spellCheck={true}
//                 />
//               </div>
//             </div>
//           );
//         }
//       }

//       // Custom overrides for "code" style.
//       const styleMap = {
//         CODE: {
//           backgroundColor: 'rgba(0, 0, 0, 0.05)',
//           fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
//           fontSize: 16,
//           padding: 2,
//         },
//       };

//       function getBlockStyle(block) {
//         switch (block.getType()) {
//           case 'blockquote': return 'RichEditor-blockquote';
//           default: return null;
//         }
//       }

//       class StyleButton extends React.Component {
//         constructor() {
//           super();
//           this.onToggle = (e) => {
//             e.preventDefault();
//             this.props.onToggle(this.props.style);
//           };
//         }

//         render() {
//           let className = 'RichEditor-styleButton';
//           if (this.props.active) {
//             className += ' RichEditor-activeButton';
//           }

//           return (
//             <span className={className} onMouseDown={this.onToggle}>
//               {this.props.label}
//             </span>
//           );
//         }
//       }

//       const BLOCK_TYPES = [
//         {label: 'H1', style: 'header-one'},
//         {label: 'H2', style: 'header-two'},
//         {label: 'H3', style: 'header-three'},
//         {label: 'H4', style: 'header-four'},
//         {label: 'H5', style: 'header-five'},
//         {label: 'H6', style: 'header-six'},
//         {label: 'Blockquote', style: 'blockquote'},
//         {label: 'UL', style: 'unordered-list-item'},
//         {label: 'OL', style: 'ordered-list-item'},
//         {label: 'Code Block', style: 'code-block'},
//       ];

//       const BlockStyleControls = (props) => {
//         const {editorState} = props;
//         const selection = editorState.getSelection();
//         const blockType = editorState
//           .getCurrentContent()
//           .getBlockForKey(selection.getStartKey())
//           .getType();

//         return (
//           <div className="RichEditor-controls">
//             {BLOCK_TYPES.map((type) =>
//               <StyleButton
//                 key={type.label}
//                 active={type.style === blockType}
//                 label={type.label}
//                 onToggle={props.onToggle}
//                 style={type.style}
//               />
//             )}
//           </div>
//         );
//       };

//       var INLINE_STYLES = [
//         {label: 'Bold', style: 'BOLD'},
//         {label: 'Italic', style: 'ITALIC'},
//         {label: 'Underline', style: 'UNDERLINE'},
//         {label: 'Monospace', style: 'CODE'},
//       ];

//       const InlineStyleControls = (props) => {
//         var currentStyle = props.editorState.getCurrentInlineStyle();
//         return (
//           <div className="RichEditor-controls">
//             {INLINE_STYLES.map(type =>
//               <StyleButton
//                 key={type.label}
//                 active={currentStyle.has(type.style)}
//                 label={type.label}
//                 onToggle={props.onToggle}
//                 style={type.style}
//               />
//             )}
//           </div>
//         );
//       };


export default class view extends React.Component {
        constructor(props) {
          super(props);

          const decorator = new CompositeDecorator([
            {
              strategy: findLinkEntities,
              component: Link,
            },
            {
              strategy: findImageEntities,
              component: Image,
            },
          ]);

          const sampleMarkup =
            '<b>Bold text</b>, <i>Italic text</i><br/ ><br />' +
            '<a href="http://www.facebook.com">Example link</a><br /><br/ >' +
            '<img src="image.png" height="112" width="200" />';

          const blocksFromHTML = convertFromHTML(sampleMarkup);
          const state = ContentState.createFromBlockArray(
            blocksFromHTML.contentBlocks,
            blocksFromHTML.entityMap,
          );

          this.state = {
            editorState: EditorState.createWithContent(
              state,
              decorator,
            ),
          };

          this.focus = () => this.refs.editor.focus();
          this.onChange = (editorState) => this.setState({editorState});
          this.logState = () => {
            const content = this.state.editorState.getCurrentContent();
            console.log(content)
            console.log(convertToRaw(content));
          };
        }

        render() {
          return (
            <div style={styles.root}>
              <div style={{marginBottom: 10}}>
                Sample HTML converted into Draft content state
              </div>
              <div style={styles.editor} onClick={this.focus}>
                <Editor
                  editorState={this.state.editorState}
                  onChange={this.onChange}
                  ref="editor"
                />
              </div>
              <input
                onClick={this.logState}
                style={styles.button}
                type="button"
                value="Log State"
              />
            </div>
          );
        }
      }

      function findLinkEntities(contentBlock, callback, contentState) {
        contentBlock.findEntityRanges(
          (character) => {
            const entityKey = character.getEntity();
            return (
              entityKey !== null &&
              contentState.getEntity(entityKey).getType() === 'LINK'
            );
          },
          callback
        );
      }

      const Link = (props) => {
        const {url} = props.contentState.getEntity(props.entityKey).getData();
        return (
          <a href={url} style={styles.link}>
            {props.children}
          </a>
        );
      };

      function findImageEntities(contentBlock, callback, contentState) {
        contentBlock.findEntityRanges(
          (character) => {
            const entityKey = character.getEntity();
            return (
              entityKey !== null &&
              contentState.getEntity(entityKey).getType() === 'IMAGE'
            );
          },
          callback
        );
      }

      const Image = (props) => {
        const {
          height,
          src,
          width,
        } = props.contentState.getEntity(props.entityKey).getData();

        return (
          <img src={src} height={height} width={width} />
        );
      };

      const styles = {
        root: {
          fontFamily: '\'Helvetica\', sans-serif',
          padding: 20,
          width: 600,
        },
        editor: {
          border: '1px solid #ccc',
          cursor: 'text',
          minHeight: 80,
          padding: 10,
        },
        button: {
          marginTop: 10,
          textAlign: 'center',
        },
      };