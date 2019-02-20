'use strict';

$(function () {

    function text() {
        /*
            详情页选项卡
        */
        // 初始化
        $('#main .top li').eq(0).css({ 'background': 'url("../img/details/detail_icon3.png")', 'background-position': '-137px -234px' });
        $('#main .top div img').eq(0).css('display', 'block');

        $('#main .top li').hover(function () {
            //排他
            $('#main .top li').css({ 'background': '', 'background-position': '' });
            $('#main .top div img').css('display', 'none');
            $(this).css({ 'background': 'url("../img/details/detail_icon3.png")', 'background-position': '-137px -234px' });
            $('#main .top div img').eq($(this).index()).css('display', 'block');
        });

        // 底部选项卡
        // 初始化
        $('#mation .right li').eq(0).attr('class', 'active');
        $('#mation .right div').eq(0).css('display', 'block');

        $('#mation .right').on('click', 'li', function () {
            // 排它
            $('#mation .right li').attr('class', '');
            $('#mation .right div').css('display', 'none');
            $(this).attr('class', 'active');
            $('#mation .right div').eq($(this).index()).css('display', 'block');
        });

        /*
            详情页点击购买数量
        */
        // 初始化
        $('#main .bb-2 input').val(1);

        // 减
        $('#main .bb-2 .sub').click(function () {
            var num = $('#main .bb-2 input').val();
            num--;
            if (num < 1) {
                alert('不能再少了！客官~~');
                num = 1;
            }
            $('#main .bb-2 input').val(num);
        });

        // 加
        $('#main .bb-2 .add').click(function () {
            var num = $('#main .bb-2 input').val();
            num++;
            $('#main .bb-2 input').val(num);
        });

        /*
            商品颜色的选择
        */
        $('#chose_color li').click(function () {
            //排他
            $('#chose_color li').attr('class', '');
            $(this).attr('class', 'active');
        });

        /*
            'three'特效
        */
        // 1.'div1、div2、div3' 鼠标滑过
        $('#main .three .div1').hover(function () {
            $(this).css({ 'background-position': '0 -36px' });
        }, function () {
            $(this).css({ 'background-position': '' });
        });

        $('#main .three .div2').hover(function () {
            $(this).css({ 'background-position': '-1px 0', 'background-color': '#493781' });
            $('#main .three section').css('display', 'block');
        }, function () {
            $(this).css({ 'background-position': '', 'background-color': '#fff' });
            $('#main .three section').css('display', 'none');
        });

        $('#main .three .div3').hover(function () {
            $(this).css({ 'background-position': '-2px -34px', 'background-color': '#493781' });
        }, function () {
            $(this).css({ 'background-position': '', 'background-color': '#fff' });
        });

        // 2.当滚动一定高度时，'div2、div3'出现
        var scrollTop = 0;
        $(window).scroll(function () {
            scrollTop = window.scrollY; //获取垂直滚动距离
            // console.log(scrollTop);
            if (scrollTop >= 355) {
                $('#main .three .div2').css('display', 'block');
                $('#main .three .div3').css('display', 'block');
            } else {
                $('#main .three .div2').css('display', 'none');
                $('#main .three .div3').css('display', 'none');
            }
        });

        // 点击回到顶部
        $('#main .three .div3').click(function () {
            var timer = setInterval(function () {
                var num = scrollTop - 23;
                if (num <= 0) {
                    num = 0;
                    clearInterval(timer);
                }
                window.scrollTo(0, num);
            }, 1);
        });

        /*
            iconfont 鼠标滑过
        */
        $('#main .box .left .jing li a').hover(function () {
            $(this).css('color', '#e93a38');
            $(this).find('i').css('border-bottom', '3px solid #fff');
        }, function () {
            $(this).css('color', '#666');
            $(this).find('i').css('border-bottom', '');
        });

        /*
            放大镜
        */
        var shadeWidth = $('.shade').width(),
            // 阴影的宽
        shadeHeight = $('.shade').height(),
            // 阴影的高
        middleWidth = $('.now').width(),
            // 容器的宽
        middleHeight = $('.now').height(),
            // 容器的高
        bigWidth = $('.view').width(),
            // 放大区的宽
        bigHeight = $('.view').height(),
            // 放大区的高
        rateX = bigWidth / shadeWidth,
            // 放大区和遮罩层的宽度比
        rateY = bigHeight / shadeHeight; // 放大区和遮罩层的高度比

        // 当鼠标移入时与移出时，阴影与放大区显示/消失
        $('.now').hover(function () {
            $('.view').show();
            $('.shade').show();
        }, function () {
            $('.view').hide();
            $('.shade').hide();
        }).mousemove(function (e) {
            // 当鼠标移动时，阴影和放大区图片进行移动

            // 记录下光标距离页面的距离
            var x = e.pageX,
                y = e.pageY;

            // 设置遮罩层的位置
            $('.shade').offset({
                top: y - shadeHeight / 2,
                left: x - shadeWidth / 2
            });

            // 获取遮罩层相对父元素的位置
            var cur = $('.shade').position(),
                _top = cur.top,
                _left = cur.left,
                hdiffer = middleHeight - shadeHeight,
                wdiffer = middleWidth - shadeWidth;

            if (_top < 0) _top = 0;else if (_top > hdiffer) _top = hdiffer;
            if (_left < 0) _left = 0;else if (_left > wdiffer) _left = wdiffer;

            //判断完成后设置遮罩层的范围
            $('.shade').css({
                top: _top,
                left: _left
            });

            //设置放大区图片移动
            $('.view img').css({
                top: -rateY * _top,
                left: -rateX * _left
            });
        });

        /*
            mark 自定义弹窗特效
        */
        // 1.点击加入购物车，出现弹窗,访问数据库，加添商品

        $('#main .box .right .bbb .car').click(function () {
            var user = $.cookie('user');
            var pasw = $.cookie('pswd');
            if (user) {
                var goodsColor = $('#chose_color .active').text().trim();
                var goodsNum = $('#main #inpu').val().trim();
                var goodsId = haveId();
                var type = 'add';
                var _url = '../api/car.php';
                var _data = 'type=' + type + '&goodsid=' + goodsId + '&number=' + goodsNum + '&color=' + goodsColor;
                ajax('get', _url, _data, function (str) {
                    var arr = JSON.parse(str);
                    // console.log(arr);
                });

                $('.mark').css('display', 'block');
            } else {
                var res = confirm('还没登录哦！先去登录吧~');
                if (res) {
                    location.href = "http://localhost/wwwww/src/html/login.html";
                }
            }
        });

        // 2.点击'x'关闭弹窗
        $('.mark .close').click(function () {
            $('.mark').css('display', 'none');
        });

        // 3.点击'继续购物'
        $('.mark .gobuy').click(function () {
            $('.mark').css('display', 'none');
        });

        // 4.点击'去购物车结算'
        $('.mark .tocar').click(function () {
            $('.mark').css('display', 'none');
            location.href = 'http://localhost/wwwww/src/html/car.html';
        });
    }

    // text();


    /*
        解析网址，根据id查询数据库，渲染对应商品数据
    */
    // 获取网址上传递的id方法封装
    function haveId() {
        // 1.获取网址
        var wang = decodeURI(location.search); //解码方法
        // console.log(wang);  // ?&id=10

        var str = wang.slice(1);
        // console.log(str);  // &id=10

        var good = strToObj(str);

        var id = good.id;

        return id;
    }

    var id = haveId();

    // 得到id后，发送ajax使用id查询数据库
    var url = '../api/details.php';
    var data = 'id=' + id;
    var main = getid('main');
    var Ul = main.getElementsByClassName('container')[0];

    ajax('get', url, data, function (str) {
        var arr = JSON.parse(str);
        // console.log(arr);

        var html = arr.map(function (item) {

            return '<div class="one">\n                        <span class="an">\u9996\u9875 ></span> <span class="an">\u5305\u888B ></span> <span class="an"> ' + item.title + '</span>\n                        <span>\u5546\u54C1\u7F16\u7801\uFF1A201988' + item.id + '</span>\n                    </div>\n                    <div class="tow"><img src="../img/details/piao.jpg" alt=""></div>\n                    <div class="three">\n                        <div class="div1"></div>\n                        <div class="div2"></div>\n                        <div class="div3"></div>\n                        <section>\n                            <img src="../img/details/ewm.gif" alt="">\n                            <p>\u626B\u63CF\u4E0B\u8F7DAPP</p>\n                        </section>\n                    </div>\n                    <div class="box">\n                        <div class="left">\n                            <div class="top">\n                                <ul>\n                                    <li><img src="../img/details/Details/' + item.li1 + '.jpg" alt=""></li>\n                                    <li><img src="../img/details/Details/' + item.li2 + '.jpg" alt=""></li>\n                                    <li><img src="../img/details/Details/' + item.li3 + '.jpg" alt=""></li>\n                                    <li><img src="../img/details/Details/' + item.li4 + '.jpg" alt=""></li>\n                                    <li><img src="../img/details/Details/' + item.li5 + '.jpg" alt=""></li>\n                                </ul>\n                                <div class="now">\n                                    <div class="shade"></div>\n                                    <img src="../img/details/Details/' + item.li1 + '.jpg" alt="">\n                                    <img src="../img/details/Details/' + item.li2 + '.jpg" alt="">\n                                    <img src="../img/details/Details/' + item.li3 + '.jpg" alt="">\n                                    <img src="../img/details/Details/' + item.li4 + '.jpg" alt="">\n                                    <img src="../img/details/Details/' + item.li5 + '.jpg" alt="">\n                                </div>\n                                <section class="view">\n                                    <img src="../img/details/Details/' + item.li1 + '.jpg" alt="">\n                                </section>\n                            </div>\n                            <ul class="jing">    \n                                <li><a href=""><i></i>\u6B63\u54C1\u4FDD\u8BC1</a></li>\n                                <li><a href=""><i></i>\u4E03\u5929\u9000\u6362</a></li>\n                                <li><a href=""><i></i>\u6743\u5A01\u8D28\u68C0</a></li>\n                                <li><a href=""><i></i>\u5206\u4EAB</a></li>\n                                <li><a href=""><i></i>\u6536\u85CF\u5546\u54C1</a></li>\n                            </ul>\n                        </div>\n                        <div class="right">\n                            <h2>' + item.title + '</h2>\n                            <div class="aaa">\n                                <p><span>\u5BFA\u5E93\u4EF7</span> <span class="ss">\uFFE5</span><span class="tt">' + item.price + '</span></p>\n                                <p><span>\u5546\u54C1\u7EA7\u522B</span> <a href="">S\u7EA7\uFF1A99\u65B0\u672A\u4F7F\u7528</a><span>\u7B49\u7EA7\u8BF4\u660E</span></p>\n                                <p><span>\u53D1\u8D27\u5730</span> <span><a href="">' + item.place + '</a> \u6709\u8D27</span> &nbsp;&nbsp;&nbsp;<span>\u9884\u8BA1<i>5-10 </i>\u4E2A\u5DE5\u4F5C\u65E5\u9001\u8FBE</span></p>\n                                <p><span>\u6E29\u99A8\u63D0\u793A</span> <span>\u672C\u5546\u54C1\u65E0\u8D28\u91CF\u95EE\u9898\u4E0D\u652F\u6301\u9000\u6362\u8D27</span></p>\n                                <p><span>\u5546\u54C1\u4FE1\u606F</span> <span>\u81EA\u8425</span></p>\n                            </div>\n                            <div class="bbb">\n                                <div class="bb-1">\n                                    <span>\u989C\u8272</span>\n                                    <ul id="chose_color">\n                                        <li class="active">\u7EA2\u8272</li>\n                                        <li>\u9EC4\u8272</li>\n                                        <li>\u9ED1\u8272</li>\n                                        <li>\u767D\u8272</li>\n                                    </ul>\n                                </div>\n                                <div class="bb-2">\n                                    <span>\u8D2D\u4E70\u6570\u91CF</span>\n                                    <div>\n                                        <span id="sub" class="sub">-</span>\n                                        <input id="inpu" type="text">\n                                        <span class="add">+</span>\n                                    </div>   \n                                    <span></span>\n                                </div>\n                                <div class="bb-3">\n                                    <img src="../img/details/ewm.gif" alt="">\n                                    <div class="buy">\u7ACB\u5373\u8D2D\u4E70</div>\n                                    <div class="car">\u52A0\u5165\u8D2D\u7269\u8F66</div>\n                                    <p>\u5FAE\u4FE1\u626B\u7801\u4E0B\u5355\u66F4\u4F18\u60E0</p>\n                                </div>\n                            </div>\n                        </div>\n                    </div>';
        });

        Ul.innerHTML = html.join('');
        text();
    });
});