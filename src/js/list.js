$(function(){

    /*
        吸顶菜单
            思路整理：
                    * 先写出正常的文档流
                    * 滚动条事件：判断，当scrollY的距离到达一定长度时
                    * 给所要吸顶的元素添加样式 position：'fixed',
                        并且设定top、left值，使其能一直位于浏览器顶部
                    * else{则为正常文档流，将 position：''设为空}

            所需知识点：
                    * 滚动距离：window.scrollY 垂直方向上的滚动距离
                    * 回到顶部：window.scrollTo(x,y)
    */
    $(window).scroll(function(){
        let scrollTop = window.scrollY;  //获取垂直滚动距离
        // console.log(scrollTop);
        // 当滚动到250px时,出现吸顶菜单
        if(scrollTop >= 750){
            $('#main .four').css({'position':'fixed','top':0,'left':'280px'});
        }else{
            $('#main .four').css({'position':''});
        }
        
    });



    /*
        需求：回到顶部
            * 滚到500px时出现
            * 点击回到顶部，能快速回到顶部
        知识点：
            * 滚动距离：window.scrollY 垂直滚动距离
            * 回到顶部：window.scrollTo(x,y)
    */
    let scrollTop = 0;
    $(window).scroll(function(){
        scrollTop = window.scrollY;  //获取垂直滚动距离
        // console.log(scrollTop);

        // 判断; 点击回到顶部
        if(scrollTop >= 600){
            // console.log()
            $('#main .tow').css('display','block');
        }else{
            $('#main .tow').css('display','none');
        }

    });

    $('#main .tow').click(function(){
        // console.log(scrollTop);
        var timer = setInterval(function(){
            num = scrollTop - 30;
            // 临界值判断
            if(num <= 0){
                num = 0;
                clearInterval(timer);
            }
            window.scrollTo(0, num);
        },1);
        
    });


    /*
        商城/拍卖
    */
    // 初始化
    $('#main .three div').eq(0).attr('class','active');
    $('#main .three div').click(function(){
        // 排它
        $('#main .three div').attr('class','');
        $(this).attr('class','active');
    });


    // 综合初始化
    $('#main .four-1 span').eq(0).attr('id','gaoliang');
    // 点击
    $('#main .four-1 span').click(function(){
        $('#main .four-1 span').attr('id','');
        $(this).attr('id','gaoliang');
    });

    // 价格区间初始化   
    $('#main .four-2 input').val('￥');



    /*
        底部的广告
    */
    // 点击关闭广告
    $('#main .six .close').click(function(){
        $('#main .six').css('display','none');
    });

    // 点击变色
    $('#main .six .yes').click(function(){
        $('#main .six .no').css('border','1px solid #ededed');
        $(this).css('border','1px solid #000');
    });

    $('#main .six .no').click(function(){
        $('#main .six .yes').css('border','1px solid #ededed');
        $(this).css('border','1px solid #000');
    });



    /*
        列表页的初始化数据渲染
    */ 
    // 获取元素
    let goodslist = getid('goodslist');
    // var num = 1;  //页码
    var showMore = getid('showMore');

    // 页面初始化
    function showList(){
        // 使用ajax访问数据库
        let url = '../api/list.php';
        let data = `qty=20&page=1`;
        ajax('get',url,data,function(str){
            var arr = JSON.parse(str);
            // console.log(arr);

            list_show(arr);
            
            // 页码的渲染
            let total = arr.total;
            let num = Math.ceil(total / arr.qty);
            let ddd = `1/${num}`;
            var li = '';
            for(var i=0; i<num; i++){
                li += ` <li>${i+1}</li>`;
            }

            new_page(ddd);
            $('.folio_num').html(li);
            $('.folio_num li').eq(0).attr('class','dik');

        });
    }
    showList();  // 页面初始化


    // 总页数与当前页数更新的封装
    function new_page(ddd){
        $('.four-5 .now_page').text(ddd);
    }


    // 点击事件
    $('#folio').on('click','li',function(){
        // 排它
        $('#folio li').attr('class','');
        $(this).attr('class','dik');

        let shu = $(this).text();  // 点击的页数
        let url = '../api/list.php';
        let data = `qty=20&page=${shu}`;
        ajax('get',url,data,function(str){
            let arr = JSON.parse(str);
            let num = Math.ceil(arr.total / arr.qty);
            let ddd = `${shu}/${num}`;
            // console.log(str);

            new_page(ddd);
            list_show(arr);
        });
    });



    // 点击加载更多
    // showMore.onclick = () => {
    //     num ++;
    //     setTimeout(function(){
    //         showList();
    //     },1000);
    // }


    /*
        点击翻页功能
    */
    // 下一页的封装
    function xia(){
        let shu = $('#folio .dik').text()*1;
        let index = $('#folio .dik').index();
        $('.folio_num li').eq(index).attr('class','');
        index ++;
        shu ++;
        if(index >= 4){
            $(this).css('cursor','not-allowed');
            index = 4;
        }
        if(shu >= 5){
            shu = 5;
        }
        $('.folio_num li').eq(index).attr('class','dik');
        let url = '../api/list.php';
        let data = `qty=20&page=${index+1}`;    
        ajax('get',url,data,function(str){
            let arr = JSON.parse(str);
            let num = Math.ceil(arr.total / arr.qty);
            let ddd = `${shu}/${num}`;
            // console.log(arr,ddd);

            new_page(ddd);
            list_show(arr);
        });
    }
   
    // 上一页的封装
    function shang(){
        let index = $('#folio .dik').index();
        let shu = $('#folio .dik').text()*1;
        $('.folio_num li').eq(index).attr('class','');
        index --;
        shu --;
        if(index <= 0){
            $(this).css('cursor','not-allowed');
            index = 0;
        }
        if(shu <= 0){
            shu = 1;
        }
        $('.folio_num li').eq(index).attr('class','dik');
        let url = '../api/list.php';
        let data = `qty=20&page=${index}`;    
        ajax('get',url,data,function(str){
            let arr = JSON.parse(str);
            let num = Math.ceil(arr.total / arr.qty);
            let ddd = `${shu}/${num}`;
            // console.log(arr,ddd);

            new_page(ddd);
            list_show(arr);
        });
    }

    // 下一页
    $('#folio .xia').click(function(){
        xia();
    });
    $('.four-5 .btn2').click(function(){
        xia();
    });

    // 上一页
    $('#folio .shang').click(function(){
        shang();
    });
    $('.four-5 .btn1').click(function(){
        shang();
    });



    // 排序渲染的封装
    function list_show(arr){
        var arr2 = arr.datalist;
        var html = arr2.map(function(item){
            return `<li date-id=${item.id}>
                        <img src="../img/list/List/${item.img}.jpg" alt="">
                        <div class="li-1"><span>自营</span> <span>new</span></div>
                        <div class="li-2">
                            <p>${item.title}</p>
                        </div>
                        <div class="li-3"><span>￥${item.price}</span></div>
                        <div class="li-4">
                            <span class="car">加入购物车</span>
                            <div class="cang">
                                <span></span> 
                                <span>收藏</span>
                            </div>
                        </div>
                    </li>`
        });
        //console.log(1)
        return goodslist.innerHTML = html.join('');
    }

    // ajax 封装
    function ajax_show(num1,num2){
        let type = num1; 
        let from = num2;
        let page = 1;
        let qty = 20;
        let url = '../api/sort.php';
        let data = `type=${type}&from=${from}&page=${page}&qty=${qty}`;
      
        ajax('get',url,data,function(str){
            var arr = JSON.parse(str);
            console.log(arr);
            list_show(arr);
        });
    }


    /*
        排序
    */
    // 人气排序
     let isok1 = true;
    $('#main .four .hot').click(function(){
       if(isok1){
            ajax_show('hot','down');
            $(this).find('b').text('↑');
       }else{
            ajax_show('hot','up');
            $(this).find('b').text('↓');
       }
       isok1 = !isok1;
    });

    // 销量排序
    let isok2 = true;
    $('#main .four .sales').click(function(){
            if(isok2){
                ajax_show('sales','down');
                $(this).find('b').text('↑');
            }else{
                ajax_show('sales','up');
                $(this).find('b').text('↓');
            }
            isok2 = !isok2;
        });

    // 新品排序
    let isok3 = true;
    $('#main .four .new').click(function(){
        if(isok3){
            ajax_show('new','down');
            $(this).find('b').text('↑');
        }else{
            ajax_show('new','up');
            $(this).find('b').text('↓');
        }
        isok3 = !isok3;
    });

    // 折扣排序
    let isok4 = true;
    $('#main .four .rate').click(function(){
        if(isok4){
            ajax_show('rate','down');
            $(this).find('b').text('↑');
        }else{
            ajax_show('rate','up');
            $(this).find('b').text('↓');
        }
        isok4 = !isok4;
    });

    // 价格排序
    let isok5 = true;
    $('#main .four .price').click(function(){
        if(isok5){
            ajax_show('price','down');
            $(this).find('b').text('↑');
        }else{
            ajax_show('price','up');
            $(this).find('b').text('↓');
        }
        isok5 = !isok5;
    });

    // 综合排序
    let isok6 = true;
    $('#main .four .zong').click(function(){
        if(isok6){
            ajax_show('zong','down');
            $(this).find('b').text('↑');
        }else{
            ajax_show('zong','up');
            $(this).find('b').text('↓');
        }
        isok6 = !isok6;
    });




    /*
        点击商品跳转详情页,事件委托
    */
    $('#goodslist').on('click','li img',function(){
        // console.log($(this).attr('date-id'));
        let id = $(this).parent().attr('date-id');

        // 跳转
        location.href = 'http://localhost/wwwww/src/html/details.html?&id=' + id;
    });

    $('#goodslist').on('click','li p',function(){
        // console.log($(this).attr('date-id'));
        let id = $(this).parent().parent().attr('date-id');

        // 跳转
        location.href = 'http://localhost/wwwww/src/html/details.html?&id=' + id;
    });
    


    /*
        mark 自定义弹窗特效
    */
    // 1.点击加入购物车，出现弹窗
    $('#goodslist').on('click','.car',function(){
        var user = $.cookie('user');
        var pasw = $.cookie('pswd');
        if(user){
            $('.mark').css('display','block');
            let goodsColor = '红色';
            let goodsNum = 1;
            let goodsId = $(this).parent().parent().attr('date-id');
            // console.log(goodsId);
            let type = 'add';
            let url = '../api/car.php';
            let data = `type=${type}&goodsid=${goodsId}&number=${goodsNum}&color=${goodsColor}`;
            ajax('get',url,data,function(str){
                let arr = JSON.parse(str);
                // console.log(arr);
            });
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



    // 点击更多选项
    $('#information .infor_btn').click(function(){
        $('#information .hide').slideToggle(70);
    })



});