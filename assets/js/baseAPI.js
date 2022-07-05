

$.ajaxPrefilter(function (options) {
  // 配置路径
  options.url='http://www.liulongbin.top:3007'+options.url

  // 身份认证的样式
  if(options.url.indexOf('/my') !==-1){
      options.headers={
        Authorization: localStorage.getItem('token') ||''
      }
  }

  // 权限认证
  options.complete=function(res){
    if(res.responseJSON.status ===1 && res.responseJSON.message==="身份认证失败！"){
      localStorage.removeItem('token');
      location.href='login.html'
    }
  }
})