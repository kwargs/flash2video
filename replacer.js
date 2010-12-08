var embeds = document.getElementsByTagName("embed");
for (var i = 0; i < embeds.length; ++i){
    var e = embeds[i];
    if (e.type == "application/x-shockwave-flash" //maybe too strong?
	&& (e.src.search("http://www.youtube.com/v/") == 0 || e.src.search("http://youtube.com/v/") == 0)
	)
	{
	    var newVideo = document.createElement("iframe");
	    newVideo.height = e.height;
	    newVideo.width = e.width;
	    newVideo.src = e.src.replace(/youtube.com\/v\/(\w+)([^\"\']*)/, "youtube.com/embed/$1");
	    var newLink = document.createElement("a");
	    newLink.innerHTML = "*";
	    newLink.href = e.src.replace("?", "&").replace("youtube.com/v/", "youtube.com/watch?v=");
	    newLink.target = "_blank";
	    var newHTML = newVideo.outerHTML + newLink.outerHTML;
	    //OMG
	    if (e.parentNode.tagName == "OBJECT"){
		e.parentNode.outerHTML = newHTML;
		--i;
	    } else{
		e.outerHTML = newHTML;
	    }
	}
}
