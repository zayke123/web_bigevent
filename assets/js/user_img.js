$(function(){
  var layer = layui.layer;
  // 1.1 获取裁剪区域的 DOM 元素 
  var $image = $('#image') 
  // 1.2 配置选项
   const options = {
      // 纵横比 
      aspectRatio: 1, 
      // 指定预览区域 
      preview: '.img-preview' 
  }
      // 1.3 创建裁剪区域 
      $image.cropper(options)

    // d点击上传的操作
    $('#btnChooseImage').on('click', function(){
      $('#file').click()
    })

    // 更换裁剪图片
    $('#file').on('change', function(e){
      var file = e.target.files[0]

      var newImgURL = URL.createObjectURL(file)

      $image
      .cropper('destroy')
      .attr('src', newImgURL)
      .cropper(options) 
      
    })

    // 确定按钮提交事件
    $('#btnUpload').on('click', function(){
      var dataURL = $image 
      .cropper('getCroppedCanvas', 
      {  width: 100, height: 100 })
      .toDataURL('image/png') 
      // 将 Canvas 画布上的内容，转化为 base64 格式的字符 串
      
      $.ajax({
        method: 'POST',
        url:'/my/update/avatar', 
        data:{
          avatar:dataURL
        },
        success: function(res){
          if(res.status !==0){
            return layer.msg(res.message);
          }
          layer.msg(res.message);
        }
      })
    })
})