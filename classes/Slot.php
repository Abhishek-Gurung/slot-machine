<?php
	/*
		Slot machine by Gregory Rzeczko
	*/

	require_once 'classes/Model.php';	

	abstract class Slot extends Model {
		private $_symbol; // 2D array - slot symbol names and images
		private $_payout; // array - payouts amounts
		private $_credits = 0; // int - players current credits
		private $_result; // array - physical stop result from handle pull
		private $_winnings = 0; // int - calculated winnings from handle pull
		private $_totalWinnings = 0; // int - total calculated winnings from handle pull
		private $_payString = ''; // string - winning string pattern

		protected static $instance;

		public static function getInstance() {
			if (null === static::$instance) {
				static::$instance = new static();
			}

			return static::$instance;
		}

		protected function __clone() {}

		protected function __wakeup() {}

		protected function __construct() {
			$this->getSessions();
		}

		public function __get($property) {
			switch ($property) {
				case '_result' :
					return $this->_result;
				case '_credits' :
					return $this->_credits;
				case '_winnings' :
					return $this->_winnings;
				case '_symbol' :
					return $this->_symbol;
				case '_totalWinnings' :
					return $this->_totalWinnings;	
				default:
					throw new Exception('Cannot GET this property.');
			}
		}

		public function addCredits($credits){
			$this->_credits += $credits;
			$_SESSION['credits'] = $this->_credits;
		}

		public function pullHandle($multiplier=1) {
			$this->_credits -= $multiplier;
			$_SESSION['credits'] = $this->_credits;
			$maxNumSymbols = count($this->_symbol) - 1;

			$this->_result[0] = mt_rand(0, $maxNumSymbols);
			$this->_result[1] = mt_rand(0, $maxNumSymbols);
			$this->_result[2] = mt_rand(0, $maxNumSymbols);
			
			$this->calculateWinnings($multiplier);
		}

		protected function addSymbol($name, $image) {
			$symbolId = count($this->_symbol);
			$this->_symbol[$symbolId]['name'] = $name;
			$this->_symbol[$symbolId]['image'] = $image;
		}

		protected function setPayout($payString, $payout) {
			$this->_payout[$payString] = $payout;
		}

		private function calculateWinnings($multiplier=1) {			
			$checkString[] = $this->_result[0] . '-' . $this->_result[1] . '-' . $this->_result[2];
			$checkString[] = $this->_result[0] . '-' . $this->_result[1] . '-a';
			$checkString[] = 'a-' . $this->_result[1] . '-' . $this->_result[2];
			$checkString[] = $this->_result[0] . '-a-' . $this->_result[2];
			$checkString[] = $this->_result[0] . '-a-a';
			$checkString[] = 'a-a-' . $this->_result[2];
			$checkString[] = 'a-' . $this->_result[1] . '-a';
			
			for ($i = 0; $i <= count($checkString); $i++) {
				if(array_key_exists($checkString[$i], $this->_payout)){
					$this->_winnings += $multiplier*$this->_payout[$checkString[$i]];
					$this->_totalWinnings += $this->_winnings;
					$this->_payString = $checkString[$i];
					$_SESSION['winnings'] = $this->_totalWinnings;
					break;
				} 
			}
		}

		protected function getPayArray() {
			return explode("-", $this->_payString);
		}

		private function getSessions() {
			if( !empty($_SESSION['credits']) ){
				$this->_credits = $_SESSION['credits'];
			}
			if( !empty($_SESSION['winnings']) ){
				$this->_totalWinnings = $_SESSION['winnings'];
			}
		}

		abstract protected function setDefaultSymbols();
		abstract protected function setDefaultPayout();
	}
?>