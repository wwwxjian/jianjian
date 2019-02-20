'use strict';

$(function () {

    /*
        首页 banner 鼠标滑过添加遮罩
    */
    $('.img2').hover(function () {
        opacity($('.Dimg3'), 0.6);
    }, function () {
        opacity($('.Dimg3'), 0);
    });

    $('.Dimg3').hover(function () {
        opacity($('.Dimg3'), 0.6);
    }, function () {
        opacity($('.Dimg3'), 0);
    });

    $('.img5').hover(function () {
        opacity($('.Dimg1'), 0.6);
    }, function () {
        opacity($('.Dimg1'), 0);
    });

    $('.Dimg1').hover(function () {
        opacity($('.Dimg1'), 0.6);
    }, function () {
        opacity($('.Dimg1'), 0);
    });

    // 封装
    function opacity(ele, num) {
        ele.css({ 'opacity': num, 'transition': 'all 0.5s' });
    }

    /*
        首页 main 鼠标滑过加遮罩
    */
    $('#main .mask_1').hover(function () {
        opacity($('.mask_1'), 1);
    }, function () {
        opacity($('.mask_1'), 0);
    });

    $('#main .main_img2').hover(function () {
        opacity($('.mask_1'), 1);
    }, function () {
        opacity($('.mask_1'), 0);
    });

    /*
        首页轮播图渲数据染
    */
    // 使用ajax访问数据库
    var imglist = getid('imglist');
    var url = 'api/index.php';
    var data = '';
    ajax('post', url, data, function (str) {
        var arr = JSON.parse(str);

        var html = arr.map(function (item) {
            return '<li date-id=' + item.id + '>\n                        <a href="">\n                            <div class="img">\n                                <img src="img/index/lunbo/' + item.img + '.jpg" alt="">\n                                <div class="mask"></div>\n                            </div>\n                            <div class="goods-details">\n                                <p>' + item.brand + '</p>\n                                <p>' + item.name + '</p>\n                                <div class="line"></div>\n                                <p>\uFFE5' + item.price + '</p>\n                            </div>\n                        </a>\n                    </li>';
        });
        imglist.innerHTML = html.join('');
        lbt();
    });

    /*
        首页轮播图
          原理：每次运动4个图距离，运动出去的图片，剪切拼接到末尾
    
    1、ul的宽度：图片的宽度*图片个数
    2、开定时器，每次运动4个图距离，往左边运动：-4*iW
    3、出去的图片剪切拼接到后面
    4、上下按钮可以点击切换
    */
    // 1.ul的宽度：图片的（宽度+margin）*5
    function lbt() {

        var wi = $('#lunbo li').size() * ($('#lunbo li').eq(0).outerWidth() + 10);
        $('#lunbo ul').css('width', wi);
        var iw = ($('#lunbo li').eq(0).outerWidth() + 10) * 5; //每次运动的距离

        // 2.开启定时器，每次运动五个图的距离，往左边运动：-iw
        var timer = null;
        clearInterval(timer);
        timer = setInterval(next, 5000);

        function next() {
            $('#lunbo ul').animate({ 'left': -iw }, 2000, function () {
                //出去的图片，剪切放到末尾
                $('#lunbo li:lt(5)').insertAfter($('#lunbo li:last'));
                //ul归位
                $('#lunbo ul').css('left', 0);
            });
        }

        function prev() {
            //先剪切最后的五个图插入到ul首位
            for (var i = 0; i < 5; i++) {
                $('#lunbo li:last').insertBefore($('#lunbo li:first'));
                //预留五个位置
                $('#lunbo ul').css('left', -iw);
                //挪到可视区
                $('#lunbo ul').animate({ 'left': 0 }, 2000);
            }
        }

        // 3.点击左右按钮可以切换图片
        $('#lunbo').hover(function () {
            //鼠标移入停止定时器
            clearInterval(timer);
        }, function () {
            clearInterval(timer);
            timer = setInterval(next, 5000);
        });

        //点击切换
        $('#lunbo .lt').click(function () {
            prev();
        });

        $('#lunbo .gt').click(function () {
            next();
        });
    }

    /*
        首页视频播放
    */
    $('#banner .img6').click(function () {
        // console.log(555);
        $(this).css('display', 'none');
        $('#banner .img4').css('display', 'none');
        // jq使用js方法时，加上[0]即可
        $('#banner video')[0].play(); // 视频开始播放，js的方法
        $('#banner video').css('background', '#000');

        // 视频播放结束事件，也是js方法
        $('#banner video')[0].onended = function () {
            // console.log(123);
            $('#banner .img6').css('display', 'block');
            $('#banner .img4').css('display', 'block');
        };
    });
});