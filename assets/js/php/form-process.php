<?php
$myemail = 'bellec.arnaud@webarmature.fr';

if (isset($_POST['name'])) {
$name = strip_tags($_POST['name']);
$email = strip_tags($_POST['email']);
$message = strip_tags($_POST['message']);

$to = $myemail;
$email_subject = "[WebArmature] : $name";
$email_body = "Nouveau message via le site : www.webarmature.fr. ".
" Voici les détails:\n Nom : $name \n ".

"Email: $email\n Message soumis : \n $message";

$headers = "From: $myemail\n";

$headers .= "Reply-To: $email";
$success = mail($to,$email_subject,$email_body,$headers);

// redirect to success page
if ($success && $errorMSG == ""){
   echo "success";
}else{
    if($errorMSG == ""){
        echo "Quelque chose s'est mal passé ...(";
    } else {
        echo $errorMSG;
    }
}

}?>