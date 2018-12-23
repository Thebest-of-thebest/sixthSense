let kevin2 =(function(){
    let $hC = $('.header-content');
    let $hC_fixed = $('.header-content-fixed');
    let documentWidth = document.documentElement.clientWidth;
    let $yMenu = $('.header-content .menu');
    let $cMenu = $('.header-content-fixed .menu');
    let $maskLayer = $('.maskLayer');
    let $transition = $('.transition');
    let $back = $('.back');
    let m_c = true;
    window.onscroll = function(){
        if($(this).scrollTop() > 0) {
            if(!m_c) {
                /*如果点击了菜单按钮，在滚动滚动条的时候，也需要将另外一个*/
                $cMenu.find('img').attr('src','./img/navbtn-close-fixed.png');
                $yMenu.find('img').attr('src','./img/navbtn-close.png');
            } else {
                $cMenu.find('img').attr('src','./img/navbtn-fixed.png');
                $yMenu.find('img').attr('src','./img/navbtn.png');
            }
            $hC.css('display','none');
            if(documentWidth > 640) {
                $hC_fixed.css({
                    'display': 'block',
                    'width': '640px',
                    'left': '50%',
                    'transform': 'translateX(-50%)'
                });
                return;
            }
            $hC_fixed.css({
                'display': 'block',
                'width': documentWidth+'px',
                'left': '0'
            });
        } else {
            $hC_fixed.css('display','none');
            $hC.css('display','block');
        }
    }
    $yMenu.tap(function(){
        if(m_c) {
            $(this).find('img').attr('src','./img/navbtn-close.png');
            $maskLayer.css('display','block');
            $transition.css({'-webkit-animation': 'transitionMove 1s forwards'});
            $transition.css({'animation': 'transitionMove 1s forwards'});
        } else {
            $(this).find('img').attr('src','./img/navbtn.png');
            $maskLayer.css('display','none');
            $transition.css({'-webkit-animation': 'transitionMoveBack 1s forwards'});
            $transition.css({'animation': 'transitionMoveBack 1s forwards'});
        }
        m_c = !m_c;
    });
    $cMenu.tap(function(){
        if(m_c) {
            $(this).find('img').attr('src','./img/navbtn-close-fixed.png');
            $maskLayer.css('display','block');
            $transition.css({'-webkit-animation': 'transitionMove 1s forwards'});
            $transition.css({'animation': 'transitionMove 1s forwards'});
        }else {
            $(this).find('img').attr('src','./img/navbtn-fixed.png')
            $maskLayer.css('display','none');
            $transition.css({'-webkit-animation': 'transitionMoveBack 1s forwards'});
            $transition.css({'animation': 'transitionMoveBack 1s forwards'});
        }
        m_c = !m_c;
    });
    $back.tap(function(){
        window.history.back();
    });
})();