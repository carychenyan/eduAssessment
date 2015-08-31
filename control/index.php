<?php
     header('Content-Type:text/json; charset=utf-8');//使用gb2312编码，使中文不会变成乱码
     $backValue=$_POST['trans_data'];
     $error_respon = array('code' => 'ERROR_MSG_MISS', 'msg' => '消息不存在');
     echo json_encode($error_respon);
 ?>