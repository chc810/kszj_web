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

//按钮后面跟上提示的组件
var ButtonWithTip = React.createClass({
  render : function() {
    var tip = <Tooltip id="ttip">{this.props.tipContent}</Tooltip>;
    return <span>
        <Button bsStyle="default">{this.props.buttonContent}</Button>
        <OverlayTrigger placement="bottom" overlay={tip}>
          <i className="iconfont">&#xe619;</i>
        </OverlayTrigger>
     </span>;
  }
});

//企业审核按钮组件
var AuthButton  = React.createClass({
  render : function() {
    var authContent;
    if (this.props.data.authType == "0") {
      authContent = <ButtonWithTip tipContent={"升级为认证版后，业务系统永久免费试用。。。"} buttonContent={"企业认证"}/>;
    } else if (this.props.data.authType == "1") {
      authContent = <a href="#">企业认证审核中</a>;
    } else if (this.props.data.authType == "2") {
      authContent = <a href="#">企业认证审核失败</a>;
    } else if (this.props.data.authType == "3") {
      authContent = <a href="#">资质信息</a>;
    }
    return authContent;
  }
});

//操作按钮组
var ControllerButtons = React.createClass({
  render : function() {
    var ret;
    if (this.props.data.packageType == "0") {
      //试用
      ret = <span>
       <ButtonWithTip tipContent={"商用企业可在,业务系统永久免费试用。。。"} buttonContent={"申请商用"}/>
        <AuthButton data={this.props.data}/>
      </span>;
    } else {
      //商用
      ret = <span>
        <Button bsStyle="default">续费</Button>
        <a href="#">增加坐席</a>
        <AuthButton data={this.props.data}/>
      </span>;
    }
    return ret;
  }
});

//当前套餐显示组件
var CurrentPackage = React.createClass({
  render : function() {
    var accountType = this.props.data.packageType == "0" ? "免费试用版" : this.props.data.packageType == "1" ? "企业版" : "其他";
    var firstAfter = <span></span>;
    if (this.props.controllerButtons) {
      firstAfter = this.props.controllerButtons;
    }
    return <div>
      <div>当前服务模式：{accountType}
        {firstAfter}
      </div>
      <div>开始时间：{this.props.data.startTime}</div>
      <div>结束时间：{this.props.data.endTime}</div>
      <div>坐席个数：当前{this.props.data.currentAgentCount}个/最大{this.props.data.maxAgentCount}个</div>
    </div>
  }
});

//商用用户信息展现组件
var CommercialAccountInfo = React.createClass({

  render : function () {
    return (
      <div>
        <div>
          <div>消费总额：￥<span style={{color:"red"}}>{this.props.data.consumptionTatol}</span>元<ControllerButtons data={this.props.data}/></div>
          <div>未开发票金额：￥<span style={{color:"red"}}>{this.props.data.notBill}</span>元</div>
        </div>
        <div style={{height:"20px",borderBottom:"1px solid #ccc"}}></div>
        <CurrentPackage data={this.props.data} />
      </div>

    );
  }
});

//试用用户信息展现组件
var TrialAccountInfo = React.createClass({
  render : function () {
    var controllerButtons = <ControllerButtons data={this.props.data}/>;
    return <CurrentPackage data={this.props.data} controllerButtons={controllerButtons}/>;
  }
});



var AccountInfoTab = React.createClass({
  getInitialState : function() {
      return this.getData();
  },

  getData : function() {
    //TODO ajax获取后台数据

    return {
      packageType : "0",
      authType : "3",         //0: 未提交资料， 1：审核中，2：审核失败，3：审核成功
      startTime : "2016-09-05",
      endTime : "2016-09-20",
      currentAgentCount : 1,
      maxAgentCount : 10,
      consumptionTatol : "19600.00",
      notBill : "4000.00"
    };
  },

  render : function(){
    var accont;
    if (this.state.packageType == 0) {
      //试用版
      accont = <TrialAccountInfo data={this.state}/>;
    } else {
      accont = <CommercialAccountInfo data={this.state}/>;
    }

    return (
      <div>
        <h5>平台账户</h5>
        {accont}
      </div>
    );
  }
});

module.exports = AccountInfoTab;
