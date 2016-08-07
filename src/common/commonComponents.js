
var React = require('react/react');
var bootstrap = require('react-bootstrap');

var commonComponents = {};

var OneLine = React.createClass({
  render : function () {
    var style = {
      height : "20px",
      borderBottom : "1px solid #ccc",
      marginBottom : "20px"
    };

   return <div style={style}></div>
  }
});

commonComponents.OneLine = OneLine;
module.exports = commonComponents;
