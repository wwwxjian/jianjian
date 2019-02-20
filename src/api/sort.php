<?php

    // 防止中卫乱码
    header("content-type:text/html;charset=utf-8");

    // 链接数据库
    include 'connect.php';

    // 接收前端传过来的参数
    $type = isset($_GET['type']) ? $_GET['type'] : '';
    $from = isset($_GET['from']) ? $_GET['from'] : '';
    $page = isset($_GET['page']) ? $_GET['page'] : '';
    $qty = isset($_GET['qty']) ? $_GET['qty'] : '';

    $index = ($page-1) * $qty; //计算下标公式

// ----------------------------------------------- 判断 -----------------------------------------------
    // 人气排序
    if($type == 'hot'){
        if($from == 'up'){
            $sql = "SELECT * FROM list ORDER BY hot LIMIT $index,$qty";
        }
        if($from == 'down'){
            $sql = "SELECT * FROM list ORDER BY hot DESC LIMIT $index,$qty";
        }
        $res = $conn->query($sql);
    }

    // 价格排序
    if($type == 'price'){
        if($from == 'up'){
            $sql = "SELECT * FROM list ORDER BY price LIMIT $index,$qty";
        }
        if($from == 'down'){
            $sql = "SELECT * FROM list ORDER BY price DESC LIMIT $index,$qty";
        }
        $res = $conn->query($sql);
    }

    // 销量排序
    if($type == 'sales'){
        if($from == 'up'){
            $sql = "SELECT * FROM list ORDER BY sales LIMIT $index,$qty";
        }
        if($from == 'down'){
            $sql = "SELECT * FROM list ORDER BY sales DESC LIMIT $index,$qty";
        }
        $res = $conn->query($sql);
    }

    // 折扣排序
    if($type == 'rate'){
        if($from == 'up'){
            $sql = "SELECT * FROM list ORDER BY rate LIMIT $index,$qty";
        }
        if($from == 'down'){
            $sql = "SELECT * FROM list ORDER BY rate DESC LIMIT $index,$qty";
        }
        $res = $conn->query($sql);
    }

    // 新品排序
    if($type == 'new'){
        if($from == 'up'){
            $sql = "SELECT * FROM list ORDER BY new LIMIT $index,$qty";
        }
        if($from == 'down'){
            $sql = "SELECT * FROM list ORDER BY new DESC LIMIT $index,$qty";
        }
        $res = $conn->query($sql);
    }

    // 综合排序
    if($type == 'zong'){
        if($from == 'up'){
            $sql = "SELECT * FROM list ORDER BY id LIMIT $index,$qty";
        }
        if($from == 'down'){
            $sql = "SELECT * FROM list ORDER BY id DESC LIMIT $index,$qty";
        }
        $res = $conn->query($sql);
    }


    $data = $res->fetch_all(MYSQLI_ASSOC);

    // 再写一个查询语句
    $sql2 = 'SELECT * FROM list';

    $res2 = $conn->query($sql2);

    $row = $res2->num_rows;

    $goodlist=array(
		'total'=>$row,//总条数
		'datalist'=>$data,//查询到的数据
		'page'=>$page,//第几页
		'qty'=>$qty//每页显示多少条
	);

    echo json_encode($goodlist, JSON_UNESCAPED_UNICODE);

    $res->close();//关掉结果集
	$res2->close();//关掉结果集
	$conn->close();//断开连接

?>