window.fs = require("fs");
function httpGet(theUrl) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", theUrl, false);

	xmlHttp.send(null);
	data2 = xmlHttp.responseText;
	data = JSON.parse(data2);
}

const getSymbolFromCurrency = require("currency-symbol-map");

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

window.load_process = function() {
	try {
		let read = JSON.parse(fs.readFileSync("data/currency_changer.json"));
		fs.readFileSync("data/all_data.json");
		if (Date.now() > read.time + 280000) {
			load_complete();
		} else {
			clearload();

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
		time: Date.now()
	};
	httpGet(
		"https://finance.yahoo.com/webservice/v1/symbols/allcurrencies/quote?format=json"
	);

	try {
		for (let o = 0; o < o + 1; o++) {
			let data_input = data.list.resources[o].resource.fields.name;

			if (!data_input.search("USD")) {
				if (data.list.resources[o].resource.fields.symbol == "USD=X") {
					currency_changer.all.push("USD:$-1.000000");
				} else {
					if (getSymbolFromCurrency(data_input.slice(4)) == undefined) {
						currency_changer.all.push(
							data_input.slice(4) +
								":" +
								data_input.slice(4) +
								"-" +
								data.list.resources[o].resource.fields.price
						);
					} else {
						currency_changer.all.push(
							data_input.slice(4) +
								":" +
								getSymbolFromCurrency(data_input.slice(4)) +
								"-" +
								data.list.resources[o].resource.fields.price
						);
					}
				}
			}
		}
	} catch (e) {}
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

	fs.writeFileSync(
		"data/currency_changer.json",
		JSON.stringify(currency_changer, null, 4),
		"utf-8"
	);

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
	httpGet("https://api.coinmarketcap.com/v2/global/");

	all_data.glob = data.data.quotes.USD.total_market_cap;
	active_cryptocurrencies = data.data.active_cryptocurrencies;
	let acc = 100 / ((Math.ceil(active_cryptocurrencies / 100) * 100) / 100);

	let o = 0;

	function la() {
		httpGet(
			"https://api.coinmarketcap.com/v2/ticker/?start=" +
				begin +
				"&limit=" +
				end +
				"&sort=rank&structure=array&convert=BTC"
		);
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
				all_data.coin24h_all.push(data.data[i].quotes.USD.percent_change_24h);
				all_data.website_slug.push(data.data[i].website_slug);
				fs.writeFileSync(
					"data/all_data.json",
					JSON.stringify(all_data, null, 4),
					"utf-8"
				);
			}
		} catch (e) {
			clearload();

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
			"<div>Loading Coins " + begin + "/" + active_cryptocurrencies + "</div>"
		);

		o++;

		requestAnimationFrame(la);
	}
	requestAnimationFrame(la);
};
