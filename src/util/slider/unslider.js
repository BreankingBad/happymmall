(function(a,b){var c=function(){function d(b,d){"dot"==b?(d='<ol class="dots">',a.each(c.li,function(a){d+='<li class="'+(a==c.i?b+" active":b)+'">'+ ++a+"</li>"}),d+="</ol>"):(d='<div class="',d=d+b+'s">'+d+b+' prev">'+c.o.prev+"</div>"+d+b+' next">'+c.o.next+"</div></div>"),c.el.addClass("has-"+b+"s").append(d).find("."+b).click(function(){var b=a(this);b.hasClass("dot")?c.stop().to(b.index()):b.hasClass("prev")?c.prev():c.next()})}var c=this;c.o={speed:500,delay:3e3,init:0,pause:!b,loop:!b,keys:b,dots:b,arrows:b,prev:"\u2190",next:"\u2192",fluid:b,complete:b,items:">ul",item:">li"},c.init=function(b,e){c.o=a.extend(c.o,e),c.el=b,c.ul=b.find(c.o.items),c.max=[0|b.outerWidth(),0|b.outerHeight()],c.li=c.ul.find(c.o.item).each(function(){var d=a(this),e=d.outerWidth(),f=d.outerHeight();e>c.max[0]&&(c.max[0]=e),f>c.max[1]&&(c.max[1]=f)});var e=c.o,f=c.ul,g=c.li,h=g.length;return c.i=0,b.css({width:c.max[0],height:g.first().outerHeight(),overflow:"hidden"}),f.css({position:"relative",left:0,width:100*h+"%"}),g.css({"float":"left",width:100/h+"%"}),setTimeout(function(){0|e.delay&&(c.play(),e.pause&&b.on("mouseover mouseout",function(a){c.stop(),"mouseout"==a.type&&c.play()}))},0|e.init),e.keys&&a(document).keydown(function(a){var b=a.which;37==b?c.prev():39==b?c.next():27==b&&c.stop()}),e.dots&&d("dot"),e.arrows&&d("arrow"),e.fluid&&a(window).resize(function(){c.r&&clearTimeout(c.r),c.r=setTimeout(function(){var a={height:g.eq(c.i).outerHeight()},d=b.outerWidth();f.css(a),a.width=Math.min(Math.round(100*(d/b.parent().width())),100)+"%",b.css(a)},50)}).resize(),(a.event.special.swipe||a.Event("swipe"))&&b.on("swipeleft swiperight swipeLeft swipeRight",function(a){"swipeleft"==a.type.toLowerCase()?c.next():c.prev()}),c},c.to=function(d,e){var f=c.o,g=c.el,h=c.ul,i=c.li,k=(c.i,i.eq(d));if(k.length&&!(0>d)||f.loop!=b){k.length||(d=0),0>d&&(d=i.length-1),k=i.eq(d);var l=e?5:0|f.speed,m={height:k.outerHeight()};h.queue("fx").length||(g.find(".dot").eq(d).addClass("active").siblings().removeClass("active"),g.animate(m,l)&&h.animate(a.extend({left:"-"+d+"00%"},m),l,function(){c.i=d,a.isFunction(f.complete)&&!e&&f.complete(g)}))}},c.play=function(){c.t=setInterval(function(){c.to(c.i+1)},0|c.o.delay)},c.stop=function(){return c.t=clearInterval(c.t),c},c.next=function(){return c.stop().to(c.i+1)},c.prev=function(){return c.stop().to(c.i-1)}};a.fn.unslider=function(b){var d=this.length;return this.each(function(e){var f=a(this),g="unslider"+(d>1?"-"+ ++e:""),h=(new c).init(f,b);f.data(g,h).data("key",g)})}})(jQuery,!1);