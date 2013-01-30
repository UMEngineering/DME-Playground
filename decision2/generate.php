<?php
require_once("../../db.php");
$query = "SELECT name FROM decision ORDER BY id";
$result = mysql_query($query);
$data = array(); //Initializing the results array   
while ($row = mysql_fetch_assoc($result)){
	array_push($data, $row);
}
?>
<p>We asked Michigan students where they love to hang out, study and play, and this interactive map features their video answers on what makes Ann Arbor unique.<br />
<div id="videos">
	<div class="video-item">
		<iframe class="youtubeOverlay" width="350" height="100" src="http://www.youtube.com/embed/phJDxXI9Dqk?wmode=opaque&allowscriptaccess=true&rel=0" frameborder="0" allowfullscreen></iframe>
		<div class="video-content">
        	<p>Elbel Field</p>
            <p>336 Hill Street Ann Arbor (<a href="#">See it on the map</a>)</p>
		</div>
    </div>
	<div class="video-item">
		<iframe class="youtubeOverlay" width="350" height="100" src="http://www.youtube.com/embed/NQ2h-gdWulA?wmode=opaque&allowscriptaccess=true&rel=0" frameborder="0" allowfullscreen></iframe>
		<div class="video-content">
        	<p>The Arb</p>
            <p>Washington Heights (<a href="#">See it on the map</a>)</p>
		</div>
    </div>
	<div class="video-item">
		<iframe class="youtubeOverlay" width="350" height="100" src="http://www.youtube.com/embed/wjbySdv_69Y?wmode=opaque&allowscriptaccess=true&rel=0" frameborder="0" allowfullscreen></iframe>
		<div class="video-content">
        	<p>Blimpie Burger</p>
            <p>551 South Division Street (<a href="#">See it on the map</a>)</p>
		</div>
    </div>
	<div class="video-item">
		<iframe class="youtubeOverlay" width="350" height="100" src="http://www.youtube.com/embed/L_sQe5d74Gs?wmode=opaque&allowscriptaccess=true&rel=0" frameborder="0" allowfullscreen></iframe>
		<div class="video-content">
        	<p>Main Street</p>
            <p>300 S Main Street (<a href="#">See it on the map</a>)</p>
		</div>
    </div>
	<div class="video-item">
		<iframe class="youtubeOverlay" width="350" height="100" src="http://www.youtube.com/embed/lV-0atL3ynU?wmode=opaque&allowscriptaccess=true&rel=0" frameborder="0" allowfullscreen></iframe>
		<div class="video-content">
        	<p>Wilson Center</p>
            <p>2603 Draper (<a href="#">See it on the map</a>)</p>
		</div>
    </div>
	<div class="video-item">
		<iframe class="youtubeOverlay" width="350" height="100" src="http://www.youtube.com/embed/Hwsi0QGJbAc?wmode=opaque&allowscriptaccess=true&rel=0" frameborder="0" allowfullscreen></iframe>
		<div class="video-content">
        	<p>Grad Library</p>
            <p>913 South University Avenue (<a href="#">See it on the map</a>)</p>
		</div>
    </div>
	<div class="video-item">
		<iframe class="youtubeOverlay" width="350" height="100" src="http://www.youtube.com/embed/Hwsi0QGJbAc?wmode=opaque&allowscriptaccess=true&rel=0" frameborder="0" allowfullscreen></iframe>
		<div class="video-content">
        	<p>Grad Library</p>
            <p>913 South University Avenue (<a href="#">See it on the map</a>)</p>
		</div>
    </div>
	<div class="video-item">
		<iframe class="youtubeOverlay" width="350" height="100" src="http://www.youtube.com/embed/Hwsi0QGJbAc?wmode=opaque&allowscriptaccess=true&rel=0" frameborder="0" allowfullscreen></iframe>
		<div class="video-content">
        	<p>Grad Library</p>
            <p>913 South University Avenue (<a href="#">See it on the map</a>)</p>
		</div>
    </div>
	<div class="video-item">
		<iframe class="youtubeOverlay" width="350" height="100" src="http://www.youtube.com/embed/Hwsi0QGJbAc?wmode=opaque&allowscriptaccess=true&rel=0" frameborder="0" allowfullscreen></iframe>
		<div class="video-content">
        	<p>Grad Library</p>
            <p>913 South University Avenue (<a href="#">See it on the map</a>)</p>
		</div>
    </div>
	<div class="video-item">
		<iframe class="youtubeOverlay" width="350" height="100" src="http://www.youtube.com/embed/Hwsi0QGJbAc?wmode=opaque&allowscriptaccess=true&rel=0" frameborder="0" allowfullscreen></iframe>
		<div class="video-content">
        	<p>Grad Library</p>
            <p>913 South University Avenue (<a href="#">See it on the map</a>)</p>
		</div>
    </div>
	<div class="video-item">
		<iframe class="youtubeOverlay" width="350" height="100" src="http://www.youtube.com/embed/Hwsi0QGJbAc?wmode=opaque&allowscriptaccess=true&rel=0" frameborder="0" allowfullscreen></iframe>
		<div class="video-content">
        	<p>Grad Library</p>
            <p>913 South University Avenue (<a href="#">See it on the map</a>)</p>
		</div>
    </div>
	<div class="video-item">
		<iframe class="youtubeOverlay" width="350" height="100" src="http://www.youtube.com/embed/Hwsi0QGJbAc?wmode=opaque&allowscriptaccess=true&rel=0" frameborder="0" allowfullscreen></iframe>
		<div class="video-content">
        	<p>Grad Library</p>
            <p>913 South University Avenue (<a href="#">See it on the map</a>)</p>
		</div>
    </div>
	<div class="video-item">
		<iframe class="youtubeOverlay" width="350" height="100" src="http://www.youtube.com/embed/Hwsi0QGJbAc?wmode=opaque&allowscriptaccess=true&rel=0" frameborder="0" allowfullscreen></iframe>
		<div class="video-content">
        	<p>Grad Library</p>
            <p>913 South University Avenue (<a href="#">See it on the map</a>)</p>
		</div>
    </div>
	<div class="video-item">
		<iframe class="youtubeOverlay" width="350" height="100" src="http://www.youtube.com/embed/Hwsi0QGJbAc?wmode=opaque&allowscriptaccess=true&rel=0" frameborder="0" allowfullscreen></iframe>
		<div class="video-content">
        	<p>Grad Library</p>
            <p>913 South University Avenue (<a href="#">See it on the map</a>)</p>
		</div>
    </div>
	<div class="video-item">
		<iframe class="youtubeOverlay" width="350" height="100" src="http://www.youtube.com/embed/Hwsi0QGJbAc?wmode=opaque&allowscriptaccess=true&rel=0" frameborder="0" allowfullscreen></iframe>
		<div class="video-content">
        	<p>Grad Library</p>
            <p>913 South University Avenue (<a href="#">See it on the map</a>)</p>
		</div>
    </div>
	<div class="video-item">
		<iframe class="youtubeOverlay" width="350" height="100" src="http://www.youtube.com/embed/Hwsi0QGJbAc?wmode=opaque&allowscriptaccess=true&rel=0" frameborder="0" allowfullscreen></iframe>
		<div class="video-content">
        	<p>Grad Library</p>
            <p>913 South University Avenue (<a href="#">See it on the map</a>)</p>
		</div>
    </div>
	<div class="video-item">
		<iframe class="youtubeOverlay" width="350" height="100" src="http://www.youtube.com/embed/Hwsi0QGJbAc?wmode=opaque&allowscriptaccess=true&rel=0" frameborder="0" allowfullscreen></iframe>
		<div class="video-content">
        	<p>Grad Library</p>
            <p>913 South University Avenue (<a href="#">See it on the map</a>)</p>
		</div>
    </div>
	<div class="video-item">
		<iframe class="youtubeOverlay" width="350" height="100" src="http://www.youtube.com/embed/Hwsi0QGJbAc?wmode=opaque&allowscriptaccess=true&rel=0" frameborder="0" allowfullscreen></iframe>
		<div class="video-content">
        	<p>Grad Library</p>
            <p>913 South University Avenue (<a href="#">See it on the map</a>)</p>
		</div>
    </div>
	<div class="video-item">
		<iframe class="youtubeOverlay" width="350" height="100" src="http://www.youtube.com/embed/Hwsi0QGJbAc?wmode=opaque&allowscriptaccess=true&rel=0" frameborder="0" allowfullscreen></iframe>
		<div class="video-content">
        	<p>Grad Library</p>
            <p>913 South University Avenue (<a href="#">See it on the map</a>)</p>
		</div>
    </div>
</div>