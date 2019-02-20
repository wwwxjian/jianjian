<?php

    // 根据前端传过来的不同数据，实现购物车不同的功能(增、删、改、查)

    // 链接数据库
    include 'connect.php';

    // 接收参数
    $type = isset($_GET['type']) ? $_GET['type'] : '';
    $id = isset($_GET['goodsid']) ? $_GET['goodsid'] : '';  //商品id
    $num = isset($_GET['number']) ? $_GET['number'] : '';  //商品数量

/*------------------------------------------- 判断 ------------------------------------------------*/ 

    // 加入购物车
    if($type == 'add'){
        //首先查询购物车表，看是否添加过此商品，如添加过则更改数量，如没添加过则从新添加
        $find = "SELECT * FROM car WHERE id = '$id'";
        $has = $conn->query($find);
        $arr = $has->fetch_all(MYSQLI_ASSOC);
        if($arr){
            $newnum = $arr[0]['num']*1 + $num*1;
            $set = "UPDATE `car` SET `num`='$newnum' WHERE id = '$id'";
            $conn->query($set);
        }else{
            $color = isset($_GET['color']) ? $_GET['color'] : '';  //商品颜色
            $selegoods = "SELECT * FROM details WHERE id = '$id'";
            $res = $conn->query($selegoods);
            $rowArr = $res->fetch_all(MYSQLI_ASSOC);
            $goodsName = $rowArr[0]['title'];  //商品名
            $goodsPlace = $rowArr[0]['place'];  //商品发货地
            $goodsImg = $rowArr[0]['li1'];   //商品图片
            $goodsPrice = $rowArr[0]['price'];  //商品价格
            $set = "INSERT INTO car (id,name,img,color,place,price,num) VALUES ('$id','$goodsName','$goodsImg','$color','$goodsPlace','$goodsPrice','$num')";
            $conn->query($set);
        }
    }


    // 删除单条商品
    if($type == 'deleOne'){
        $del = "DELETE FROM car WHERE id = '$id'";
        $conn->query($del);
    }

    // 删除所有商品
    if($type == 'deleAll'){
        $delAll = "DELETE FROM car";
        $conn->query($delAll);
    }

    // 点击'+'数量
    if($type == 'add_btn'){
        $addnum = "UPDATE `car` SET `num` = '$num+1' WHERE id=${id}";
        $res = $conn->query($addnum);
    }

    // 点击'-'数量
    if($type == 'sub_btn'){
        $addnum = "UPDATE `car` SET `num` = '$num-1' WHERE id=${id}";
        $res = $conn->query($addnum);
    } 


    $get = "SELECT * FROM `car` WHERE 1";  // 相当于检查，得到更改后的所有数据
    $res = $conn->query($get);
    $return = $res->fetch_all(MYSQLI_ASSOC);

    // 将数据输出给前端
    echo json_encode($return);

    // 关闭数据库
    $res->close();
    $conn->close();

?>