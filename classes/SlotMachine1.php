<?php
	/*
		Slot machine by Gregory Rzeczko
	*/
	require_once 'classes/Slot.php';	

	class Slot_Machine_1 extends Slot {

		protected function __construct() {
			$this->setDefaultSymbols();
			$this->setDefaultPayout();
			parent::__construct();
		}

		protected function setDefaultSymbols(){
			$this->addSymbol('Blank','blank.jpg'); // 0
			$this->addSymbol('Cherry','cherry.jpg'); // 1
			$this->addSymbol('Lemon','lemon.jpg'); // 2
			$this->addSymbol('Grape','grape.jpg'); // 3
			$this->addSymbol('Watermelon','watermelon.jpg'); // 4
			$this->addSymbol('Plum','plum.jpg'); // 5
			$this->addSymbol('Emerald','emerald.jpg'); // 6
			$this->addSymbol('Ruby','ruby.jpg'); // 7
			$this->addSymbol('Diamond','diamond.jpg'); // 8
			$this->addSymbol('Heart','heart.jpg'); // 9
			$this->addSymbol('Green Clover','greenclover.jpg'); // 10
			$this->addSymbol('Gold Clover','goldclover.jpg'); // 11
			$this->addSymbol('Horseshoe','horseshoe.jpg'); // 12
			$this->addSymbol('Bell','bell.jpg'); // 13
			$this->addSymbol('Green Bar','greenbar.jpg'); // 14
			$this->addSymbol('Red Bar','redbar.jpg'); // 15
			$this->addSymbol('Gold Bar','goldbar.jpg'); // 16
			$this->addSymbol('Red Seven','redseven.jpg'); // 17
			$this->addSymbol('Gold Seven','goldseven.jpg'); // 18
		}

		protected function setDefaultPayout(){
			$this->setPayout('1-a-a',2); //cherry any any
			$this->setPayout('a-a-1',2); //any any cherry
			$this->setPayout('a-1-a',2); //any cherry any
			$this->setPayout('1-1-a',5); //cherry cherry any
			$this->setPayout('a-1-1',5); //any cherry cherry
			$this->setPayout('1-a-1',5); //cherry any cherry
			$this->setPayout('1-1-1',20); //cherry cherry cherry
			$this->setPayout('2-2-2',50); //lemon lemon lemon
			$this->setPayout('3-3-3',100); //grape grape grape
			$this->setPayout('4-4-4',200); //watermelon watermelon watermelon
			$this->setPayout('5-5-5',400); //plum plum plum
			$this->setPayout('6-6-6',500); //emerald emerald emerald
			$this->setPayout('7-7-7',600); //ruby ruby ruby
			$this->setPayout('8-8-8',700); //diamond diamond diamond
			$this->setPayout('9-9-9',800); //heart heart heart
			$this->setPayout('10-10-10',900); //greenclover greenclover greenclover
			$this->setPayout('11-11-11',1000); //emerald emerald emerald
			$this->setPayout('12-12-12',1100); //horseshoe horseshoe horseshoe
			$this->setPayout('13-13-13',1200); //bell bell bell
			
			$this->setPayout('14-14-14',1600); //green bar - green bar - green bar
			$this->setPayout('15-15-15',2000); //red bar - red bar - red bar
			$this->setPayout('16-16-16',2400); //gold bar - gold bar - gold bar
			$this->setPayout('17-17-17',5000); //red seven - red seven - red seven
			$this->setPayout('18-18-18',10000); //gold seven - gold seven - gold seven
		}
	}
?>