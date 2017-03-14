ModelClass = (function() {
	function Model () {
		this._name = 'Model class';
		this._results = {};
	}

	Model.prototype.getResults = function(handleData) {
		var self = this;

		$.get("json.php", function(response) {
            self._results = response;
            self.setResult(self._results);

            handleData(self._results);
        }, "json");
	}

	Model.prototype.returnResults = function(type) {   
	    if(type === "json") {       
	        JSON.stringify(this._results);
	    } else if (type === "serialize") {
	        this._results.serialize();
	    }

		return this._results;
	};

	Model.prototype.setResult = function(response) {
	    this._results = response;
	};

	return Model;
})();