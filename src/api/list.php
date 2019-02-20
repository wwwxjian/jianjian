<?php   
    
    // 使用PHP查询数据库

    // 防止中文转义
    header("content-type:text/html;charset=utf-8");

    // 接收参数 isset() 是否设置了，返回布尔值，经常和三目运算符一起使用
    $page = isset($_GET['page']) ? $_GET['page'] : '1';
    $qty = isset($_GET['qty']) ? $_GET['qty'] : '20';

    // 引入外部数据库文件
    include 'connect.php';

    $index = ($page-1) * $qty; //计算下标公式

    // 写查询语句
    $sql="SELECT * FROM list LIMIT $index,$qty";

    // 执行语句，得到一个结果集
    $res = $conn->query($sql);

    // 获取查询结果的内容
    $data = $res->fetch_all(MYSQLI_ASSOC);

    // 再写一个查询语句
    $sql2 = 'SELECT * FROM list';

    // 执行语句
    $res2 = $conn->query($sql2);

    // 获取结果集里面的num_rows属性，记录的条数
    $row = $res2->num_rows;

    //把你要给前端数据，做成关联数组，再统一转成字符串
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