$(function(){
  getUserInfo()

  // 获取页面用户信息
  function getUserInfo(){
    $.ajax({
      method: "GET",
      url:'/my/userinfo', 
      // headers: {
      //   Authorization:localStorage.getItem('token')
      // },
      success: function(res){
      
        if(res.status !==0){
          return layer.msg('获取用户的基本信息')
        }
        
        renderAvatar(res.data)
      }
    })
  }

  // 渲染用户信息
  function renderAvatar(user){
    const name=user.nickname || user.username
    // user.user_pic='./assets/images/sample.jpg'
    $('#welcome').html(name)
    console.log(user.user_pic);
    if( user.user_pic ===null){
      $('.layui-nav-img').hide()
      $('.text-avatar').show()
      const first=name[0].toUpperCase()
      $('.text-avatar').html(first)
    }else{
      $('.text-avatar').hide()
      $('.layui-nav-img').show()
      $('.layui-nav-img').attr('src',user.user_pic)
    }
    
  }

  // 退出按钮的效果
  $('#butlogout').on('click', function(){
    layer.confirm('是否确认退出？', {icon: 3, title:'退出提示'}, function(index){
      
      localStorage.removeItem('token')
      location.href='login.html'
      layer.close(index);
    });
    
  })

})