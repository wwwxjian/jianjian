'use strict';

$(function () {
    /*
        nav 导航栏的选项卡
    */
    $('.nav li:gt(0)').hover(function () {
        $('#nav section').eq($(this).index() - 1).css('display', 'block');
    }, function () {
        $('#nav section').eq($(this).index() - 1).css('display', 'none');
    });

    $('#nav section').hover(function () {
        $(this).css('display', 'block');
        // $('#nav .nav li a').eq($(this).index()+1).css('color','#fff');
        // $('#nav .nav li a:after').css('display','block');
    }, function () {
        $(this).css('display', 'none');
        // $('#nav .nav li a').eq($(this).index()+1).css('color','#ffb81c');
    });

    /*
        nav 导航栏的搜索动画
    */
    $('#nav .seek1 span').click(function () {
        event.stopPropagation(); // 阻止事件冒泡
        $('#nav .seek1').css('display', 'none');
        $('#nav .seek2').css('display', 'block');
        $('#nav .seek2 input').animate({ width: "200px" }, 1000);
    });

    $('body').click(function () {
        $('#nav .seek2 input').animate({ width: "0" }, 1000);

        setTimeout(function () {
            $('#nav .seek2').css('display', 'none');
            $('#nav .seek1').css('display', 'block');
        }, 900);
    });

    /*
        刷新面板的封装，查看cookie值
    */
    var user = $.cookie('user');
    var pasw = $.cookie('pswd');
    function upDate() {
        // 先获取cookie里的值
        var user = $.cookie('user');
        // 若user的值存在，则说明是在登录状态，若值不存在，则说明不在登录状态
        if (user) {
            $('#head .log').parent().css('width', '100px');
            $('#head .log').text(user);
            $('#head .reg').text('退出');
        } else {
            $('#head .log').text('登录');
            $('#head .reg').text('注册');
        }
    }
    upDate();

    /*
        登录注册点击跳转
    */
    $('#head .log').click(function () {
        var cont = $(this).text().trim();
        var user = $.cookie('user');
        console.log(cont, user);
        if (cont == '登录') {
            location.href = 'http://localhost/wwwww/src/html/login.html';
        } else if (cont == user) {
            location.href = '';
        }
    });

    $('#head .reg').click(function () {
        var cont = $(this).text().trim();
        console.log(cont);
        if (cont == '注册') {
            location.href = 'http://localhost/wwwww/src/html/register.html';
        }
        if (cont == '退出') {
            var res = confirm('您真的要退出吗？');
            if (res) {
                $.cookie('user', null, { expires: -1, path: '/' });
                $.cookie('pswd', null, { expires: -1, path: '/' });
                // console.log( cookie.get('user'));
                location.href = 'http://localhost/wwwww/src/index.html';
                console.log(555);
                upDate();
            }
        }
    });

    /*
        点击购物车，进行登录退出的判断
    */
    $('#head .to_car').click(function () {
        if (user) {
            location.href = "http://localhost/wwwww/src/html/car.html";
        } else {
            var res = confirm('还没登录哦！先去登录吧~');
            if (res) {
                location.href = "http://localhost/wwwww/src/html/login.html";
            }
        }
    });
});