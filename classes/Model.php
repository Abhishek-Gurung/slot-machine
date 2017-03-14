 <?php
    abstract class Model implements JsonSerializable {

        public function jsonSerialize() {
            return [
                'Result' => $this->_result,
                'Credits' => $this->_credits,
                'Winnings' => number_format($this->_winnings),
                'Symbol' => $this->_symbol,
                'TotalWinnings' => number_format($this->_totalWinnings),
                'WinningSymbols' => $this->getPayArray()
            ];
        }

    }
?>    