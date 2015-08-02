/* @flow */
var React = require('react');
var mui = require('material-ui');

var Spinner = require('./spinner.react');
var Code = require('./code.react');
var Footer = require('./footer.react');
var utils = require('../utils');
var ThemeManager = new mui.Styles.ThemeManager();
var Colors = mui.Styles.Colors;
var service = require('../service'); // REWRITE WITH FLUX

type MainState = {
  source: string;
  loading: boolean;
  errors: Array<any>;
  target: string;
  error: string;
}

var Main = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  getInitialState(): MainState {
    return { source: '', loading: false, errors: [], target: '', error: ''};
  },

  componentDidMount() {
    console.log('mounted')
    this.loadByHash(this.props.hash);
  },

  loadByHash(hash: string) {
    service.loadByHash(hash, (err, res) => {
      if (err) {
        this.setState ({ loading: false, error: err});
        this.refs.snackbar.show();
      } else {
        this.setState ({ loading: false, source: res.source, errors: res.errors, target: res.target});
      }
    });
  },

  updateOutput(sourceCode: string) {
    if (sourceCode && sourceCode.length > 0) {
      this.refs.snackbar.show();
      this.setState ({ loading: true});
      service.flowCheck(sourceCode , (err, res) => {
        if (err) {
          this.setState ({ loading: false, error: 'Cannot perform flow check, please report'});
          this.refs.snackbar.show();
        } else {
          this.refs.snackbar.dismiss();
          this.setState ({ loading: false, source: this.state.source, errors: res.errors, target: res.target});
          window.location.hash = res.hash;
        }
      });
    }
  },

  render(): any {

    //var examples = require('../examples.js');
    var examples = [
      {payload: '0101751fa7c5741792c292e31fa8de32', text: '01 - Hello world'},
      {payload: '16703f86fe7507a5145d9e87006eeddd', text: '02 - Dynamic'},
      {payload: '18393dfcb824119d4e35beb9bcc7a48b', text: '03 - Type annotations'},
      {payload: '524323e2bf98148b667b0f8e72e28f2c', text: '04 - Modules'},
      {payload: 'bc1f559bbf4cf06ad317673e3f39dea1', text: '05 - React.js'},
      {payload: '088c0e5b336e2941f081fd7387e2b048', text: '06 - Flow comments'},
      {payload: '9b415a58cae0f6b47b79fd2a28313724', text: '07 - Bounded polymorphism'},
    ];
    // <mui.DropDownMenu menuItems={examples} onChange={this._handleExamples} />
    return (
      <div>

        <mui.Card initiallyExpanded={true}>
          <mui.CardHeader
            title="Gradual typing in Javascript"
            avatar={<mui.Avatar onClick={this._handleTouchTap}>F</mui.Avatar>} showExpandableButton={true}/>
          <mui.CardActions >
            <a href="http://flowtype.org/docs/getting-started.html"><i className="fa fa-2x fa-book mui-font-icon" /></a>
            <a href="https://github.com/unknownexception/tryflow"><i className="fa fa-2x fa-github mui-font-icon" /></a>
          </mui.CardActions>
           <mui.CardText expandable={true}>
             Lorem ipsum dolor sit amet, consectetur adipiscing elit.
             Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
             Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
             Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
           </mui.CardText>
        </mui.Card>

        <div className="raw-code-area">
          <mui.Paper zDepth={5} >
            <Code ref="sourceEditor" source={this.state.source} name="source-editor" onChange={this._onSourceChange} errors={this.state.errors}/>
          </mui.Paper>
        </div>
        <div className="output-area">
          <mui.Paper zDepth={5} >
            <Code ref="target" source={this.state.target} name="target-editor" readOnly="true" />
          </mui.Paper>
        </div>

        <Footer />

        <mui.Snackbar ref="snackbar" message={this.state.loading ? 'Loading.. ' : this.state.error} action={this.state.loading ? '' : 'Got it'}  onActionTouchTap={this._handleSnackbarAction} />

      </div>
    );
  },

  _onSourceChange(value: string) {
    this.setState({source: value});
    // clearTimeout(this.timeout);
    // this.timeout = setTimeout(() => {
    //   this.updateOutput(value);
    // }, 2000);
  },

  _handleTouchTap() {
    this.updateOutput(this.state.source);
  },

  _handleExamples(e: any, key: any, payload: any) {
    window.location.hash = payload.payload;
    this.loadByHash(payload.payload);
  },

  _handleSnackbarAction() {
    this.refs.snackbar.dismiss();
  }

});

module.exports = Main;
