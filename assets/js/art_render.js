$(function(){
  var layer = layui.layer;
  var form = layui.form;

  // 初始化富文本编辑器
   initEditor()

  getGenericName()
  // 动态获取分类名
  function getGenericName(){
    $.ajax({
      method: 'GET',
      url:'/my/article/cates',
      success: function(res){
        
        if(res.status !==0){
          return layer.msg(res.message)
        }
        const dataText=template('generic-name',res)
        $('.select').html(dataText)
        form.render()
      }
    })
  }


  // 1. 初始化图片裁剪器 
  var $image = $('#image') 
  // 2. 裁剪选项 
  var options = { aspectRatio: 400 / 280, preview: '.img-preview' }
  // 3. 初始化裁剪区域 
  $image.cropper(options)

  // 如下操作的是上传文件的功能功能
  $('#checkImg').on('click',function(){
    $('#coverFile').click()
  })

  // 更换裁剪的图片
  $('#coverFile').on("change",function(e){
    var file = e.target.files[0]
    var newImgURL = URL.createObjectURL(file)
    $image .cropper('destroy')
    .attr('src', newImgURL)
    .cropper(options) 
  })

})