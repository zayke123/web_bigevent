$(function(){
  var form = layui.form;
  var layer = layui.layer;
  //如下是去注册的点击事件 
  $('.toRegister').on('click', function(){
    $('.login').hide();
    $('.register').show();
  })

  //如下是去登录的点击事件
  $('.toLogin').on('click', function(){
    $('.login').show();
    $('.register').hide();
  })

  //如下的是注册事件
  $('.register .layui-form').on('submit',function(e){
    e.preventDefault();
    const name=$('.register [name="username"]').val()
    const pwd=$('.register [name="password"]').val()
    $.post('/api/reguser',
    {username:name,password:pwd},function(res){
      console.log(res);
      if(res.status !==0) {
        return layer.msg(res.message)
      }
      $('.register .layui-form')[0].reset()
      layer.msg('注册成功')
      setTimeout(function(){
        $('.toLogin').click()
      },2000)
      
    })
    
  })

  //如下是登录的事件
  $('.login .layui-form').on('submit',function(e){
    e.preventDefault();
    const aaa=$(this).serialize();
    console.log(aaa);
    const name=$('.login [name="username"]').val()
    const pwd=$('.login [name="password"]').val()
    $.post('/api/login',
    aaa,function(res){
      console.log(res);
      if(res.status !==0) {
        return layer.msg('用户名或者密码出现错误，'+res.message)
      }

      $('.login .layui-form')[0].reset()
      layer.msg('登陆成功')
      localStorage.setItem('token',res.token)
      location.href='index.html'
    })
    
  })

  //from 表单的验证规则
  form.verify({
    pwd: [
      /^[\S]{6,12}$/
      ,'密码必须6到12位，且不能出现空格'
    ] ,
    repwd:function(value){
     const pwd= $('.register [name="repassword"]').val()
      if(pwd !==value){return  '两次结果不一样'}
    }
  })

 

})