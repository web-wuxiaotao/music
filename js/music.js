$(document).ready(function(){
	//////////////////////////////////////
	//显示效果
	var page=$(".page")
	var ric=$(".ric")
	var lists=$(".lists")
	var li=$(".header .roll li")
	var startPosY;
	var startPosX
	$("body").on("touchstart",".ric",function(e){
		startPosY=e.originalEvent.changedTouches[0].clientY;
		startPosX=e.originalEvent.changedTouches[0].clientX;
	})
	$("body").on("touchend",".ric",function(e){
		var p=e.originalEvent.changedTouches[0].clientY;
		var q=e.originalEvent.changedTouches[0].clientX;
		if(p - startPosY < -50){
			page.removeClass("pagetwo")
			ric.removeClass("rictwo")
			page.addClass("page-none")
			ric.addClass("ric-hide")
		}
		if(p - startPosY > 50){
			if(page.hasClass("page-none")){
				page.addClass("pagetwo")
				page.delay(1000).removeClass("page-none")
				ric.addClass("rictwo")
				ric.delay(1000).removeClass("ric-hide")
			}else{
				return
			}
			
		}
		if(q - startPosX < -50){
			lists.removeClass("listsone")
			lists.addClass("liststwo")
			li.removeClass("li")
			$(".header .roll li:nth-child(2)").addClass("li")
		}
	})
	lists.on("touchstart",function(e){
		startPosX=e.originalEvent.changedTouches[0].clientX;
	})
	lists.on("touchend",function(e){
		var p=e.originalEvent.changedTouches[0].clientX;
		if(p - startPosX > 50){
			lists.addClass("listsone")
			lists.removeClass(("liststwo"))
			li.removeClass("li")
			$(".header .roll li:nth-child(1)").addClass("li")
		}
	})
	
	
	//////////////////////////////////////////
	//	音量条显示
	var mus=$(".mus")
	var volume=$(".header .volume")
	$("body").on("click",".img",function(){
		if(volume.hasClass("show")){
			volume.removeClass("show")
		}else{
			volume.addClass("show")
		}
	})
	
	//////////////////////////////////////////////////////
	//生成歌单
	var currentIndex=0;
	var musics=[
		{
			name:'克卜勒',
			singer:'孙燕姿',
			back:'img/sunyanzi.jpg',
			src:'music/孙燕姿 - 克卜勒.mp3'
		},
		{
			name:'木槿花',
			singer:'袁泉',
			back:'img/yuanquan.jpg',
			src:'music/袁泉 - 木槿花.mp3'
		},
		{
			name:'所有下雨天',
			singer:'薛凯琪',
			back:'img/xuekaiqi.jpg',
			src:'music/薛凯琪 - 所有下雨天.mp3'
		},
		{
			name:'寂寞沙洲冷',
			singer:'周传雄',
			back:'img/zhouchuanxiong.jpg',
			src:'music/周传雄 - 寂寞沙洲冷.mp3'
		},
		{
			name:'若不是那次夜空',
			singer:'周笔畅',
			back:'img/zhoubichang.JPG',
			src:'music/周笔畅 - 若不是那次夜空.mp3'
		},
		{
			name:'黄昏晓',
			singer:'王心凌',
			back:'img/wangxinling.jpg',
			src:'music/王心凌 - 黄昏晓.mp3'
		},
	]
	function render(){
		$("#lists").empty();
		$.each(musics,function(i,v){
			var c=(i===currentIndex) ? "playnow" : "";
			$("<li  class='"+c+"'><div class='name'>"+v.name+"</div><div class='singer'>"+v.singer+"</div></li>").appendTo("#lists")
		})
	
	}
	$("#lists").on("click","li",function(){
    	$("#lists").find("li").removeClass("playnow");
    	$(this).addClass("playnow");
    	currentIndex=$(this).index();
    	audio.src=musics[currentIndex].src;
    	audio.play();
    })
    render();
    
    
    
    ///////////////////////////////
    
    
    
    
    
    //切歌
    var back=$(".back")
    var name=$(".page .name")
    var singer=$(".page .singer")
    $("#lists").on("touchend","li",function(){
    	var index=$(this).index();
    	currentIndex=index;
    	audio.src=musics[currentIndex].src;
    	render();
    	lists.addClass("listsone")
		lists.removeClass(("liststwo"))
		li.removeClass("li")
		$(".header .roll li:nth-child(1)").addClass("li")
		name.html(musics[currentIndex].name)
		singer.html(musics[currentIndex].singer)
		fun()
    })
    
    //下一首
    function next(){
    	currentIndex += 1;
    	if(currentIndex===musics.length){
    		currentIndex=0;
    	}
    	name.html(musics[currentIndex].name)
		singer.html(musics[currentIndex].singer)
    	audio.src=musics[currentIndex].src;
    	render();
    	audio.play()
    	fun()
    }
    
    function fun(){
    	play.find("img").removeClass("block")
		play.find("img:last-child").addClass("block")
		playtwo.find(".play").hide()
		playtwo.find(".pause").addClass("pausetwo")
		playtwo.find(".opa").addClass("opacity")
		back.attr({src:musics[currentIndex].back})
		$("#lists").find("li").removeClass("playnow");
	    $("#lists li").eq(currentIndex).addClass("playnow");
	    mus.addClass("music")
    }
    //上一首
    function last(){
    	currentIndex-=1;
    	if(currentIndex===-1){
    		currentIndex=musics.length-1;
    	}
    	audio.src=musics[currentIndex].src;
    	console.log(currentIndex)
    	name.html(musics[currentIndex].name)
		singer.html(musics[currentIndex].singer)
    	render();
    	audio.play()
    	fun()
    }
    $(".page-next").on("touchend" , next);
    $(".page-last").on("touchend" , last);
    
    
    /////////////////////////////////
    //播放与暂停
    var audio=$("audio")[0]
    var play=$(".page-play")
    var playtwo=$(".page .plays")
    var before=$(".before")
    var progress=$(".page .plays .progress")
    var mus=$(".mus")
    play.on("click",function(){
		if(audio.paused){
			audio.play()
			play.find("img").removeClass("block")
			play.find("img:last-child").addClass("block")
			playtwo.find(".play").hide()
			playtwo.find(".pause").addClass("pausetwo")
			playtwo.find(".opa").addClass("opacity")
			mus.addClass("music")
		}else{
			audio.pause()
			play.find("img").removeClass("block")
			play.find("img:first-child").addClass("block")
			playtwo.find(".play").show()
			playtwo.find(".pause").removeClass("pausetwo")
			playtwo.find(".opa").removeClass("opacity")
			mus.removeClass("music")
		}
		
   })
    playtwo.on("click",function(){
		if(audio.paused){
			audio.play()
			play.find("img").removeClass("block")
			play.find("img:last-child").addClass("block")
			playtwo.find(".play").hide()
			playtwo.find(".pause").addClass("pausetwo")
			playtwo.find(".opa").addClass("opacity")
			mus.addClass("music")
		}else{
			audio.pause()
			play.find("img").removeClass("block")
			play.find("img:first-child").addClass("block")
			playtwo.find(".play").show()
			playtwo.find(".pause").removeClass("pausetwo")
			playtwo.find(".opa").removeClass("opacity")
			mus.removeClass("music")
		}
		
   })
    
    
    
    //////////////////////////
    //时间
    function format(v){
		v=Math.floor (v);
		var s = v % 60;
		s=(s<10)?("0"+s):s;
		var m=Math.floor(v/60);
		return m + ":" + s;
	}
    
    
    //音乐进度条
    var f_progress=$(".footer-progress")
    var current=$(".current")
    var duration=$(".duration")
    var circle=$(".footer-progress .circle")
	$(f_progress).on("touchend",function(e){
		audio.currentTime=(e.originalEvent.changedTouches[0].clientX - f_progress.offset().left) / f_progress.width() * audio.duration;
	})
	
	
	$(audio).on("canplay",function(){
		duration.html(format(audio.duration));
	})
	
	

	$(audio).on("timeupdate",function(){
		current.html(format(audio.currentTime));
		var width=f_progress.width() * audio.currentTime / audio.duration
		var left=f_progress.width() * audio.currentTime / audio.duration 
		- before.width() / 2;
		before.css('left',left);
		circle.css("width",width)
	})
	
	
	//进度拖拽
	$(before).on("touchend",false)
	$(before).on('touchstart',function(e){
		var r=before.width()/2;
		var start=r-e.originalEvent.changedTouches[0].clientX + before.offset().left;
		$(document).on('touchmove',function(e){
			var left=e.originalEvent.changedTouches[0].clientX - f_progress.offset().left + start;
			var c=left / f_progress.width() * audio.duration;
			if(c>=audio.duration||c<=0){
				return;
			}
			audio.currentTime=c;
		})
		return false;
	})

	$(document).on('touchend',function(){
		$(document).off('touchmove');
	})
	
	//音量
	var squ=$(".volume .length .squ")
	var vol=$(".volume")
	var mute=$(".mute")
	var len=$(".length")
	squ.on("touchend",false)
	len.on("touchend",function(e){
		audio.volume = (e.originalEvent.changedTouches[0].clientY - len.offset().top) / (len.height())
		mute.removeAttr("data-v");
		mute.find(".one").show()
		mute.find(".two").hide()
	})
	mute.on("touchend",function(){
		if($(this).attr('data-v')) {
			audio.volume = this.getAttribute('data-v')
			$(this).removeAttr('data-v')
			mute.find(".one").show()
			mute.find(".two").hide()
		} else {
			$(this).attr('data-v', audio.volume)
			audio.volume = 0
			mute.find(".one").hide()
			mute.find(".two").show()
		}
		return false
	})
	
	
	$(audio).on('volumechange',function(){
		var top=len.height()* audio.volume-squ.height()/2
		squ.css('top',top);
	})
	
	
	
	//音量拖拽
	$(squ).on('touchend', false);
	$(squ).on('touchstart',function(e){
		var r=squ.height()/2;
		var start=r-e.originalEvent.changedTouches[0].clientY + squ.offset().top
		$(document).on('touchmove',function(e){
			var m=e.originalEvent.changedTouches[0].clientY;
			var top=m-len.offset().top+start;
			var v=top/len.height();
			if(v>1||v<0){
				return;
			}
			if(v>0&&v<=1){
				mute.removeAttr("data-v");
				mute.find(".one").show()
				mute.find(".two").hide()
			}else if(v===0){
				mute.attr('data-v', audio.volume)
				mute.find(".one").show()
				mute.find(".two").hide()
			}
			audio.volume=v;
		})
		return false;
	})

	$(document).on('touchend',function(){
		$(document).off('touchmove');
	})
})




















