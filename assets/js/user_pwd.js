$(function(){
  var form=layui.form
  var layer = layui.layer;

  // 表单验证
  form.verify({
    pwd:[
      /^[\S]{6,12}$/
      ,'密码必须6到12位，且不能出现空格'
    ] ,
    repwd:function(value){
      const pwd=$('#newPwd').val()
      if(pwd !==value){
        return '确认密码和新密码不一致'
      }
    }, 
    samePwd:function(value){
      const pwd=$('#oldPwd').val()
      if(pwd ===value){
        return '新密码不能和旧密码一致'
      }
    }
  })

  // 修改密码
  $('.layui-form').on('submit', function(e){
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url:'/my/updatepwd',
      data:$(this).serialize(),
      success: function(res){
       if(res.status !==0){
        $('.layui-form')[0].reset()
         return layer.msg(res.message)
       }
       layer.msg(res.message)
       $('.layui-form')[0].reset()
      }
    })
  })
})