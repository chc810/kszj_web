
//导入css等资源
require('normalize.css/normalize.css');
require('styles/App.css');
require('styles/bootstrap.min.css');

//导入第三方js库
import 'core-js/fn/object/assign';
import ReactDOM from 'react-dom';
var React = require('react/react');
var bootstrap = require('react-bootstrap');
var $ = require('../js/jquery-1.11.1.min.js');

//导入项目其他js库
var AccountInfoTab = require('./entInfo_account.js');
//声明bootstrap组件
var Button = bootstrap.Button;
var Tabs = bootstrap.Tabs;
var Tab = bootstrap.Tab;



var AppComponent = React.createClass({
	getInitialState : function() {
    return {
      key: 1
    };
  },

  handleSelect : function(key) {
    this.setState({key:key});
  },

  render : function(){
    return (
      <Tabs activeKey={this.state.key} onSelect={this.handleSelect} id="controlled-tab">
	    <Tab eventKey={1} title="账户管理">
        <AccountInfoTab />
      </Tab>
	    <Tab eventKey={2} title="企业信息">Tab 2 content</Tab>
	    <Tab eventKey={3} title="财务流水">Tab 3 content</Tab>
	    <Tab eventKey={4} title="索取发票">Tab 4 content</Tab>
	  </Tabs>
    );
  }
});

ReactDOM.render(<AppComponent />, document.getElementById('app'));
