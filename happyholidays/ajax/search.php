<?php
	//We are going to need a database connection:
	require_once("../../../db.php");
	
	
	$q = mysql_real_escape_string($_GET['q']);
	
	
	echo("<div id='resultcontainer'>");
	
	
	$query = "SELECT * FROM departments WHERE (department_name LIKE '%$q%' OR department_shortname LIKE '%$q%') ORDER BY id";
	$result = mysql_query($query);
	while ($row = mysql_fetch_assoc($result)){
		$department_name = htmlentities($row['department_name'], ENT_QUOTES);
		$department_shortname = htmlentities($row['department_shortname'], ENT_QUOTES);
		$department_id = (int) $row['id'];
		$department_id .= ",";
		
		$return = "<div class='result'><h2><a class='searchForDepartment' href='#$department_shortname'>$department_name ($department_shortname)</a></h2></div>";
		
		
		echo("<script>var $department_shortname = new Array();</script>");
		
		$query2 = "SELECT * FROM holidays WHERE (department LIKE '%$department_id%' and online LIKE '1') ORDER BY id";
		echo("<!--$query2-->");
		$result2 = mysql_query($query2);
		
		$i=0;
		
		while ($row2 = mysql_fetch_assoc($result2)){
			$i++;
			if($i==1) print($return);
			$name = htmlentities($row2['name'], ENT_QUOTES);
			$location = htmlentities($row2['location'], ENT_QUOTES);
			$lat = htmlentities($row2['lat'],ENT_QUOTES);
			$lon = htmlentities($row2['lon'],ENT_QUOTES);
			$mpointer = $lat.$lon;
			echo("<script>console.log('In department $department_name: $name');</script>");
			echo("<script>
				  if ('$mpointer' !== '') highlighter2.push('$mpointer');
				  if ('$mpointer' !== '') $department_shortname.push('$mpointer');	
				  </script>");
		}
		echo("<script>console.log('Array $department_shortname: ', $department_shortname);</script>");
	}
	
	$query = "SELECT * FROM groups WHERE (group_name LIKE '%$q%') ORDER BY id";
	$result = mysql_query($query);
	while ($row = mysql_fetch_assoc($result)){
		$group_name = htmlentities($row['group_name'], ENT_QUOTES);
		$group_shortname = htmlentities($row['group_shortname'], ENT_QUOTES);
		$group_id = (int) $row['id'];
		$group_id .= ",";
		
		$return = "<div class='result'><h2><a class='searchForGroup' href='#$group_shortname'>$group_name</a></h2></div>";
		
		
		echo("<script>var $group_shortname = new Array();</script>");
		
		$query2 = "SELECT * FROM holidays WHERE (grp LIKE '%$group_id%' and online LIKE '1') ORDER BY id";
		echo("<!--$query2-->");
		$result2 = mysql_query($query2);
		
		$i=0;
		
		while ($row2 = mysql_fetch_assoc($result2)){
			$i++;
			if($i==1) print($return);
			$name = htmlentities($row2['name'], ENT_QUOTES);
			$location = htmlentities($row2['location'], ENT_QUOTES);
			$lat = htmlentities($row2['lat'],ENT_QUOTES);
			$lon = htmlentities($row2['lon'],ENT_QUOTES);
			$mpointer = $lat.$lon;
			echo("<script>console.log('In group $group_name: $name');</script>");
			echo("<script>
				  if ('$mpointer' !== '') highlighter3.push('$mpointer');
				  if ('$mpointer' !== '') $group_shortname.push('$mpointer');	
				  console.log('Re-pointing array 3: ', highlighter3);
				  </script>");
		}
		echo("<script>console.log('Array $group_shortname: ', $group_shortname);</script>");
	}
	
	
	$query = "SELECT * FROM holidays WHERE (name LIKE '%$q%' and online LIKE '1') ORDER BY id";
	$result = mysql_query($query);
	while ($row = mysql_fetch_assoc($result)){
		$name = htmlentities($row['name'], ENT_QUOTES);
		$location = htmlentities($row['location'], ENT_QUOTES);
		$lat = htmlentities($row['lat'],ENT_QUOTES);
		$lon = htmlentities($row['lon'],ENT_QUOTES);
		$mpointer = $lat.$lon;
		$return = "<div class='result'><h2><a class='searchForMe' href='#$mpointer'>$name</a></h2><p>$location</p></div>";
		print($return);
		echo("<script>
			  if ('$mpointer' !== '') highlighter.push('$mpointer');	
			  </script>");
	}
	
	
	echo("</div>");
	echo("<script>
		lights();
	</script>");
	
?>