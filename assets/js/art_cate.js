

$(function() {
  var layer = layui.layer;
  var form = layui.form;
  var index;
  initArticleList()

  // 获取数据渲染页面
  function initArticleList(){
    $.ajax({
      method: "GET",
      url:'/my/article/cates',
      success: function(res){
     
        if(res.status !==0){
          return layer.msg(res.message);
        }
        
        const dataText=template('datalist',res)
        $('tbody').html(dataText)
      }
    })
  }

  // 添加类别按钮点击样式---弹窗显示
  $('#btnAdd').on('click',function(){
    index=layer.open({
      type:1,
      title: '添加文章分类',
      area: ['500px', '250px']
      ,content: $('#btnAddHtml').html(),
    }); 
  })

  // 如下是添加按钮的提交事件
  $('body').on("submit",'#add-form',function(e){
      e.preventDefault();
      e.stopPropagation();
      $.ajax({
        method: 'POST',
        url:"/my/article/addcates",
        data:$(this).serialize(),
        success: function(res){
          if(res.status !==0){
           return layer.msg(res.message)
          }
          layer.msg(res.message)
          layer.close(index)
          initArticleList()
        }
      })
  })

  // 点击编辑以后的样式
  $('body').on('click','.btn-edit',function(){
    index=layer.open({
      type:1,
      title: '修改文章分类',
      area: ['500px', '250px']
      ,content: $('#btnEditHtml').html(),
    }); 
    const id=$(this).attr('data-id');
    $.ajax({
      method: 'GET',
      url:'/my/article/cates/'+id,
      success: function(res){
        if(res.status !==0){
          return layer.msg(res.message)
        }
        form.val('editForm',res.data)
      }
    })
    $('#reset').on('click',function(){
      $.ajax({
        method: 'GET',
        url:'/my/article/cates/'+id,
        success: function(res){
          if(res.status !==0){
            return layer.msg(res.message)
          }
          form.val('editForm',res.data)
        }
      })
    })
  })
  
  // 如下是编辑以后提交的事件
  $('body').on('submit','#edit-form', function(e){
     e.preventDefault();
      $.ajax({
        method: 'POST',
        url:"/my/article/updatecate",
        data:$(this).serialize(),
        success: function(res){
          if(res.status !==0){
          return layer.msg(res.message)
          }
          layer.msg(res.message)
          layer.close(index)
          initArticleList()
        }
      })
  })

  // 如下是删除事件
  $('body').on('click','.btn-delete',function(){
    const id=$(this).attr('data-id')
    $.ajax({
      method:'GET', 
      url:'/my/article/deletecate/'+id, 
      success: function(res){
        if(res.status !==0){
          return layer.msg(res.message)
        }
        layer.msg(res.message)
        initArticleList()
      }
    })
  })

})