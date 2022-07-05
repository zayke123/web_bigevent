$(function(){
  var form=layui.form
  var layer = layui.layer;

  initUserInfo()

  // 验证规则
  form.verify({
    name:function(value){
      if(value.length >6 ){
        return '用户名称在1-6个字符之间'
      }
    }
  })

  // 获取用户信息
  function initUserInfo() {
    $.ajax({
      method: 'GET',
      url:'/my/userinfo',
      success: function(res){
        // console.log(res);
        if(res.status !==0){
          return layar.msg(res.message);
        }
        form.val('layuiForm',res.data)
      }
    })
  }

  // 重置
  $('#btnReset').on('click',function(e){
    e.preventDefault();
    initUserInfo()
  })

  // 提交
  $('.layui-form').on('submit',function(e){
    e.preventDefault()
    const dataText=$(this).serialize()
    $.ajax({
      method: 'POST',
      url:'/my/userinfo',
      data:dataText,
      success: function(res){
        console.log(res);
        if(res.status !==0){
          return layar.msg(res.message)
        }
        layer.msg(res.message);
       

      window.parent.getUserInfo()
      
      }
    })
  })
})


  