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
		if (Date.now() > read.time + 120000) {
			load_complete();
		} else {
			clearload();
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
					currency_changer.fiat_name.push("USD:$");
				} else {
					if (getSymbolFromCurrency(data_input.slice(4)) == undefined) {
						currency_changer.fiat_name.push(
							data_input.slice(4) + ":" + data_input.slice(4)
						);
					} else {
						currency_changer.fiat_name.push(
							data_input.slice(4) +
								":" +
								getSymbolFromCurrency(data_input.slice(4))
						);
					}
				}
				currency_changer.fiat_price.push(
					data.list.resources[o].resource.fields.price
				);
			}
		}
	} catch (e) {}

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
			$("#loading").hide();
			$("#allcont").show();
			return;
		}
		begin = begin + 100;
		end = end + 100;
		document.getElementById("p" + o).style.display = "none";
		o++;
		document.getElementById("p" + o).style.display = "block";
		requestAnimationFrame(la);
	}
	requestAnimationFrame(la);
};
