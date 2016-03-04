<?php
     header('Content-Type:text/json; charset=utf-8');//使用utf-8编码，使中文不会变成乱码
       $backValue=$_POST['requestData'];
       //var_dump($backValue);
       // echo $backValue; 
       $p=$_POST['p'];
       $data1 = array('type'=>'success','data'=>array('count' => 9, 'data' =>array(array('id'=>111,'tit' => '我是内容呀呀呀111','tit1' => '我是内容呀呀呀222','tit2' => '我是内容呀呀呀333'), array('id'=>222,'tit' => '我是内容呀呀呀111','tit1' => '我是内容呀呀呀222','tit2' => '我是内容呀呀呀333'), array('id'=>333,'tit' => '我是内容呀呀呀111','tit1' => '我是内容呀呀呀222','tit2' => '我是内容呀呀呀333')))) ;
       
       $data2 = array('type'=>'success','data'=>array('count' => 9, 'data' =>array(array('tit' => '我是内容呀呀呀222','tit1' => '我是内容呀呀呀222','tit2' => '我是内容呀呀呀222'), array('tit' => '我是内容呀呀呀222','tit1' => '我是内容呀呀呀222','tit2' => '我是内容呀呀呀222'), array('tit' => '我是内容呀呀呀222','tit1' => '我是内容呀呀呀222','tit2' => '我是内容呀呀呀222')))) ;
 
       $data3 = array('type'=>'success','data'=>array('count' => 9, 'data' =>array(array('tit' => '我是内容呀呀呀333','tit1' => '我是内容呀呀呀333','tit2' => '我是内容呀呀呀333'), array('tit' => '我是内容呀呀呀333','tit1' => '我是内容呀呀呀333','tit2' => '我是内容呀呀呀333'), array('tit' => '我是内容呀呀呀333','tit1' => '我是内容呀呀呀333','tit2' => '我是内容呀呀呀333')))) ;
       
       if($p==1){

       	 echo json_encode($data1);

       }
       else if($p==2){
           echo json_encode($data2);
       }
       else{

         echo json_encode($data3);

       }
      
 ?>