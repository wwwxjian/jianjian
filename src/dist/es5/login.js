'use strict';

$(function () {

    /*
        登录页选项卡
    */
    $('#main .top li').click(function () {
        //排他
        $('#main .top li').attr('class', '');
        $('#main .sle').css('display', 'none');
        $(this).attr('class', 'active');
        $('#main .sle').eq($(this).index()).css('display', 'block');
    });

    /*
        密码登录
    */
    $('#main .code .inp').focus(function () {
        //聚焦
        $(this).css({
            'border': '1px solid #f19108',
            'outline': 'none',
            'box-shadow': '0 1px 1px rgba(0, 0, 0, .075), 0 0 5px rgba(240, 127, 5, .4)'
        });
        $(this).next().css('color', '#f19108');
    });

    $('#main .code .inp').blur(function () {
        //失去焦点
        var val = $(this).val().trim();
        // 判断，当输入框内容不为空时，小图标就会显示高亮
        if (val) {
            $(this).next().css('color', '#f19108');
        } else {
            $(this).next().css('color', '');
        }

        $(this).css({
            'border': '',
            'box-shadow': ''
        });
    });

    /*
        验证用户名,失去焦点时查询数据库
    */
    $('#username').blur(function () {
        var username = getid('username');
        var user = $('#username').val().trim();
        if (user) {
            var url = "../api/checkname.php";
            var data = 'name=' + user;
            ajax('get', url, data, function (str) {
                // console.log(str);
                if (str == 'yes') {
                    //说明数据库中不存在该用户名
                    error('该用户名不存在');
                }
                if (str == 'no') {
                    //说明数据库中存在该用户名
                    right();
                }
            });
        } else {
            error('输入不能为空');
        }
    });

    /*
        二维码时效性，定时器
    */
    // 开启定时器
    var imggg = getid('imggg');
    var mark = getid('mark');
    var timer = setTimeout(function () {
        imggg.src = '../img/login/ewm.jpg';
        mark.style.display = 'block';
        clearTimeout(timer);
    }, 30000); //30秒后关闭

    // 刷新
    $('.mark div').click(function () {
        imggg.src = '../img/login/show.png';
        mark.style.display = 'none';
        var timer = setTimeout(function () {
            imggg.src = '../img/login/ewm.jpg';
            mark.style.display = 'block';
            clearTimeout(timer);
        }, 30000);
    });

    /*
        用户登录,点击'立即登录'时访问数据库
    */
    $('#main .show .code div').click(function () {
        var check = getid('check');
        var username = $('#username').val().trim();
        var psw = $('#password').val().trim();
        var url = "../api/login.php";
        var data = 'username=' + username + '&psw=' + psw;
        ajax('post', url, data, function (str) {
            // console.log(str);       
            if (str.trim() == 'yes') {
                right();
                $('#password').val('');

                // 登录成功后，将username存入cookie
                $.cookie('user', username, { expires: 555, path: '/' });
                $.cookie('pswd', psw, { expires: 555, path: '/' });

                location.href = 'http://localhost/wwwww/src/index.html';
            }
            if (str.trim() == 'no') {
                error('用户名或密码输入不正确');
            }
        });
    });

    //当错误出现时，小图标样式变化的封装
    function error(text) {
        //这里的text为传入参数，错误时的提示信息
        $('.code .error').css('display', 'block');
        $('.code .error span').text(text);
        $('.code .con-1').css('top', '285px');
        $('.code .con-2').css('top', '350px');
    }
    function right() {
        $('.code .error').css('display', 'none');
        $('.code .error span').text('');
        $('.code .con-1').css('top', '256px');
        $('.code .con-2').css('top', '322px');
    }

    /*
        '记住账号' 点击事件
    */
    // let check = getid('check');
    // check.onclick = function(){
    //     if(check.checked){
    //         let username = $('#username').val().trim();
    //         let psw = $('#password').val().trim();
    //         let now = new Date();
    //         now.setDate(now.getDate()+555);

    //         // 将数据信息存入cookie
    //         cookie.set('user',username,{expires:now});
    //         cookie.set('pswd',psw,{expires:now});
    //     }
    // }

});