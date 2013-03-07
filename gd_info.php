<?php
if (!extension_loaded('gd')) 
{
     echo "GD not loaded<br>";
    if (!dl('gd.so')) 
	{
        exit;
	}
	else
	{
		echo "GD now loaded<br>";
		var_dump(gd_info());
    }
}		
else
{
	var_dump(gd_info());
}
?> 