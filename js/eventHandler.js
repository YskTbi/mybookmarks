$(function(){
    /**スライドメニューの動作**/
    $('#slide').on('click', function() {
        $(this).next().slideToggle(500);
    });

    /**addボタン押下時の動作**/
    $('#add').on('click',function(){
      var name = $('#name').val();
      var url = $('#url').val();
      if(name == '' || name == null || url == '' || name == null ){
        alert("please enter name and url correctly");
        return;
      }
      chrome.storage.local.set({[name]: url}, function() {
      });
      location.reload();
    });

    /**ゴミ箱クリック時の動作**/
    $('#delete').on('click',function() {
      if($('#rumbleOn').length){
          //rumble,stop
          $('.bookmarkList>li>a').trigger('stopRumble');
          //favicon再習得
          $('.bookmarkList').children('li').each(function(){
              $('img',this).attr('src','http://www.google.com/s2/favicons?domain=' + ($('a',this).attr('href').split('/')[2]))
                           .removeAttr('id');
          });
          //削除制御
          $('.bookmarkList').removeAttr('id');
      } else{
          //分岐条件となるid付与
          $('.bookmarkList').attr('id','rumbleOn');
          //faviconを削除アイコンへ変換
          $('.bookmarkList>li>img').attr('src','img/delete.png')
                                   .attr('id','execute');
          //rumble,start
          $('.bookmarkList>li>a')
              .jrumble({ x:1, y:1, rotation:1,speed:75 })
              .trigger('startRumble');
      }
    });

    /**削除実行**/
    $(document).on('click','#execute',function() {
        var key = $('a', $(this).parent()).text();
        chrome.storage.local.remove(key,function(){
            console.log("remove");
        });
        $(this).parent().fadeOut('fast').queue(function(){
          this.remove();
        });
    });
});
