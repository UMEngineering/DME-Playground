<?php

/*
 * SimpleModal Contact Form
 * http://www.ericmmartin.com/projects/simplemodal/
 * http://code.google.com/p/simplemodal/
 *
 * Copyright (c) 2009 Eric Martin - http://ericmmartin.com
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Revision: $Id: contact-dist.php 254 2010-07-23 05:14:44Z emartin24 $
 *
 */

// User settings
require_once("../../../db.php");
$to = "globalholidaygreeting@gmail.com";
$subject = "Holiday greeting request";

// Include extra form fields and/or submitter data?
// false = do not include
$extra = array(
	"form_subject"	=> true,
	"form_cc"		=> true,
	"ip"			=> true,
	"user_agent"	=> true
);

// Process
$action = isset($_POST["action"]) ? $_POST["action"] : "";
if (empty($action)) {
	
		
	// Send back the contact form HTML
	$output = "<div style='display:none'>
	<div class='contact-top'></div>
	
	<div class='contact-content'>
		<div class='instructions'>
			<h1>Submit your holiday story as video or text.</h1>
			<ul>
				<h2>What to submit</h2>
				<li>If you have a webcam, you can use YouTube to <a href='http://upload.youtube.com/my_videos_upload' alt='Record from webcam'>record from a webcam</a>.<br /><i>or</i><br /></li>
				<li>Submit your story as text below</li>
				<li>1. State your name  2. Where you are from  3. Your connection with Michigan Engineering  4. Describe a special holiday memory or tradition from your family or culture.	</li>
				<!--li>Upload the video to <a href='http://upload.youtube.com/my_videos_upload' alt='youtube'>YouTube</a>.</li-->
				<li>Return to this page and fill out the form below.</li>
			</ul>
			
		</div>
		<h1 class='contact-title'>Submit your holiday memory.</h1>
		<div class='contact-loading' style='display:none'></div>
		<div class='contact-message' style='display:none'></div>
		<form action='#' style='display:none'>
			<label for='contact-name'>*Full Name:</label>
			<input type='text' id='contact-name' class='contact-input' name='name' tabindex='1001' />
			<label for='contact-location'>*City, State and Country where your video should be located on the \"Global Holiday Greeting\" map:</label>
			<input type='text' id='contact-location' class='contact-input' name='location' tabindex='1002' />

	
			<label for='contact-YouTube'>*Youtube URL or Link:</label>
			<input type='text' id='contact-YouTube' class='contact-input' name='YouTube' value='' tabindex='1003' />";

	$output .= "
			<label for='contact-message'>If you would prefer to include a text-based story about a special holiday memory or tradition, you can type your story below:</label>
			<textarea id='contact-message' class='contact-input' name='message' cols='40' rows='4' tabindex='1004'></textarea>
			<br/>
			<label for='contact-email'>Email (optional):</label>
			<input type='text' id='contact-email' class='contact-input' name='email' value='' tabindex='1005' />
			<br/>
			<label for='contact-class'>Graduating class (optional):</label>
			<input type='text' id='contact-class' class='contact-input' name='class' value='' tabindex='1006' />
			<br/>
			<label for='contact-department'>Department (optional, select multiple):</label>
			<select class='contact-input' name='department[]' multiple size='2'>";
			$query = "SELECT * FROM departments ORDER BY id";
			$result = mysql_query($query);
			while ($row = mysql_fetch_assoc($result)){
				$department_name = htmlentities($row['department_name'], ENT_QUOTES);
				$department_shortname = htmlentities($row['department_shortname'], ENT_QUOTES);
				$department_id = htmlentities($row['id'], ENT_QUOTES);
	$output .= "<option value='$department_id'>$department_name ($department_shortname)</option>";
			}
	$output .=		
		"</select>
			<br/>
			<label for='contact-group'>Group (optional, select multiple):</label>
			<select class='contact-input' name='group[]' multiple size='2'>";
			$query = "SELECT * FROM groups ORDER BY id";
			$result = mysql_query($query);
			while ($row = mysql_fetch_assoc($result)){
				$group_name = htmlentities($row['group_name'], ENT_QUOTES);
				$group_shortname = htmlentities($row['group_shortname'], ENT_QUOTES);
				$group_id = htmlentities($row['id'], ENT_QUOTES);
	$output .= "<option value='$group_id'>$group_name</option>";
			}
	$output .= "
		</select>";
	$output .= "
			<label class='legalese'>Feel free to be creative. Just keep in mind that the \"Global Holiday Greeting Project\" is about sharing holiday memories and traditions from the Michigan Engineering family around the globe. By filling out this form and/or submitting a YouTube url, you are giving the University of Michigan College of Engineering permission to use some, part or none of the video or story at its discretion.</label>
			<div class='clear'>&nbsp;</div>
			<div class='errorBox'></div>
			<button type='submit' class='contact-send contact-button' tabindex='1006'>Submit</button>
			<button type='submit' class='contact-cancel contact-button simplemodal-close' tabindex='1007'>Cancel</button>
			<br/>
			<input type='hidden' name='token' value='" . smcf_token($to) . "'/>
		</form>
	</div>
	<div class='contact-bottom'>&nbsp;</div>
</div>";
	echo $output;
}
else if ($action == "send") {
	// Send the email
	$name = isset($_POST["name"]) ? htmlentities($_POST["name"], ENT_QUOTES) : "[Missing Name]";
	$location = isset($_POST["location"]) ? htmlentities($_POST["location"], ENT_QUOTES) : "[Missing Location]";
	$youtube = isset($_POST["YouTube"]) ? addslashes($_POST["YouTube"]) : "[Missing YouTube]";
	$message = isset($_POST["message"]) ? htmlentities($_POST["message"], ENT_QUOTES) : "[Missing message]";
	$email = isset($_POST["email"]) ? addslashes($_POST["email"]) : "[Missing email]";
	$class = isset($_POST["class"]) ? addslashes($_POST["class"]) : "[Missing class]";
	$department = array();
	$department = isset($_POST["department"]) ? addslashes($_POST["department"]) : "[Missing department]";
	$group = array();
	$group = isset($_POST["group"]) ? addslashes($_POST["group"]) : "[Missing group]";
	
	$token = isset($_POST["token"]) ? addslashes($_POST["token"]) : "[Missing Token]";

	foreach($department as $k => $v) {
		$departments .= "$v,";	
	}
	foreach($group as $k => $v) {
		$groups .= "$v,";	
	}
	
	// make sure the token matches
	if ($token === smcf_token($to)) {
		
		$query = "INSERT INTO holidays (name, link, location, text, classyear, department, grp)
					VALUES ('$name','$youtube','$location','$message','$class','$departments','$groups'); ";
		mysql_query($query);
		$message .= ".  MySQL status: " . mysql_error();
		
		smcf_send($name, $location, $youtube, $message, $email, $class, $departments, $groups);
		//echo "Your message was successfully sent.";
		print_r("<!--".$departments."-->");
	}
	else {
		echo "Unfortunately, your message could not be verified.";
	}
}

function smcf_token($s) {
	return md5("smcf-" . $s . date("WY"));
}

// Validate and send email
function smcf_send($name, $location, $youtube, $message, $email, $class, $deptartment, $group) {
	global $to, $extra;

	// Filter and validate fields
	$name = smcf_filter($name);
	$youtube = smcf_filter($youtube);
	$location = smcf_filter($location);
	if (!smcf_validate_email($location)) {
	/*	$youtube .= " - invalid email";
		$message .= "\n\nBad email: $location";
		$location = $to;
		$cc = 0; // do not CC "sender"*/
	}

	// Add additional info to the message
	if ($extra["ip"]) {
		$message .= "\n\nIP: " . $_SERVER["REMOTE_ADDR"];
	}
	if ($extra["user_agent"]) {
		$message .= "\n\nUSER AGENT: " . $_SERVER["HTTP_USER_AGENT"];
	}
	$message .= "\n\nYoutube URL: $youtube.  Name: $name.  Email: $email.  Class: $class.  Department: $department.  Group: $group.  Location: $location.";
	// Set and wordwrap message body
	$body = "From: $name\n\n";
	$body .= "Message: $message";
	$body = wordwrap($body, 70);

	// Build header
	$headers .= "X-Mailer: PHP/SimpleModalContactForm";

	// UTF-8
	if (function_exists('mb_encode_mimeheader')) {
		$youtube = mb_encode_mimeheader($youtube, "UTF-8", "B", "\n");
	}
	else {
		// you need to enable mb_encode_mimeheader or risk 
		// getting emails that are not UTF-8 encoded
	}
	$headers .= "MIME-Version: 1.0\n";
	$headers .= "Content-type: text/plain; charset=utf-8\n";
	$headers .= "Content-Transfer-Encoding: quoted-printable\n";

	// Send email
	@mail($to, "New Holiday Video", $body, $headers) or 
		die("Unfortunately, a server issue prevented delivery of your message.");
}

// Remove any un-safe values to prevent email injection
function smcf_filter($value) {
	$pattern = array("/\n/","/\r/","/content-type:/i","/to:/i", "/from:/i", "/cc:/i");
	$value = preg_replace($pattern, "", $value);
	return $value;
}

// Validate email address format in case client-side validation "fails"
function smcf_validate_email($email) {
	$at = strrpos($email, "@");

	// Make sure the at (@) sybmol exists and  
	// it is not the first or last character
	if ($at && ($at < 1 || ($at + 1) == strlen($email)))
		return false;

	// Make sure there aren't multiple periods together
	if (preg_match("/(\.{2,})/", $email))
		return false;

	// Break up the local and domain portions
	$local = substr($email, 0, $at);
	$domain = substr($email, $at + 1);


	// Check lengths
	$locLen = strlen($local);
	$domLen = strlen($domain);
	if ($locLen < 1 || $locLen > 64 || $domLen < 4 || $domLen > 255)
		return false;

	// Make sure local and domain don't start with or end with a period
	if (preg_match("/(^\.|\.$)/", $local) || preg_match("/(^\.|\.$)/", $domain))
		return false;

	// Check for quoted-string addresses
	// Since almost anything is allowed in a quoted-string address,
	// we're just going to let them go through
	if (!preg_match('/^"(.+)"$/', $local)) {
		// It's a dot-string address...check for valid characters
		if (!preg_match('/^[-a-zA-Z0-9!#$%*\/?|^{}`~&\'+=_\.]*$/', $local))
			return false;
	}

	// Make sure domain contains only valid characters and at least one period
	if (!preg_match("/^[-a-zA-Z0-9\.]*$/", $domain) || !strpos($domain, "."))
		return false;	

	return true;
}

exit;

?>