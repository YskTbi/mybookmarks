$(function() {
    //chrome.storage.local.clear(function(){});
    chrome.storage.local.get(null, function (value) {
    var insertContent = $('<ul>').addClass('bookmarkList');
    for(key in value){
        insertContent.append(
            $('<li/>').attr('id','list').append(
                "<img src='http://www.google.com/s2/favicons?domain="+ (value[key].split('/')[2]) +"'>" + "<a target='_blank' href='" + value[key] + "'>" + [key] + "</a>"));
       $('#content').append(insertContent);
     }
   });
});
