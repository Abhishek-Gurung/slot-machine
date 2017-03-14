<?PHP
error_reporting(E_ALL ^ E_NOTICE);

header('Content-Type: application/json');

session_start();

include('classes/SlotMachine1.php');
$slot = Slot_Machine_1::getInstance();

if ( $_SESSION['credits'] < 1 ) {
	$slot->addCredits(100);
}

// pull the handle
$slot->pullHandle();

echo json_encode($slot->jsonSerialize());
?>
