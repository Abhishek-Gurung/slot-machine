(function() {
	function Slot () {
		this._name = 'Slot Machine Class'; // class name

		this._winnings = 0; // winnings of single spin
		this._totalWinnings = 0; // total winnings
		this._winningSymbols = []; // array of winning symbols

		this._audio = new Audio('sound/sound.mp3'); // init spin sound
		this._winAudio = new Audio('sound/win.wav'); // init win sound

		this._glowTimer; // init glow timer - if win, the reel glows
		/* inherit Model class */
		ModelClass.apply(this, arguments);
	}
	/* inherit Model class */
	Slot.prototype = Object.create(ModelClass.prototype);

	/* method:	initSlot
	usage:	initSlot(Object output);
	params:	output = output retrieved from model.
	
	This method will initialize the slot machine.
	
	returns void
	*/
	Slot.prototype.initSlot = function(output) {
		console.log(output);
		$('#spin-btn').prop("disabled", true); // disable SPIN button
		$('.reel').addClass('active'); // add glow to reel
		$('img.winning').removeClass('winning');

		$('#credits').html(output.Credits); // display remaining credits
		
		// show images
		$('#symbol1').attr('src','symbols/' + output.Symbol[output.Result[0]].image);
		$('#symbol2').attr('src','symbols/' + output.Symbol[output.Result[1]].image);
		$('#symbol3').attr('src','symbols/' + output.Symbol[output.Result[2]].image);

		$('#winnings').html('0'); // reset winnings to 0 for each spin

		this._winnings = output.Winnings; // assign to property values.
		this._totalWinnings = output.TotalWinnings
		this._winningSymbols = output.WinningSymbols;
	}

	/* method:	animateReel
	usage:	animateReel();
	
	This method will animate the reel spin.
	
	returns void
	*/
	Slot.prototype.animateReel = function() {
		var that = this;
	
		this._audio.play(); // play the spin sound
		this._audio.volume = 0.33;

		var spinTime = 2000; // total spin time (ms)

		var spot1Height = $('#spot1 .symbol').length - 1; // calculate height of symbols column (1st column)
			spot1Height *= $('#spot1 .symbol').height();

		$('#spot1').css('top',0).animate({ // SPIN! (column 1)
			top: '-' + spot1Height + 'px'
		}, spinTime, "swing");

		var spot2Height = $('#spot2 .symbol').length - 1; // calculate height of symbols column (2nd column)
			spot2Height *= $('#spot2 .symbol').height();

		$('#spot2').css('top',0).animate({ // SPIN! (column 2)
			top: '-' + spot2Height + 'px'
		}, spinTime + 500, "swing");

		var spot3Height = $('#spot3 .symbol').length - 1; // calculate height of symbols column (3rd column)
			spot3Height *= $('#spot3 .symbol').height();

		clearTimeout(this._glowTimer); // if spun before glow finishes after win, this will clear the timer.
		$('#spot3').css('top',0).animate({ // SPIN! (column 3)
			top: '-' + spot3Height + 'px'
		}, spinTime + 1000, "swing", function() { // callback function - called once spin finishes
			$('#spin-btn').prop("disabled", false); // enable SPIN button
			
			$('#winnings').html(that._winnings); // display winnings
			$('#total-winnings').html(that._totalWinnings); // display total winnings

			that._audio.pause(); // stop the audio
			that._audio.currentTime = 0; // rewind audio to beginning

			if (that._winnings > 0) { // if it's a WIN! glow and play sound
				that._winAudio.play();
				that._winAudio.volume = 0.33;

				that.showWinningSymbols(); // method: glow effect for winning symbols

				that._glowTimer = setTimeout(function(){ 
					$('.reel').removeClass('active');
				}, 1200);
			}
			else { // if it's not a win, stop glow.
				$('.reel').removeClass('active');
			}
		});
	}

	/* method:	showWinningSymbols
	usage:	showWinningSymbols();
	
	Adds glow effect to show player the winning symbols.
	
	returns void
	*/
	Slot.prototype.showWinningSymbols = function() {
		var wins = this._winningSymbols;
		if (wins[0] !== 'a')
			$('#symbol1').addClass('winning');
		if (wins[1] !== 'a')
			$('#symbol2').addClass('winning');
		if (wins[2] !== 'a')
			$('#symbol3').addClass('winning');
	}

	/* method:	prependRandomSymbols
	usage:	prependRandomSymbols(int numOfSymb1, int numOfSymb2, int numOfSymb3);
	params:	numOfSymb1 = number of symbols in the first column.
			numOfSymb2 = number of symbols in the second column.
			numOfSymb3 = number of symbols in the third column.
	
	This method will prepend random symbols to the reel for spin effect
	
	returns void
	*/
	Slot.prototype.prependRandomSymbols = function(numOfSymb1, numOfSymb2, numOfSymb3) {
		var symbols = [ // array of symbols
			'bell',
			'blank',
			'cherry',
			'diamond',
			'emerald',
			'goldbar',
			'goldclover',
			'goldseven',
			'grape',
			'greenbar',
			'greenclover',
			'heart',
			'horseshoe',
			'lemon',
			'plum',
			'redbar',
			'redseven',
			'ruby',
			'watermelon'
		];

		$('.random').remove(); // remove all random symbols

		/* generate random symbols for column 1 */
		var spot1 = ($('#symbol1').attr('src')) ? '<div class="random symbol"><img src="' + $('#symbol1').attr('src') + '" /></div>' : '';
		for (var i = 0; i < numOfSymb1; i++) {
			spot1 += '<div class="random symbol"><img src="symbols/' + symbols[Math.floor(Math.random()*symbols.length)] + '.jpg" /></div>';
		}
		$('#spot1').prepend(spot1);

		/* generate random symbols for column 2 */
		var spot2 = ($('#symbol1').attr('src')) ? '<div class="random symbol"><img src="' + $('#symbol2').attr('src') + '" /></div>' : '';
		for (var i = 0; i < numOfSymb2; i++) {
			spot2 += '<div class="random symbol"><img src="symbols/' + symbols[Math.floor(Math.random()*symbols.length)] + '.jpg" /></div>';
		}
		$('#spot2').prepend(spot2);

		/* generate random symbols for column 3 */
		var spot3 = ($('#symbol1').attr('src')) ? '<div class="random symbol"><img src="' + $('#symbol3').attr('src') + '" /></div>' : '';
		for (var i = 0; i < numOfSymb3; i++) {
			spot3 += '<div class="random symbol"><img src="symbols/' + symbols[Math.floor(Math.random()*symbols.length)] + '.jpg" /></div>';
		}
		$('#spot3').prepend(spot3);
	}

	// event handlers
	$('#spin-btn').click(function(e) {
		e.preventDefault();

		spinSlot();
	});

	$(document).keydown(function(e) {
		if (e.which === 32) { // on SPACEBAR press, spin the slot.
			if (!$('#spin-btn').is(':disabled'))
				$('#spin-btn').click();
		}
	});	

	// instantiate the slot machine
	var slot = new Slot();
	
	// function to spin the slot and make the magic happen!
	function spinSlot() {
		slot.getResults(function(output) { // callback function to retrieve data from the model
			slot.prependRandomSymbols(10,20,6);
			slot.initSlot(output);
			slot.animateReel();
		});
	}
	spinSlot();

})();