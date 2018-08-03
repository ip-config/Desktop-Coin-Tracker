window.fs = require("fs");
var dir = "./data";
const getSymbolFromCurrency = require("currency-symbol-map");

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function inetcheck() {
	if (!navigator.onLine) {
		swal("Please check your internet connection and restart!");
	}
}
window.load_process = function() {
	try {
		let read = JSON.parse(fs.readFileSync("data/currency_changer.json"));
		fs.readFileSync("data/all_data.json");
		if (((Date.now() / 1000) | 0) > read.time + 280) {
			load_complete();
		} else {
			if (view == "tv") {
				clock();
				return;
			}

			clearload();

			try {
				if (ueber == 1) {
					document.getElementById("edi").checked = true;
					go();
					$("#loading").hide();
					$("#allcont").show();
					return;
				}
			} catch (e) {}
			go();
			$("#loading").hide();
			$("#allcont").show();
			return;
		}
	} catch (e) {
		load_complete();
	}
};
window.load_complete = function() {
	let currency_changer = {
		fiat_name: [],
		fiat_price: [],
		all: [],
		time: (Date.now() / 1000) | 0
	};

	(function httpGet() {
		function retrieveMarkers(callbackFunction) {
			var markersXMLhttp = new XMLHttpRequest();

			// This gets called once the request is complete.
			markersXMLhttp.onload = function() {
				if (markersXMLhttp.readyState == 4) {
					// Parse the JSON and call the function passed in as a parameter.

					callbackFunction(JSON.parse(markersXMLhttp.responseText));
				}
			};

			markersXMLhttp.open(
				"GET",
				"http://api.openrates.io/latest?base=USD",
				true
			);
			markersXMLhttp.send();
		}

		// Elsewhere in your code call your method and pass in a function....
		retrieveMarkers(markers => {
			// Do some work with your markers here...

			data = markers;
			for (let i = 0; i < Object.keys(markers.rates).length; i++) {
				let curr = Object.keys(markers.rates)[i];

				currency_changer.all.push(
					curr +
						":" +
						getSymbolFromCurrency(curr) +
						"-" +
						Object.values(markers.rates)[i]
				);
			}
			currency_changer.all.push("USD:$-1.0000");

			currency_changer.all.sort();
			let top = ["USD", "EUR", "RUB", "CHF", "CNY", "CAD", "AUD", "BRL"];
			let al = currency_changer.all;

			for (let p = 0; p <= 7; p++) {
				for (let i = 0; i < al.length; i++) {
					if (al[i].search(top[p]) >= 0) {
						array_move(currency_changer.all, i, p);
					}
				}
			}
			for (let i = 0; i < al.length; i++) {
				currency_changer.fiat_name.push(al[i].slice(0, al[i].search("-")));
				currency_changer.fiat_price.push(al[i].slice(al[i].search("-") + 1));
			}

			if (!fs.existsSync(dir)) {
				fs.mkdirSync(dir);
			}
			fs.writeFileSync(
				"data/currency_changer.json",
				JSON.stringify(currency_changer, null, 4),
				"utf-8"
			);
		});
	})();

	begin = 1;
	end = 100;
	let all_data = {
		coinl_all: [],
		coink_all: [],
		btcprice_all: [],
		coin1h_all: [],
		coinp_all: [],
		coinr_all: [],
		coin7d_all: [],
		coin24h_all: [],
		coinm_all: [],
		website_slug: [],
		glob: ""
	};
	(function httpGet() {
		function retrieveMarkers(callbackFunction) {
			var markersXMLhttp = new XMLHttpRequest();

			// This gets called once the request is complete.
			markersXMLhttp.onload = function() {
				if (markersXMLhttp.readyState == 4) {
					// Parse the JSON and call the function passed in as a parameter.
					callbackFunction(JSON.parse(markersXMLhttp.responseText));
				}
			};

			markersXMLhttp.open(
				"GET",
				"https://api.coinmarketcap.com/v2/global/",
				true
			);
			markersXMLhttp.send();
		}

		// Elsewhere in your code call your method and pass in a function....
		retrieveMarkers(markers => {
			// Do some work with your markers here...

			data = markers;

			all_data.glob = data.data.quotes.USD.total_market_cap;
			active_cryptocurrencies = data.data.active_cryptocurrencies;
			acc = 100 / Math.ceil(active_cryptocurrencies / 100) + 1;
			la();
		});
	})();
	let o = 0;

	function la() {
		(function httpGet() {
			function retrieveMarkers(callbackFunction) {
				var markersXMLhttp = new XMLHttpRequest();

				// This gets called once the request is complete.
				markersXMLhttp.onload = function() {
					if (markersXMLhttp.readyState == 4) {
						// Parse the JSON and call the function passed in as a parameter.
						callbackFunction(JSON.parse(markersXMLhttp.responseText));
					}
				};

				markersXMLhttp.open(
					"GET",
					"https://api.coinmarketcap.com/v2/ticker/?start=" +
						begin +
						"&limit=" +
						end +
						"&sort=rank&structure=array&convert=BTC",
					true
				);
				markersXMLhttp.send();
			}

			// Elsewhere in your code call your method and pass in a function....
			retrieveMarkers(markers => {
				// Do some work with your markers here...

				data = markers;

				try {
					for (let i = 0; i < 100; i++) {
						all_data.coinl_all.push(
							capitalizeFirstLetter(data.data[i].website_slug)
						);
						all_data.coink_all.push(data.data[i].symbol);
						all_data.btcprice_all.push(data.data[i].quotes.BTC.price);
						all_data.coinp_all.push(data.data[i].quotes.USD.price);
						all_data.coin1h_all.push(data.data[i].quotes.USD.percent_change_1h);
						all_data.coinr_all.push(data.data[i].rank);
						all_data.coinm_all.push(data.data[i].quotes.USD.market_cap);
						all_data.coin7d_all.push(data.data[i].quotes.USD.percent_change_7d);
						all_data.coin24h_all.push(
							data.data[i].quotes.USD.percent_change_24h
						);
						all_data.website_slug.push(data.data[i].website_slug);
					}
				} catch (e) {
					if (!fs.existsSync(dir)) {
						fs.mkdirSync(dir);
					}
					fs.writeFileSync(
						"data/all_data.json",
						JSON.stringify(all_data, null, 4),
						"utf-8"
					);

					if (view == "tv") {
						clock();
						return;
					}

					clearload();
					try {
						if (ueber == 1) {
							document.getElementById("edi").checked = true;
							go();

							$("#loading").hide();
							$("#allcont").show();
							return;
						}
					} catch (e) {}
					go();
					$("#loading").hide();
					$("#allcont").show();
					return;
				}

				begin = begin + 100;
				end = end + 100;
				$("#prog").html(
					"<div class=progress-bar role=progressbar style='width:" +
						parseInt(acc * o) +
						"%' aria-valuenow=" +
						parseInt(acc * o) +
						" aria-valuemin=0 aria-valuemax=100></div>"
				);
				$("#loadunt").html(
					"<div>Loading Coins " +
						begin +
						"/" +
						active_cryptocurrencies +
						"</div>"
				);

				o++;

				requestAnimationFrame(la);
			});
		})();
	}
};
