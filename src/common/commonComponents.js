
var React = require('react/react');
var bootstrap = require('react-bootstrap');
var Button = bootstrap.Button;
var $ = require('../js/jquery-1.11.1.min.js');

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

var UploadFile = React.createClass({

  getInitialState : function() {
    return {
      picUrl : this.props.data.picUrl
    };
  },

  handleUpload : function() {
    $("#fileToUpload").val("");
    $("#fileToUpload").trigger("click");
  },

  handleUploadSuccess : function(data) {
    this.setState({picUrl: data.zoomImageUrl});
    this.props.data.handleSuccess(data);
  },

  checkType : function(obj,flag) {
    var isTrue = null;
    var hz = obj.replace(/.+\./, "");
    hz = hz.toUpperCase();
    if (obj.length > 0) {
      if(flag==1){
        if ("JPG"==hz || "JPEG"==hz ||"BMP"==hz || "TIFF"==hz ||"GIF"==hz || "PNG" == hz) {
          isTrue = true;
        } else {
          alert("上传文件不匹配，上传失败...");
          isTrue = false;
        }
      }else if(flag==2){
        if ("mp3"==hz || "MP3"==hz) {
          isTrue = true;
        } else {
         alert("上传文件不匹配，上传失败..." );
          isTrue = false;
        }
      }else if(flag==3){
        if ("mp4"==hz || "MP4"==hz) {
          isTrue = true;
        } else {
          alert("上传文件不匹配，上传失败..." );
          isTrue = false;
        }
      }
    } else {
      isTrue = false;
    }
    return isTrue;
  },

  componentDidMount : function() {
    var _this = this;
    var percentComplete;
    var uploadFile = function() {
      var fd = new FormData();
      fd.append("fileToUpload", document.getElementById('fileToUpload').files[0]);
      var xhr = new XMLHttpRequest();
      xhr.upload.addEventListener("progress", uploadProgress, false);
      xhr.addEventListener("load", uploadComplete, false);
      xhr.addEventListener("error", uploadFailed, false);
      xhr.addEventListener("abort", uploadCanceled, false);
      xhr.open("post", _this.props.data.postUrl, true);
      xhr.send(fd);
    };

    var uploadProgress = function(evt) {
      var done = evt.position || evt.loaded;
      var total = evt.totalSize || evt.total;
      if (evt.lengthComputable) {
        percentComplete = Math.round(done / total * 100) + "%";
        $("#progressNumber").show();
        $("#progressNumber").text(percentComplete);
      }
      else {
        document.getElementById('progressNumber').innerHTML = 'unable to compute';
      }
    };

    var uploadComplete = function(evt) {
      /* This event is raised when the server send back a response */
      if($("#progressNumber").text() === "100%") {
        $("#progressNumber").hide();
      }
      var responseText = JSON.parse(evt.target.responseText);
      var originalPath = responseText.originalImagePath || responseText.originalFilePath;
      var zoomUrl = responseText.zoomImageUrl || "";

      var type = zoomUrl ? "image" : "file";

      _this.handleUploadSuccess(responseText);
    };

    var uploadFailed = function(evt) {
      alert("There was an error attempting to upload the file.");
    };
    var uploadCanceled = function(evt) {
      alert("The upload has been canceled by the user or the browser dropped the connection.");
    };
    var fileSelected = function() {
      percentComplete = 0;
      $("#fileToUpload").val("");
      $("#fileToUpload").trigger("click");
    };

    $("#fileToUpload").change(function() {
      uploadFile();
    });
  },


  render : function () {
    return (
      <div>
        <img src={this.state.picUrl}/>
        <Button onClick={this.handleUpload}>{this.props.data.buttonName}</Button>
        <span id="hide-upload-div">
        <input type="file" name="fileToUpload" id="fileToUpload" style={{display:"none"}} ></input>
        </span>
        <span id='progressNumber'></span>
      </div>
    );
  }
});

commonComponents.OneLine = OneLine;
commonComponents.UploadFile = UploadFile;
module.exports = commonComponents;
