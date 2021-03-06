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
var Modal = bootstrap.Modal;
var FormGroup = bootstrap.FormGroup;
var Radio = bootstrap.Radio;
var FormControl = bootstrap.FormControl;
//
var commonComponents = require("../common/commonComponents.js");
var OneLine = commonComponents.OneLine;
var UploadFile = commonComponents.UploadFile;

//按钮后面跟上提示的组件
var ButtonWithTip = React.createClass({
  render : function() {
    var tip = <Tooltip id="ttip">{this.props.tipContent}</Tooltip>;
    return <span>
        <Button bsStyle="default" onClick={this.props.onClick}>{this.props.buttonContent}</Button>
        <OverlayTrigger placement="bottom" overlay={tip}>
          <i className="iconfont">&#xe619;</i>
        </OverlayTrigger>
     </span>;
  }
});

//企业审核按钮组件
var AuthButton  = React.createClass({
  getInitialState : function() {
    return {
      packageType : "0",
      showAuthModal : false
    };
  },

  handleAuthClick : function(e) {
    this.setState({showAuthModal:true});
  },

  closeAuthModal : function() {
    this.setState({showAuthModal:false});
  },

  render : function() {
    return (
      <span>
        {(function(){
          if (this.props.data.authType == "0") {
            return ( <ButtonWithTip tipContent={"升级为认证版后，业务系统永久免费试用。。。"} buttonContent={"企业认证"} onClick={this.handleAuthClick}/>);
          }  else if (this.props.data.authType == "1") {
            return <a onClick={this.handleAuthClick} style={{cursor:"pointer"}}>企业认证审核中</a>;
          } else if (this.props.data.authType == "2") {
            return <a onClick={this.handleAuthClick} style={{cursor:"pointer",color:"red"}}>企业认证审核失败</a>;
          } else if (this.props.data.authType == "3") {
            return <a onClick={this.handleAuthClick} style={{cursor:"pointer"}}>资质信息</a>;
          }
        }.bind(this))()}
        <EntAuth showModal={this.state.showAuthModal} closeModal={this.closeAuthModal}/>
      </span>
    );

  }
});

//操作按钮组
var ControllerButtons = React.createClass({

  getInitialState : function() {
    return {
      showApplyCommercialModal : false
    };
  },
  showApplyCommercialModal  : function() {
    this.setState({showApplyCommercialModal : true});
  },

  closeApplyCommercialModal : function() {
    this.setState({showApplyCommercialModal : false});
  },

  render : function() {
    var ret;
    if (this.props.data.packageType == "0") {
      //试用
      ret = <span>
       <ButtonWithTip tipContent={"商用企业可在,业务系统永久免费试用。。。"} buttonContent={"申请商用"} onClick={this.showApplyCommercialModal}/>
        <ApplyCommercial showModal={this.state.showApplyCommercialModal} closeModal={this.closeApplyCommercialModal}/>
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

//申请商用组件
var ApplyCommercial = React.createClass({

  getInitialState : function() {
    return {
      packageType : "0"
    };
  },

  handlePackageTypeClick : function(e) {
    this.setState({packageType:e.target.value});
  },

  render : function() {
    return (
      <Modal show={this.props.showModal} onHide={this.props.closeModal} backdrop={"static"}>
        <Modal.Header closeButton>
          <Modal.Title>升级为商用用户</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{maxHeight:"700px"}}>
          <FormGroup>
            <Radio name="theRadio" checked={this.state.packageType == "0"} value="0" onChange={this.handlePackageTypeClick}>
              企业版，1万元/年，10个（含10个）坐席以下，赠送百度信誉，超出1个坐席4800/年
            </Radio>

            <Radio name="theRadio" checked={this.state.packageType == "1"} value="1" onChange={this.handlePackageTypeClick}>
              基础版，700元/月/坐席，超出1个坐席700元/月
            </Radio>

            <Radio name="theRadio" checked={this.state.packageType == "2"} value="2" onChange={this.handlePackageTypeClick}>
              标准版，4800元/年/坐席，超出1个坐席4800/年
            </Radio>
          </FormGroup >
          <OneLine/>
          <div className="row-fluid">
            <div className="span2">坐席数：</div>
            <div className="span10"> <FormControl type="number" placeholder="10" /> 个</div>
          </div>
          <div className="row-fluid">
            <div className="span2">开通时长：</div>
            <div className="span10"><FormControl type="number" placeholder="1" /> 年</div>
          </div>
          <OneLine/>
          <h5>费用计算</h5>
          <div className="row-fluid">
            <div className="span2">坐席个数：</div>
            <div className="span10"> 2 个</div>
          </div>
          <div className="row-fluid">
            <div className="span2">开通时长：</div>
            <div className="span10"> 2 年</div>
          </div>
          <div className="row-fluid">
            <div className="span2">总计费用：</div>
            <div className="span10"> ￥ 1333.00 元</div>
          </div>
          <Button>在线支付</Button>
          <Button>取消</Button>
          <OneLine/>
          <div>ddfwer</div>
        </Modal.Body>
      </Modal>);
  }
});

//企业认证组件
var EntAuth = React.createClass({
  Constants : {
    picUrl : null,
    buttonName : "上传文件",
    postUrl : "http://10.130.29.43:8180/upload/WeixinFileUpload",
    handleSuccess : function(data) {
      console.info(data);
    }
  },

  render : function() {
    return (
      <Modal show={this.props.showModal} onHide={this.props.closeModal} backdrop={"static"}>
        <Modal.Header closeButton>
          <Modal.Title>升级为认证用户</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{maxHeight:"700px"}}>
          <div className="row-fluid">
            <div className="span4">公司名称：</div>
            <div className="span8"> <FormControl type="text" placeholder="须和工商注册信息一致" /></div>
          </div>
          <div className="row-fluid">
            <div className="span4">企业经营执照扫描件：</div>
            <div className="span8"><UploadFile data={this.Constants} /></div>
          </div>
          <Button>提交</Button>
          <Button onClick={this.props.closeModal}>取消</Button>
        </Modal.Body>
      </Modal>);
  }

});


//账户信息组件
var AccountInfoTab = React.createClass({
  getInitialState : function() {
      return this.getData();
  },

  getData : function() {
    //TODO ajax获取后台数据
    var ret = {};
    $.ajax({
      url : this.props.constants.appCtx + this.props.constants.entInfoUrl,
      type : "post",
      dataType : "json",
      cache : false,
      data : {},
      async : false, // 同步加载
      success : function(data) {
        if (data.success) {
          var obj = data.obj;
          ret.packageType = obj.packageuse.userType;   //套餐类型
          ret.authType = obj.accrediation;             //认证状态
          ret.startTime = obj.packageuse.createTime;
          ret.endTime = obj.packageuse.expiredTime;
          ret.maxAgentCount = obj.packageuse.ccTotal;
          ret.currentAgentCount = obj.packageuse.ccTotal - obj.packageuse.ccOver;
          ret.consumptionTatol = obj.consumption_total;
          ret.notBill = obj.consumption_total - obj.consumption_bill;
        } else {
          // TODO 查询失败
          alert(data.msg);
        }
      },
      error : function() {
        // TODO 查询失败
        alert("查询企业信息失败！");
      }
    });
    console.info(ret);

    return {
      packageType : "0",      //1: 试用版  2：企业版   3：标准版  4：基础版
      authType : "2",         //0: 未提交资料， 1：审核中，2：审核失败，3：审核成功
      startTime : "2016-09-05",  //套餐开始时间
      endTime : "2016-09-20",    //套餐结束时间
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
