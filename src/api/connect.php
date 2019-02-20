<?php

    /*
        PHP链接数据库：
                *写好配置信息
                *检测是否连接成功
    */ 

    //中文乱码
    header("Content-Type:text/html;charset=utf-8"); 

    // 1、写好配置
    $servername = 'localhost';  // 主机名
    $username = 'root';  // 数据库登录用户名
    $password = 'root';  // 数据库登录密码
    $dbname = 'wwwww'; // 数据库名

    // 2、创建数据链接
    $conn = mysqli_connect($servername,$username,$password,$dbname);  

    // 3、检测是否连接成功
    if($conn -> connect_error){
        // 链接失败
        die('链接失败：'. $conn -> connect_error);
    }else{
        //链接成功
        // echo '成功链接数据库';   
    }

    // 防止中文乱码
    // $conn->set_charset('utf8');

?>