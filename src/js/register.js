/*
    注册页面，用户名验证
*/
 $(function(){
    let username = getid('username');
    let passw = getid('passw');
    let repassw = getid('repassw');
    let check1 = getid('check1');
    let check2 = getid('check2');
    let drag = getid('drag');
    let regi = getid('regi');
    let yzm = document.getElementsByClassName('yzm');
    let spans = document.getElementsByTagName('span');
    let inputs = document.getElementsByTagName('input');


    // 用户名验证(手机号或者邮箱)
    let isok0 = false;
    username.onblur = function(){
        let user = username.value.trim();
        if(user){
            if(checkReg.tel(user) || checkReg.email(user)){
                let url = "../api/checkname.php";
                let data = `name=${user}`;
                ajax('get',url,data,function(str){
                    // console.log(str);
                    if(str == 'yes'){
                        spans[0].innerText = '该用户名可以注册';
                        css(spans[0],'color','green');
                        css(username,'border','');
                    }else{
                        spans[0].innerText = '该用户名已存在';
                        css(spans[0],'color','red');
                        css(username,'border','1px solid red');
                    }
                });
               
                css(yzm[0],'display','block');
                // 随机获取验证码
                inputs[2].onclick = function(){
                    var str = '';   
                    for(var i=0; i<4; i++){
                        str += parseInt(Math.random()*10);
                    }
                    inputs[2].value = str;
                }
                // 验证码验证
                drag.onblur = function(){
                    let val = drag.value.trim();
                    let vals =  inputs[2].value.trim();
                    if(val){
                        if(val == vals){
                            spans[0].innerText = '';
                            css(drag,'border','');
                            isok0 = true;
                        }else{
                            spans[0].innerHTML = '验证码输入不正确';
                            spans[0].style.color = 'red';
                            css(drag,'border','1px solid red');
                        }
                    }else{
                        spans[0].innerHTML = '请输入对应验证码';
                        spans[0].style.color = 'red';
                        css(drag,'border','1px solid red');
                    }
                }

            }else{
                spans[0].innerText = '请输入正确的手机号或者邮箱';
                spans[0].style.color = 'red';
                css(username,'border','1px solid red');
            }
        }else{
            spans[0].innerHTML = '输入不能为空';
            spans[0].style.color = 'red';
            css(username,'border','1px solid red');
        }
    }


    // 密码的验证
    let isok1 = false;
    passw.onblur = function(){
        let val1 = passw.value.trim();
        if(val1){
            if(checkReg.password(val1)){
                spans[1].innerText = '';
                isok1 = true;
                css(passw,'border','');
            }else{
                spans[1].innerText = '密码的长度只能在8-20位';
                spans[1].style.color = 'red';
                css(passw,'border','1px solid red');
            }
        }else{
            spans[1].innerHTML = '输入不能为空';
            spans[1].style.color = 'red';
            css(passw,'border','1px solid red');
        }
    }


    // 确认密码
    let isok2 = false;
    repassw.onblur = function(){
        var val1 = passw.value.trim();
        var val2 = repassw.value.trim();
        if(val2){
            if(val1 == val2){
                spans[2].innerText = '';
                isok2 = true;
                css(repassw,'border','');
            }else{
                spans[2].innerText = '两次密码输入不一致，请重新输入';
                spans[2].style.color = 'red';
                css(repassw,'border','1px solid red');
            }
        }else{
            spans[2].innerHTML = '请再次确认密码';
            spans[2].style.color = 'red';
            css(repassw,'border','1px solid red');
        }
    }


    // 贵宾邀请码
    let isok3 = false;
    inputs[5].onclick = function(){
        if(inputs[5].checked){
            css(inputs[6],'display','block');
            
            inputs[6].onblur = function(){
                let val3 = inputs[6].value.trim();
                if(val3){
                    isok3 = true;
                    spans[4].innerHTML = '';
                    css(inputs[6],'border','');
                }else{
                    spans[4].innerHTML = '请输入贵宾邀请码';
                    spans[4].style.color = 'red';
                    css(inputs[6],'border','1px solid red');
                }
            }

        }else{
            css(inputs[6],'display','none');
        }
    }


    // 我已经阅读。。。。
    // let isok4 = false;
    // inputs[7].onclick = function(){
    //     let val5 = inputs[7].value.trim();
    //     if(val5){
    //         isok4 = true;
    //     }
    // }


    // 点击 "立即注册"
    regi.onclick = function(){
        // console.log(111,isok0,isok1,isok2,isok3,isok4);
        if((isok0 && isok1 && isok2) || (isok0 && isok1 && isok2 && isok3)){
            let val0 = username.value.trim();
            let val1 = passw.value.trim();
            var url = '../api/reg.php';
            var data = `name=${val0}&psw=${val1}`;
            ajax('post',url,data,function(str){
                // console.log(str);
                if(str == 'yes'){
                    alert('恭喜您，注册成功！');
                    location.href = 'http://localhost/wwwww/src/html/regiscc.html';
                    username.value = '';
                    passw.value = '';
                    repassw.value = '';
                    drag.value = '';
                    css(yzm[0],'display','none');
                }else{
                    alert('遗憾噢，注册失败！');
                }
            });
            
            
        }
    }

 });
    
    





