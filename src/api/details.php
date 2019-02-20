<?php

    // 防止中文转义
    header("content-type:text/html;charset=utf-8");

    // 接收参数 isset() 是否设置了，返回布尔值，经常和三目运算符一起使用
    $id = isset($_GET['id']) ? $_GET['id'] : '';

    // 链接数据库
    include 'connect.php';

    // 写查询语句
    $sql = "SELECT * FROM details WHERE id=$id";

    // 执行语句，得到一个结果集
    $res = $conn -> query($sql);

    // 获取内容部分
    $row = $res -> fetch_all(MYSQLI_ASSOC);

    // 将得出的结果传输给前端
    echo json_encode($row, JSON_UNESCAPED_UNICODE);

?>