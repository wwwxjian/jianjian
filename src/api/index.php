<?php

    // 使用php查询数据库

    // 防止中文转义
    header("content-type:text/html;charset=utf-8");

    // 引入外部数据库
    include 'connect.php';

    // 1.使用sql查询语句
    $sql = "SELECT * FROM `index`";

    // 2.执行语句，得到一个结果集
    $res = $conn -> query($sql);
    // var_dump($res);

    // 3.获取查询结果中的内容
    $row = $res -> fetch_all(MYSQLI_ASSOC);

    // 4.将得出的结果传输给前端
    echo json_encode($row, JSON_UNESCAPED_UNICODE);

?>