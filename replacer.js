
var create_new_video = function(width, height, video_src, link_src){
    var newVideo = document.createElement("iframe");
    newVideo.height = height;
    newVideo.width = width;
    newVideo.src = video_src;
    newVideo.frameBorder = "0";

    var newLink = document.createElement("a")
    newLink.innerHTML = "*";
    newLink.href = link_src; 
    newLink.target = "_blank";

    return newVideo.outerHTML + newLink.outerHTML;
}

var replace_object = function(o){
    if (o.x_html5_to_video == 'yes'){
        return;
    }
    var src = o.data;
    var type = o.type;
    if (o.getElementsByTagName("embed").length > 0) {
        var e = o.getElementsByTagName("embed")[0];
        src = e.src;
        type = e.type;
    }
    //console.debug(o);
    //console.debug(src);
    if (type == 'application/x-shockwave-flash'){
        //console.debug('maybe video');
        var iframe_src, link_src;
        if (src.search("http://(www\.)?youtube.com/v/") == 0) {
            //console.debug('yourtube');
            iframe_src = src.replace(/youtube.com\/v\/([\w-]+)([^\"\']*)/, "youtube.com/embed/$1");
            link_src = src.replace("?", "&").replace("youtube.com/v/", "youtube.com/watch?v=");
        } else if (src.search('http://vimeo.com') == 0) {
            //console.debug('vimeo');
            var clip_id = src.replace(/http:\/\/.*clip_id=(\d+).*/, '$1')
            iframe_src = 'http://player.vimeo.com/video/' + clip_id;
            link_src = 'http://vimeo.com/' + clip_id;
        }
        if (iframe_src && link_src) {
        //console.debug("try replace");
            o.outerHTML = create_new_video(
                o.width, o.height,
                iframe_src,
                link_src
            );
        }
    } else {
        //console.debug('ingore');
        o.x_html5_to_video = 'yes';
    }
}

var do_replace = function(scope, why){
    if (scope != document && scope.nodeType != 1) {
    //    console.debug('ignore scope');
     //   console.debug(scope);
        return
    }
    //console.debug(why);
    if (scope.tagName == "OBJECT") {
        replace_object(scope);
        return;
    }
    if (scope.tagName == "EMBED" && scope.parentNode) {
        replace_object(scope.parentNode);
        return;
    }

    var objects = scope.getElementsByTagName("object");
    for (var i = 0; i < objects.length; ++i) {
        //console.debug(why);
        replace_object(objects[i]);
    }
}

document.addEventListener("DOMNodeInserted", function(event){ 
    do_replace(event.target, 'bind');
});
do_replace(document, 'doc');
