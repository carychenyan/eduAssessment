<?php
     header('Content-Type:text/json; charset=utf-8');//使用utf-8编码，使中文不会变成乱码
     //$backValue=$_POST['trans_data'];
     $success_respon = array('id' => '1200', 'path' => 'http://images.dev.dodoedu.com/attachments/site_37467182_14443604994849.png', 
     	                     'file_name' => 'QQ图片20151009101431.png',"url"=>"http://images.dev.dodoedu.com/image/site_37467182_14443604994849-145.png","state"=>"SUCCESS");
     echo json_encode($success_respon);
 ?>