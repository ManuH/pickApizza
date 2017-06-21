<?php 

if ($_POST) {
    $order = $_POST['order'];
    $total = $_POST['total'];

    //send mail
    mail("example@example.com", "New Order!", "Order: " . $order . "Total :" . $total);
}
?>