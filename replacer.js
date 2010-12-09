
var create_new_video = function(width, height, video_src, link_src){
    var newVideo = document.createElement("iframe");
    newVideo.height = height;
    newVideo.width = width;
    newVideo.src = video_src;

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
    if (type = 'application/x-shockwave-flash' && src.search("http://(www\.)?youtube.com/v/") == 0) {
        o.outerHTML = create_new_video(
            o.width, o.height,
            src.replace(/youtube.com\/v\/(\w+)([^\"\']*)/, "youtube.com/embed/$1"),
            src.replace("?", "&").replace("youtube.com/v/", "youtube.com/watch?v=")
        );
    } else {
        o.x_html5_to_video = 'yes';
    }
}

var do_replace = function(scope){
    if (scope != document && scope.nodeType != 1)
        return
    if (scope.tagName == "OBJECT" || scope.tagName == "EMBED") {
        replace_object(scope);
        return;
    }

    var objects = scope.getElementsByTagName("object");
    for (var i = 0; i < objects.length; ++i) {
        replace_object(objects[i]);
    }
}

document.addEventListener("DOMNodeInserted", function(event){ 
    do_replace(event.target);
});
do_replace(document);
