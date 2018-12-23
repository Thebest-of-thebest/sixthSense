$(function(){

    let indexSwiper = (function(){
        let $banner = $('.banner');//获取banner轮播图容器
        let $swiperItem = $banner.find('div');//获取banner下所有的div
        let $swiperBtn = $banner.find('li');//获取banner下所有的小圆点
        let documentWidth = document.documentElement.clientWidth;//获取文档宽度
        //初始化所有div的默认位置
        init();
        function init() {
            $swiperBtn.each(function(index, item){
                console.log(index,item);
                index > 0 ? $swiperItem.eq(index).css({ '-webkit-transform': 'translateX('+documentWidth+'px)'}) : null;
            });
        }
        //动画
        let prev = 4, index = 0, next = 1; //创建三个变量，分别代表前面一张、当前这张、下一张显示的图片
        let timer = window.setInterval(function(){//创建一个定时器，让它每隔一段事件执行动画
            showNext();
        }, 2000);
        function showNext() {
            prev = index;
            index = next;
            next++;
            if(next>4){
                next = 0;
            }
            //准备好下一张
            $swiperItem.eq(next).css({
                'transition':'none',
                '-webkit-transform': 'translateX('+documentWidth+'px)'
            });

            //给当前需要运动的div加上过渡,并且移动
            $swiperItem.eq(prev).css({
                'transition': 'all 0.3s ease 0s',
                '-webkit-transform': 'translateX('+(-documentWidth)+'px)'
            });
            $swiperItem.eq(index).css({
                'transition': 'all 0.3s ease 0s',
                '-webkit-transform': 'translateX(0px)'
            });
            $swiperBtn.eq(next).removeClass('active');
            $swiperBtn.eq(prev).removeClass('active');
            $swiperBtn.eq(index).addClass('active');
        }
        $banner.swipeLeft(function(){
            clearInterval(timer);//手指触摸到轮播图的那一刻停止定时器
            let direction = 'left';
            touch(direction);
        });
        $banner.swipeRight(function(){
            let direction = 'right';
            touch(direction);
        });
        function touch(direction) {
            //使用原生touch事件得到滑动距离，以及事件
            let startX;//定义触摸开始手指位置
            let startTime;//定义触摸开始时间
            let detailX;//定义手指位置
            let clientX;//滑动时的实时位置
            let distance;//滑动结束手指与滑动开始手指位置的距离
            let timeCha;//滑动结束与滑动开始之间产生的时间（是一个毫秒数）
            let isTouchMove;//判断是否有移动
            $(this)[0].addEventListener('touchstart',function(e){
                if(e.touches.length > 1){//一般我们只做一个手指,判断大于一个手指,我们不做处理
                    timer = window.setInterval(function(){//创建一个定时器，让它每隔一段事件执行动画
                        showNext();
                    }, 2000);
                    return;
                }
                clearInterval(timer);//手指触摸到轮播图的那一刻停止定时器
                //记录偏移量
                detailX = e.touches[0].clientX;
                //手指触摸到轮播图区域,记录手指的位置
                startX = e.touches[0].clientX;
                //移动之前先去掉过渡
                $swiperItem.eq(prev).css('transition','none');
                $swiperItem.eq(index).css('transition','none');
                $swiperItem.eq(next).css('transition','none');
                //记录触摸开始时时间
                startTime = new Date;
            },false);
            $(this)[0].addEventListener('touchmove',function(e){
                isTouchMove = true;
                //移动的时候去除浏览器默认事件
                e.preventDefault();
                if(e.touches.length > 1){//一般我们只做一个手指,判断大于一个手指,我们不做处理
                    return;
                }
                clientX = e.touches[0].clientX;//获取移动时的实时位置
                //触摸跟随
                $swiperItem.eq(prev).css('transform','translateX('+(-documentWidth+clientX-detailX)+'px)');
                $swiperItem.eq(index).css('transform','translateX('+(clientX-detailX)+'px)');
                $swiperItem.eq(next).css('transform','translateX('+(documentWidth+clientX-detailX)+'px)');
            },false);
            $(this)[0].addEventListener('touchend',function(e){
                if(!isTouchMove){//如果没发生移动
                    return;
                }
                //触摸结束，计算出触摸开始到结束之间产生的距离
                distance = e.changedTouches[0].clientX-startX;
                //计算出触摸开始到结束之间产生的毫秒数
                timeCha = new Date() - startTime;
                //判断是左滑还是右滑
                if(direction === 'left') {
                    console.log('左滑成功');
                    if(distance < -documentWidth/2 || distance < -30 && timeCha < 300){
                        showNext();
                    }
                    //如果不允许切换，上一张当前这张下一张都需要 回到原来位置，并且这个过程是过渡的
                    $swiperItem.eq(prev).css({
                        'transition':'all 0.3s ease 0s',
                        'transform':'translateX('+(-documentWidth)+'px)'
                    });
                    $swiperItem.eq(index).css({
                        'transition':'all 0.3s ease 0s',
                        'transform':'translateX(0px)'
                    });
                    $swiperItem.eq(next).css({
                        'transition':'all 0.3s ease 0s',
                        'transform':'translateX('+(documentWidth)+'px)'
                    });
                } else if(direction === 'right') {
                    console.log('右滑成功');
                    if(distance > documentWidth/2 || ( distance > 30 && timeCha < 300 )){
                        //向右滑的时候当前这张成了下一张,上一张成为当前这张
                        next = index;
                        index = prev;
                        prev--;
                        if(prev < 0){
                            prev = 4;
                        }
                        $swiperItem.eq(index).css({
                            'transition':'all 0.3s ease 0s',
                            'transform':'translateX(0px)'
                        });
                        $swiperItem.eq(next).css({
                            'transition':'all 0.3s ease 0s',
                            'transform':'translateX('+(documentWidth)+'px)'
                        });
                        return;
                    }
                    //如果不允许切换，上一张当前这张下一张都需要 回到原来位置，并且这个过程是过渡的
                    $swiperItem.eq(prev).css({
                        'transition':'all 0.3s ease 0s',
                        'transform':'translateX('+(-documentWidth)+'px)'
                    });
                    $swiperItem.eq(index).css({
                        'transition':'all 0.3s ease 0s',
                        'transform':'translateX(0px)'
                    });
                    $swiperItem.eq(next).css({
                        'transition':'all 0.3s ease 0s',
                        'transform':'translateX('+(documentWidth)+'px)'
                    });
                }
            },false);
        }
    })();
});