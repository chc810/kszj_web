require('normalize.css/normalize.css');
require('styles/App.css');
require('styles/bootstrap.min.css');
var React = require('react/react');
var bootstrap = require('react-bootstrap');
var $ = require('../js/jquery-1.11.1.min.js');

//声明bootstrap组件
var Tooltip = bootstrap.Tooltip;
var Button = bootstrap.Button;
var OverlayTrigger = bootstrap.OverlayTrigger;

var AccountInfoTab = React.createClass({
  getInitialState : function() {
      return this.getData();
  },

  getData : function() {
    //TODO ajax获取后台数据

    return {
      packageType : "0",
      authType : "0",
      startTime : "2016-09-05",
      endTime : "2016-09-20",
      currentAgentCount : 1,
      maxAgentCount : 10
    };
  },

  render : function(){
    var accountType = this.state.packageType == "0" ? "免费试用版" : this.state.packageType == "1" ? "企业版" : "其他";

    //tip结构
    var toolTip = <Tooltip id="tooltip"> Check this info.</Tooltip>;

    return (
      <div>
        <h5>平台账户</h5>
        <div>当前服务模式：{accountType}
          <OverlayTrigger placement="bottom" overlay={toolTip}>
            <Button bsStyle="default">测试</Button>
          </OverlayTrigger>
        </div>
        <div>开始时间：{this.state.startTime}</div>
        <div>结束时间：{this.state.endTime}</div>
        <div>坐席个数：当前{this.state.currentAgentCount}个/最大{this.state.maxAgentCount}个</div>
      </div>
    );
  }
});

module.exports = AccountInfoTab;
