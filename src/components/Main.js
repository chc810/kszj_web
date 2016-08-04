require('normalize.css/normalize.css');
require('styles/App.css');
require('styles/bootstrap.min.css');
var React = require('react/react');
var bootstrap = require('react-bootstrap');
var $ = require('../js/jquery-1.11.1.min.js');

//声明bootstrap组件
var Button = bootstrap.Button;
var Tabs = bootstrap.Tabs;

var yeomanImage = require('../images/yeoman.png');
// var ButtonToolbar = bootstrap.ButtonToolbar;
var AppComponent = React.createClass({
  render : function(){
    return (
      <div className="index">
        <img src={yeomanImage} alt="Yeoman Generator" />
        <Button bsStyle="primary">Primaryddsas</Button>
        <div className="notice">Please edit <code>src/components/Main.js12121eee</code> to get started!123</div>
      </div>
    );
  }
});

export default AppComponent;
