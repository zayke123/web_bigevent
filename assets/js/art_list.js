$(function(){
  var layer = layui.layer;
  var form = layui.form;
  var q={
    pagenum:2,
    pagesize:3, 
    cate_id:'',
    state:''
  }
  getArtList()
  getGenericName()

  // 获取list列表的数据
  function getArtList(){
    $.ajax({
      method:'GET',
      url:'/my/article/list',
      data:q,
      success: function(res){
        console.log(res)
        if(res.status !==0){
          return layer.msg(res.message)
        }
        const dataText=template('data-list',res)
        $('tbody').html(dataText)
        renderPage(res.total)
      }
    })
  }

  // 动态获取分类名
  function getGenericName(){
    $.ajax({
      method: 'GET',
      url:'/my/article/cates',
      success: function(res){
        console.log(res)
        if(res.status !==0){
          return layer.msg(res.message)
        }
        const dataText=template('generic-name',res)
        $('.select').html(dataText)
        form.render()
      }
    })
  }

  // 筛选的点击事件
  $('.layui-form').on('submit',function(){
    q.cate_id=$('[name="fenlei"]').val()
    q.state=$('[name="zhuangtai"]').val()

    getArtList()
  })

  //渲染分页的样式
  function renderPage(total){
    layui.use("laypage", function () {
      var laypage = layui.laypage;

      //执行一个laypage实例
      laypage.render({
        elem: "test1", //注意，这里的 test1 是 ID，不用加 # 号
        count: 30, //数据总数，从服务端得到
        limits:[2, 3, 4, 5, 6],
        curr:q.pagenum,
        limit:q.pagesize,
        layout:['count','limit','prev', 'page', 'next','skip'],
        jump: function(obj, first){
          q.pagenum=obj.curr
          q.pagesize=obj.limit

          if(!first){
            getArtList()
          }
        }
      });
    });
  }
})