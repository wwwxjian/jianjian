$(function(){

    /*
        购物车轮播图

        原理：每次运动5个图距离，运动出去的图片，剪切拼接到末尾
	 	
	 	1、ul的宽度：图片的宽度*图片个数
	 	2、开定时器，每次运动4个图距离，往左边运动：-4*iW
	 	3、出去的图片剪切拼接到后面
	 	4、上下按钮可以点击切换
    */

    // 1.ul的宽度：图片的（宽度+margin）*5
    var wi = $('#lunbo li').size() * ($('#lunbo li').eq(0).outerWidth()+30);
    $('#lunbo ul').css('width',wi);
    var iw = ($('#lunbo li').eq(0).outerWidth()+30) * 5; //每次运动的距离

    // 2.开启定时器，每次运动五个图的距离，往左边运动：-iw
    var timer = null;
    clearInterval(timer);
    timer = setInterval(next,5000);

    function next(){
        $('#lunbo ul').animate({'left':-iw},2000,function(){
            //出去的图片，剪切放到末尾
            $('#lunbo li:lt(5)').insertAfter($('#lunbo li:last'));
            //ul归位
            $('#lunbo ul').css('left',0);
        });
    }

    function prev(){
        //先剪切最后的五个图插入到ul首位
        for(var i=0;i<5;i++){
            $('#lunbo li:last').insertBefore($('#lunbo li:first'));
            //预留五个位置
            $('#lunbo ul').css('left',-iw);
            //挪到可视区
            $('#lunbo ul').animate({'left':0},2000);
        }
    }

    // 3.点击左右按钮可以切换图片
    $('#lunbo').hover(function(){
        //鼠标移入停止定时器
        clearInterval(timer);
    },function(){
        clearInterval(timer);
        timer = setInterval(next,5000);
    });

    //点击切换
    $('#lunbo .left').click(function(){
        prev();
    });

    $('#lunbo .right').click(function(){
        next();
    });



    /*
        登录退出状态的判断
    */
    function state(){
        // 先获取cookie的值
        let user = $.cookie('user');
        if(user){
            // 说明在登录状态
            $('#main .p_one').css('display','block');
            $('#main .p_one span').text(user);
            $('#main .p_tow').css('display','none');
        }else{
            $('#main .p_one').css('display','none');
            $('#main .p_tow').css('display','block');
        }
    }
    state();

    // 点击退出
    $('#main .out').click(function(){
        let res = confirm('您确定要退出吗？');
        if(res){
            $.cookie('user', null, { expires: -1, path: '/' });
            $.cookie('pswd', null, { expires: -1, path: '/' });
            location.href = 'http://localhost/wwwww/src/index.html';
        }
    });

    // 点击登录
    $('#main .goin').click(function(){
        location.href = 'http://localhost/wwwww/src/html/login.html';
    });





    /*
        购物车特效
    */
    function cartext(){

        // 1.加数量，使用事件委托
        $('#car').on('click','.add',function(){
            //点击时获取对应行的数量，再加1
            let val = $(this).prev().val();
            val ++;
            //临界值判断
            if(val >= 10){
                val = 10;
            }
            $(this).prev().val(val);

            let type = 'add_btn';
            let id = $(this).parent().parent().parent().attr('date-id');
            let data = `type=${type}&number=${val}&goodsid=${id}`;
            ajax('get',url,data,function(str){
                let arr = JSON.parse(str);
                // console.log(arr);
            });

            little($(this).parent()); //小计刷新
        });


        // 2.减数量，使用事件委托
        $('#car').on('click','.sub',function(){
            //点击时获取对应行的数量，再加1
            let val = $(this).parent().find('input').val();
            val --;
            //临界值判断
            if(val <= 1){
                val = 1;
            }
            $(this).parent().find('input').val(val);

            let type = 'sub_btn';
            let id = $(this).parent().parent().parent().attr('date-id');
            let data = `type=${type}&number=${val}&goodsid=${id}`;
            ajax('get',url,data,function(str){
                let arr = JSON.parse(str);
                console.log(arr);
            });

            little($(this).parent()); //小计刷新
        });


        // 3.小计的封装
        function little(now){
            var price = now.parent().prev().find('.danjia').text(); // 单价
            var num = now.parent().find('input').val(); // 数量
            // console.log(price,num);
            var Price = num * price; 
            now.parent().next().find('.xiaoji').text(Price);

            updateNum(); // 总件数和总价格刷新
        }


        // 4、删除单行,事件委托
        $('#car').on('click','.dele',function(){
            var res = confirm('您确定要删除该行吗？');
            if(res){
                var erzi =  $(this).parent();
                erzi.parent().remove();
                // 访问购物车数据库
                let deleId = $(this).parent().parent().attr('date-id');
                // console.log(deleId);
                let type = 'deleOne';
                let url = '../api/car.php';
                let data = `type=${type}&goodsid=${deleId}`;
                ajax('get',url,data,function(str){
                    let arr = JSON.parse(str);
                    // console.log(arr);   
                })
            }

            update(); // 若没有了商品，则最后一行不显示
            updateNum(); // 总件数和总价格刷新
        });


        // 5. 页面刷新
        function update() {
            if($('#car tbody tr').size() == 0){  
                // 这里以商品名作为判断条件，当它的长度为零时，说明购物车内没有商品
                $('#main').css('display','none');
                $('#null-car').css('display','block');
            }
        }
        // update();


        // 6.全选一，不选
        var isok = true;
        choseAll($('#choseAll-1'),$('#choseAll-2'));
        choseAll($('#choseAll-2'),$('#choseAll-1'));

        // 全选的封装
        function choseAll(btn1,btn2){
            $(btn1).on('click', function() {
                if(isok) {
                    //全选 attr()只能帮到普通属性  id class title ;prop()添加有行为的属性：一般用在单选和复选框
                    $(this).prop('checked', 'checked'); //设置
                    $(btn2).prop('checked','checked');
                    $('.check').prop('checked', 'checked');
                    $('.check').parent().parent().css('background','#fdf0ef');
                    $('.bto-2 div').eq(4).css({'background-color':'#d32220','color':'#fff','cursor':'pointer'});
                } else {
                    //不选
                    $(this).removeAttr('checked');
                    $('#choseAll-2').prop('checked','');
                    $('.check').removeAttr('checked');
                    $('.check').parent().parent().css('background','#fff');
                    $('.bto-2 div').eq(4).css({'background-color':'#e4e4e4','color':'#999','cursor':'not-allowed'});
                }
                isok = !isok;
                updateNum();
            });
        
        }


        // 7.总数量.总价格改变，封装成函数
        var arr = [];  //声明一个空数组，用来存放被勾选的行下标

        function updateNum(){
            arr.length = 0;
            var leg = $('tbody tr').size();  //tbody中tr的总个数
            // console.log(leg);
            for(var i=0; i<leg; i++){
                if($('tbody tr .check').eq(i).prop('checked')){
                    //意味着这一行被勾选
                    arr.push(i);
                    // console.log(arr);
                }
            }

            // 判断，当没有商品被选中时，立即购买的样式
            if(arr.lenght == 0){
                $('.bto-2 div').eq(4).css({'background-color':'#e4e4e4','color':'#999','cursor':'not-allowed'});
            }

            //统计被勾选行的对应的数量以及小计，累加放到底部对应位置
            let num = 0; //总数量
            let totalPrice = 0; //总价格
            for(var i=0; i<arr.length; i++){
                num += $('#car .numb').eq(arr[i]).val() * 1;
                var price = $('#car .xiaoji').eq(arr[i]).text()* 1;
                // price = $.trim(price);  //去掉前后空格
                // price = (price * 1);
                // console.log(price);
                totalPrice += price;
            }

            //字符串拼接渲染
            $('#car .allnum').text(num);
            $('#car .total-price').html(totalPrice);
            // console.log(totalPrice);
        }   


        // 8.删除选中商品
        $('#car').on('click','.deleAll',function(){
            var res = confirm('您确定要删除多行吗？');
            if(res){
                for(var i=arr.length-1; i>=0; i--){
                    let id = $('#car_goods tr').eq(i).attr('date-id');
                    // console.log(id);
                    let type = 'deleOne'
                    let url = '../api/car.php';
                    let data = `type=${type}&goodsid=${id}`;
                    ajax('get',url,data,function(str){
                        let arr = JSON.parse(str);
                        // console.log(arr);
                    });
                    $('.good_name').parent().eq(arr[i]).remove();
                }
            }
            update(); // 若没有了商品，则最后一行不显示
            updateNum(); // 总件数和总价格刷新
        });


        // 9.商品被选中，总数量，总价的变化
        $('#car').on('click','.check',function(){
            updateNum();

            // 选中商品变换背景色，事件委托
            if($(this).is(':checked')){
                $(this).parent().parent().css('background','#fdf0ef');
                $('.bto-2 div').eq(4).css({'background-color':'#d32220','color':'#fff','cursor':'pointer'});
            }else{
                $(this).parent().parent().css('background','#fff');
            }

            // 当所有复选框被选中时，全选框也相应被选中
            if(arr.length == $('.check').size()){
                $('#choseAll-1').prop('checked','checked');
                $('#choseAll-2').prop('checked','checked');
            }else{
                $('#choseAll-1').prop('checked','');
                $('#choseAll-2').prop('checked','');
            }
        });

    }
    


    /*
        购物车数据渲染
    */
    let car_goods = getid('car_goods');
    let url = '../api/car.php';
    let data = '';
    ajax('get',url,data,function(str){
        let arr = JSON.parse(str);
        // console.log(arr);
        let html = arr.map(function(item){
            return `<tr date-id=${item.id}>
                        <td><input class="check" type="checkbox"></td>
                        <td width="97" valign="top">
                            <div>
                                <img src="../img/details/Details/${item.img}.jpg" alt="">
                            </div>
                        </td>
                        <td class="good_name" valign="top">
                            <p><a href="javascript:;">${item.name}</a></p>
                            <p>颜色：${item.color}</p>
                        </td>
                        <td valign="top">
                            <span>${item.place}</span>
                        </td>
                        <td valign="top">
                            <div>
                                <span>￥</span> <span class="danjia">${item.price}</span>
                            </div>
                        </td>
                        <td valign="top">
                            <div>
                                <span class="sub">-</span>
                                <input class="numb" type="text" value="${item.num}">
                                <span class="add">+</span>
                            </div>
                        </td>
                        <td valign="top">
                            <div>
                                <span>￥</span> <span class="xiaoji">${item.num * item.price}</span>
                            </div>
                        </td>
                        <td valign="top">
                            <span class="dele">删除</span>
                        </td>
                    </tr>`
        });

        car_goods.innerHTML += html.join('');
    });

    cartext();

});