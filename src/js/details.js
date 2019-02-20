$(function(){

    function text(){
        /*
            详情页选项卡
        */
        // 初始化
        $('#main .top li').eq(0).css({'background':'url("../img/details/detail_icon3.png")','background-position':'-137px -234px'});
        $('#main .top div img').eq(0).css('display','block');

        $('#main .top li').hover(function(){
            //排他
            $('#main .top li').css({'background':'','background-position':''});
            $('#main .top div img').css('display','none');
            $(this).css({'background':'url("../img/details/detail_icon3.png")','background-position':'-137px -234px'});
            $('#main .top div img').eq($(this).index()).css('display','block');
        });


        // 底部选项卡
        // 初始化
        $('#mation .right li').eq(0).attr('class','active');
        $('#mation .right div').eq(0).css('display','block');

        $('#mation .right').on('click','li',function(){
            // 排它
            $('#mation .right li').attr('class','');
            $('#mation .right div').css('display','none');
            $(this).attr('class','active');
            $('#mation .right div').eq($(this).index()).css('display','block');
        });


    
        /*
            详情页点击购买数量
        */
        // 初始化
        $('#main .bb-2 input').val(1);

        // 减
        $('#main .bb-2 .sub').click(function(){
            let num = $('#main .bb-2 input').val();
            num--;
            if(num < 1){
                alert('不能再少了！客官~~');
                num = 1;
            }
            $('#main .bb-2 input').val(num);
        });


        // 加
        $('#main .bb-2 .add').click(function(){
            let num = $('#main .bb-2 input').val();
            num++;
            $('#main .bb-2 input').val(num);
        });
        

        /*
            商品颜色的选择
        */
        $('#chose_color li').click(function(){
            //排他
            $('#chose_color li').attr('class','');
            $(this).attr('class','active');
        });



        /*
            'three'特效
        */
        // 1.'div1、div2、div3' 鼠标滑过
        $('#main .three .div1').hover(function(){
            $(this).css({'background-position':'0 -36px'});
        },function(){
            $(this).css({'background-position':''});
        });

        $('#main .three .div2').hover(function(){
            $(this).css({'background-position':'-1px 0','background-color':'#493781'});
            $('#main .three section').css('display','block');
        },function(){
            $(this).css({'background-position':'','background-color':'#fff'});
            $('#main .three section').css('display','none');
        });

        $('#main .three .div3').hover(function(){
            $(this).css({'background-position':'-2px -34px','background-color':'#493781'});
        },function(){
            $(this).css({'background-position':'','background-color':'#fff'});
        });


        // 2.当滚动一定高度时，'div2、div3'出现
        let scrollTop = 0;
        $(window).scroll(function(){
            scrollTop = window.scrollY;  //获取垂直滚动距离
            // console.log(scrollTop);
            if(scrollTop >= 355){
                $('#main .three .div2').css('display','block');
                $('#main .three .div3').css('display','block');
            }else{
                $('#main .three .div2').css('display','none');
                $('#main .three .div3').css('display','none');
            }
        });

        // 点击回到顶部
        $('#main .three .div3').click(function(){
            let timer = setInterval(function(){
                let num = scrollTop - 23;
                if(num <= 0){
                    num = 0;
                    clearInterval(timer);
                }
                window.scrollTo(0, num);
            },1);
        })


        /*
            iconfont 鼠标滑过
        */
        $('#main .box .left .jing li a').hover(function(){
            $(this).css('color','#e93a38');
            $(this).find('i').css('border-bottom','3px solid #fff');
        },function(){
            $(this).css('color','#666');
            $(this).find('i').css('border-bottom','');
        });



        /*
            放大镜
        */
        var shadeWidth = $('.shade').width(),   // 阴影的宽
                shadeHeight = $('.shade').height(),  // 阴影的高
                middleWidth = $('.now').width(),   // 容器的宽
                middleHeight = $('.now').height(),  // 容器的高
                bigWidth = $('.view').width(),   // 放大区的宽
                bigHeight = $('.view').height(),  // 放大区的高
                rateX = bigWidth / shadeWidth,  // 放大区和遮罩层的宽度比
                rateY = bigHeight / shadeHeight;  // 放大区和遮罩层的高度比

        // 当鼠标移入时与移出时，阴影与放大区显示/消失
        $('.now').hover(function(){
            $('.view').show();
            $('.shade').show();
        },function(){
            $('.view').hide();
            $('.shade').hide();
        }).mousemove(function(e) {  // 当鼠标移动时，阴影和放大区图片进行移动

            // 记录下光标距离页面的距离
            let x = e.pageX,
                    y = e.pageY;

            // 设置遮罩层的位置
            $('.shade').offset({
                top: y-shadeHeight/2,
					left: x-shadeWidth/2
            });

            // 获取遮罩层相对父元素的位置
            var cur = $('.shade').position(),
					_top = cur.top,
					_left = cur.left,
					hdiffer = middleHeight - shadeHeight,
					wdiffer = middleWidth - shadeWidth;

            if (_top < 0) _top = 0;
            else if (_top > hdiffer) _top = hdiffer;
            if (_left < 0) _left = 0;
            else if (_left > wdiffer) _left =wdiffer;
    
            //判断完成后设置遮罩层的范围
				$('.shade').css({
					top: _top,
					left: _left
				});
 
            //设置放大区图片移动
            $('.view img').css({
                top: - rateY*_top,
                left: - rateX*_left
            });

        });




        /*
            mark 自定义弹窗特效
        */
        // 1.点击加入购物车，出现弹窗,访问数据库，加添商品
       
        $('#main .box .right .bbb .car').click(function(){
            var user = $.cookie('user');
            var pasw = $.cookie('pswd');
            if(user){
                let goodsColor = $('#chose_color .active').text().trim();
                let goodsNum = $('#main #inpu').val().trim();
                let goodsId = haveId();
                let type = 'add';
                let url = '../api/car.php';
                let data = `type=${type}&goodsid=${goodsId}&number=${goodsNum}&color=${goodsColor}`;
                ajax('get',url,data,function(str){
                    let arr = JSON.parse(str);
                    // console.log(arr);
                });

                $('.mark').css('display','block');
            }else{
                let res = confirm('还没登录哦！先去登录吧~');
                if(res){
                    location.href = "http://localhost/wwwww/src/html/login.html";
                }
            }
        });

        // 2.点击'x'关闭弹窗
        $('.mark .close').click(function(){
            $('.mark').css('display','none');
        });

        // 3.点击'继续购物'
        $('.mark .gobuy').click(function(){
            $('.mark').css('display','none');
        });

        // 4.点击'去购物车结算'
        $('.mark .tocar').click(function(){
            $('.mark').css('display','none');
            location.href = 'http://localhost/wwwww/src/html/car.html';
        });
    }
    
    // text();



    /*
        解析网址，根据id查询数据库，渲染对应商品数据
    */
    // 获取网址上传递的id方法封装
    function haveId(){
        // 1.获取网址
        var wang = decodeURI(location.search);  //解码方法
        // console.log(wang);  // ?&id=10

        var str = wang.slice(1);
        // console.log(str);  // &id=10

        var good = strToObj(str);
    
        var id = good.id;

        return id;
    }

    let id = haveId();

    // 得到id后，发送ajax使用id查询数据库
    var url = '../api/details.php';
    var data = `id=${id}`;
    var main = getid('main');
    var Ul = main.getElementsByClassName('container')[0];
   
    ajax('get',url,data,function(str){
        var arr = JSON.parse(str);
        // console.log(arr);

        var html = arr.map(function(item){
           
            return `<div class="one">
                        <span class="an">首页 ></span> <span class="an">包袋 ></span> <span class="an"> ${item.title}</span>
                        <span>商品编码：201988${item.id}</span>
                    </div>
                    <div class="tow"><img src="../img/details/piao.jpg" alt=""></div>
                    <div class="three">
                        <div class="div1"></div>
                        <div class="div2"></div>
                        <div class="div3"></div>
                        <section>
                            <img src="../img/details/ewm.gif" alt="">
                            <p>扫描下载APP</p>
                        </section>
                    </div>
                    <div class="box">
                        <div class="left">
                            <div class="top">
                                <ul>
                                    <li><img src="../img/details/Details/${item.li1}.jpg" alt=""></li>
                                    <li><img src="../img/details/Details/${item.li2}.jpg" alt=""></li>
                                    <li><img src="../img/details/Details/${item.li3}.jpg" alt=""></li>
                                    <li><img src="../img/details/Details/${item.li4}.jpg" alt=""></li>
                                    <li><img src="../img/details/Details/${item.li5}.jpg" alt=""></li>
                                </ul>
                                <div class="now">
                                    <div class="shade"></div>
                                    <img src="../img/details/Details/${item.li1}.jpg" alt="">
                                    <img src="../img/details/Details/${item.li2}.jpg" alt="">
                                    <img src="../img/details/Details/${item.li3}.jpg" alt="">
                                    <img src="../img/details/Details/${item.li4}.jpg" alt="">
                                    <img src="../img/details/Details/${item.li5}.jpg" alt="">
                                </div>
                                <section class="view">
                                    <img src="../img/details/Details/${item.li1}.jpg" alt="">
                                </section>
                            </div>
                            <ul class="jing">    
                                <li><a href=""><i></i>正品保证</a></li>
                                <li><a href=""><i></i>七天退换</a></li>
                                <li><a href=""><i></i>权威质检</a></li>
                                <li><a href=""><i></i>分享</a></li>
                                <li><a href=""><i></i>收藏商品</a></li>
                            </ul>
                        </div>
                        <div class="right">
                            <h2>${item.title}</h2>
                            <div class="aaa">
                                <p><span>寺库价</span> <span class="ss">￥</span><span class="tt">${item.price}</span></p>
                                <p><span>商品级别</span> <a href="">S级：99新未使用</a><span>等级说明</span></p>
                                <p><span>发货地</span> <span><a href="">${item.place}</a> 有货</span> &nbsp;&nbsp;&nbsp;<span>预计<i>5-10 </i>个工作日送达</span></p>
                                <p><span>温馨提示</span> <span>本商品无质量问题不支持退换货</span></p>
                                <p><span>商品信息</span> <span>自营</span></p>
                            </div>
                            <div class="bbb">
                                <div class="bb-1">
                                    <span>颜色</span>
                                    <ul id="chose_color">
                                        <li class="active">红色</li>
                                        <li>黄色</li>
                                        <li>黑色</li>
                                        <li>白色</li>
                                    </ul>
                                </div>
                                <div class="bb-2">
                                    <span>购买数量</span>
                                    <div>
                                        <span id="sub" class="sub">-</span>
                                        <input id="inpu" type="text">
                                        <span class="add">+</span>
                                    </div>   
                                    <span></span>
                                </div>
                                <div class="bb-3">
                                    <img src="../img/details/ewm.gif" alt="">
                                    <div class="buy">立即购买</div>
                                    <div class="car">加入购物车</div>
                                    <p>微信扫码下单更优惠</p>
                                </div>
                            </div>
                        </div>
                    </div>`
        });

        Ul.innerHTML = html.join('');
        text();
    });

});