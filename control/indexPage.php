<?php
     header('Content-Type:text/json; charset=utf-8');//使用utf-8编码，使中文不会变成乱码
       $backValue=$_POST['requestData123'];
       var_dump($backValue);
       // echo $backValue;
       //$data = array('count' => 6, array('tit' => '标题1','content'=>'我是内容呀呀呀！！！'), array('tit' => '标题2','content'=>'我是内容呀呀呀！！！'), array('tit' => '标题3','content'=>'我是内容呀呀呀！！！'), array('tit' => '标题4','content'=>'我是内容呀呀呀！！！'), array('tit' => '标题5','content'=>'我是内容呀呀呀！！！'), array('tit' => '标题6','content'=>'我是内容呀呀呀！！！'));
       echo $backValue;
 ?>