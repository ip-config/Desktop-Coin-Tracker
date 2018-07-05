let cmc = [];
let sym = [];
let id = [];
let all = [];
let coinl = [];
let coink = [];
let btcprice = [];
let coin1h = [];
let coinp = [];
let coinr = [];
let coin7d = [];
let coin24h = [];
let coinm = [];
let coinal = [];
let coinbp = [];
let coinam = [];
let fiatl;
let fiatk;
let wa;
let alsize = [];
let bil = [];
let capit = [];
let pl = [];
let btca = [];
let btcb = [];
let btcbb = [];
let view;
let nop;
let total = 0;
let firstview = "1";
let dellist = [
	"coinl",
	"coink",
	"coinam",
	"coinbp",
	"coinal",
	"alsize",
	"btcprice",
	"coin1h",
	"coin24h",
	"coin7d",
	"coinm",
	"bil",
	"coinp",
	"coinr",
	"capit",
	"btcb",
	"btcbb"
];
let Portfolio1 = {
	Coins: ["Bitcoin", "Ethereum"],
	Coinshort: ["BTC", "ETH"],
	Fix_Currency: "EUR:€",
	Amount: ["0", "0"],
	Price_Buy: ["0", "0"],
	Alert: ["0", "0"],
	Alert_direction: [">", ">"],
	View: "big",
	Category: {
		rank: true,
		price: true,
		market: true,
		pricebtcc: true,
		oneh: true,
		tfh: true,
		sevend: true,
		amount: true,
		byp: true,
		alert: true,
		capital: true,
		profit: true
	}
};
let def = {
	First_View_Portfolio: "1",
	Number_of_Portfolio: "1",
	Portfolio1
};
window.wahrung = [];
let category = {
	rank: true,
	price: true,
	market: true,
	pricebtcc: true,
	oneh: true,
	tfh: true,
	sevend: true,
	amount: true,
	byp: true,
	alert: true,
	capital: true,
	profit: true
};
let catnames = [
	"rank",
	"price",
	"market",
	"pricebtcc",
	"oneh",
	"tfh",
	"sevend",
	"amount",
	"byp",
	"alert",
	"capital",
	"profit"
];
let searchcol = [
	"thrank",
	"lp",
	"mp",
	"thbtc",
	"th1h",
	"th24h",
	"th7d",
	"thamount",
	"thpricebuy",
	"thalert",
	"pp",
	"cp"
];
let allcolid = [
	"thrank",
	"thcoin",
	"lp",
	"mp",
	"thbtc",
	"th1h",
	"th24h",
	"th7d",
	"thamount",
	"thpricebuy",
	"thalert",
	"pp",
	"cp"
];
let allcol = [
	"<th id=thrank scope=col class=cscolor>Rank</th>",
	"<th id=thcoin scope=col class=cscolor>Coin</th>",
	"<th id=lp scope=col class=cscolor>Price</th>",
	"<th id=mp scope=col class=cscolor>Market</th>",
	"<th id=thbtc scope=col class=cscolor>BTC</th>",
	"<th id=th1h scope=col class=cscolor>1h</th>",
	"<th id=th24h scope=col class=cscolor>24h</th>",
	"<th id=th7d scope=col class=cscolor>7d</th>",
	"<th id=thamount scope=col class=cscolor>Amount</th>",
	"<th id=thpricebuy scope=col class=cscolor>Price@Buy</th>",
	"<th id=thalert scope=col class=cscolor>Alert</th>",
	"<th id=pp scope=col class=cscolor>Profit</th>",
	"<th id=cp scope=col class=cscolor>Capital</th>"
];
let allcolor = [
	"1st Navbar",
	"2nd Navbar",
	"Price",
	"Category",
	"Slim head background",
	"Slim background",
	"Big background"
];
let allcolorid = [
	".justify-content-between",
	".navbarcustom",
	".pricecolor",
	".cscolor",
	".mtr2",
	".slimall",
	".bigsort"
];
let allcolortype = [
	"background-color",
	"background-color",
	"color",
	"color",
	"background-color",
	"background-color",
	"background-color"
];
let zu = 0;
let cc = 0;
let roundup = 2;
let swal = require("sweetalert2");
let path = require("path");
var moment = require("moment-timezone");
const { dialog } = require("electron").remote;
var remote = require("electron").remote;
var win = remote.getCurrentWindow();

function time() {
	var time = 1000 * 60 * 5;

	var date = new Date();

	var rounded = date.getMinutes().toString();

	if (rounded.length == 1) {
		rounded2 = parseInt(rounded);
	} else {
		rounded2 = parseInt(rounded.slice(1, 2));
	}

	if (rounded2 < 5) {
		timeclock = (5 - rounded2) * 60 - date.getSeconds() + 3;
	}
	if (rounded2 >= 5) {
		timeclock = (10 - rounded2) * 60 - date.getSeconds() + 3;
	}
	setTimeout("time()", 500);
}

$(function() {
	$("#slimtab,#bigsort").css({ height: $(window).innerHeight() - 110 });
	$(window).resize(function() {
		$("#slimtab,#bigsort").css({ height: $(window).innerHeight() - 110 });
	});
});

document.addEventListener("DOMContentLoaded", init, false);
function init() {
	$("#loading").show();
	$("#allcont").hide();
	time();

	load_process();

	$(".autocomplete").autocomplete({
		source: all,
		delay: 800,
		search: function(e, ui) {
			$(this).data("ui-autocomplete").menu.bindings = $();
		}
	});

	$(".in2").click(function(event, ui) {
		if ($(".in2").prop("checked")) {
			bigsort.style.display = "none";
			slimall.style.display = "table";
			view = "list";
		} else {
			bigsort.style.display = "block";
			slimall.style.display = "none";
			view = "big";
		}
		$("#edi").prop("checked", false);
		$(".numin").prop("disabled", true);
		$(".numin").css({
			color: "white",
			"background-color": "transparent",
			"border-style": "none"
		});
		$(".ddbt").hide();
		obj["Portfolio" + firstview]["View"] = view;
		fs.writeFileSync("config.json", JSON.stringify(obj, null, 4), "utf-8");
	});

	$("#exampleModal").on("shown.bs.modal", function() {
		$(document).off("focusin.modal");
	});

	$("#exampleModal").on("hidden.bs.modal", function() {
		$("#loading").show();
		$("#allcont").hide();
		setTimeout(function() {
			location.reload();

			$("#loading").hide();
			$("#allcont").show();
		}, 1);
	});

	$(".add").click(function() {
		let nc = $("#coinin").val();
		if (nc == "") {
			swal("You must enter a coin name!");
			return;
		}
		if (
			coinl.indexOf(erstergross(nc)) >= 0 ||
			coink.indexOf(nc.toUpperCase()) >= 0 ||
			coinl.indexOf(erstergross(nc.substring(0, nc.search(":")))) >= 0
		) {
			swal({
				type: "warning",
				title: "Oops...",
				text: "Coin " + nc + " already added!"
			});
			$("#coinin").val("");
			return;
		} else {
			if (
				cmc.indexOf(nc.toLowerCase()) >= 0 ||
				sym.indexOf(nc.toUpperCase()) >= 0 ||
				all.indexOf(nc) >= 0
			) {
				if (nc.search(":") >= 0) {
					coinl.push(erstergross(nc.substring(0, nc.search(":"))));
					coink.push(nc.substring(nc.search(":") + 2, nc.length).toUpperCase());
				} else {
					if (cmc.indexOf(nc.toLowerCase()) >= 0) {
						coinl.push(erstergross(cmc[cmc.indexOf(nc.toLowerCase())]));
						coink.push(sym[cmc.indexOf(nc.toLowerCase())]);
					}
					if (sym.indexOf(nc.toUpperCase()) >= 0) {
						coinl.push(erstergross(cmc[sym.indexOf(nc.toUpperCase())]));
						coink.push(sym[sym.indexOf(nc.toUpperCase())]);
					}
				}
			} else {
				if (nc)
					swal({
						type: "warning",
						title: "Oops...",
						text: "No " + nc + " found on coinmarketcap"
					});
				$("#coinin").val("");
				return;
			}
		}
		let u = coinl[coinl.length - 1].toLowerCase();
		let i = coinl.length - 1;
		alsize[i] = ">";

		$("#cn").append(
			"<li class=list-group-item style=text-align:center!important;>" +
				erstergross(nc.substring(0, nc.search(":"))) +
				"<button style='position:absolute;right:0;padding:1px 8px!important' type=button class='btn btn-danger' onclick=del('" +
				erstergross(nc.substring(0, nc.search(":"))) +
				"')>x</button></li>"
		);
		hide();
		save(firstview);
		$("#coinin").val("");
	});

	$(".topx").click(function() {
		let top = $("#tx").val();

		if (top == "" || top == "0") {
			swal("You must enter a number of Top X Coins you want");
			return;
		}
		let f = true;

		for (let i = 0; i < top; i++) {
			if (
				coinl.indexOf(all_data.coinl_all[i]) >= 0 ||
				coink.indexOf(all_data.coink_all[i]) >= 0
			) {
			} else {
				coinl[i] = all_data.coinl_all[i];
				coink[i] = all_data.coink_all[i];
				$("#cn").append(
					"<li class=list-group-item style=text-align:center!important;>" +
						coinl[i] +
						"<button style='position:absolute;right:0;padding:1px 8px!important' type=button class='btn btn-danger' onclick=del('" +
						coinl[i] +
						"')>x</button></li>"
				);
				f = false;
			}
		}
		filler();
		total = 0;

		save(firstview);
		if (f == true) {
			swal("All coins you wish are already in list");
		}
		$("#tx").val("");
		clearload();
	});
}

let startMouseMove = function() {
	$("#slimall").mousemove(function(e) {
		e = e || window.event;
		var cursor = { y: 0 };
		cursor.y = e.pageY; //Cursor YPos
		var papaWindow = parent.window;
		var $pxFromTop = $(papaWindow).scrollTop();

		var $userScreenHeight = $(papaWindow).height();

		if (cursor.y > ($userScreenHeight + $pxFromTop) / 1.25) {
			if ($pxFromTop < $userScreenHeight * 3.2) {
				papaWindow.scrollBy(0, $userScreenHeight / 30);
			}
		} else if (cursor.y < ($userScreenHeight + $pxFromTop) * 0.75) {
			papaWindow.scrollBy(0, -($userScreenHeight / 30));
		}
	});
};

window.clock = function() {
	$(".your-clock").FlipClock(timeclock, {
		clockFace: "MinuteCounter",
		clockFaceOptions: {
			countdown: true
		},
		onStart: function() {},
		onStop: function() {
			$(".your-clock").hide();
			$("#your_loading").show();

			load_process();
		}
	});
};

window.go = function() {
	hide();
	if (document.getElementById("edi").checked) {
		$(".numin").prop("disabled", false);
		$(".numin").css({
			color: "black",
			"background-color": "white",
			"border-style": "solid"
		});
		if (view == "big") {
			$(".tt2").show();
			$(".tt4").show();
			$(".tt5").show();
		}

		$(".ddbt").show();
	}
	$(".your-clock").show();
	$("#your_loading").hide();
	colorload();
	clock();
};

function topnavhs() {
	$("#topnav").fadeOut();
	if (nop > 1) {
		$("#psw2").fadeIn();
	}

	$(".dbtn").show();
	obj["Nav_show"] = 0;
	fs.writeFileSync("config.json", JSON.stringify(obj, null, 4), "utf-8");
}

function topnavend() {
	$("#topnav").fadeIn();
	$("#psw2").hide();
	$(".dbtn").hide();
	obj["Nav_show"] = 1;
	fs.writeFileSync("config.json", JSON.stringify(obj, null, 4), "utf-8");
}

window.array_move = function(arr, old_index, new_index) {
	if (new_index >= arr.length) {
		var k = new_index - arr.length + 1;
		while (k--) {
			arr.push(undefined);
		}
	}
	arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
	return arr;
};

var scroll = "";
var $scrollable = $("#slimtab");
function scrolling() {
	if (scroll == "up") {
		$scrollable.scrollTop($scrollable.scrollTop() - 5);
		setTimeout(scrolling, 50);
	} else if (scroll == "down") {
		$scrollable.scrollTop($scrollable.scrollTop() + 5);
		setTimeout(scrolling, 50);
	}
}

var scroll2 = "";
var $scrollable2 = $("#bigsort");
function scrolling2() {
	if (scroll2 == "up") {
		$scrollable2.scrollTop($scrollable2.scrollTop() - 5);
		setTimeout(scrolling2, 50);
	} else if (scroll2 == "down") {
		$scrollable2.scrollTop($scrollable2.scrollTop() + 5);
		setTimeout(scrolling2, 50);
	}
}

function listtoinput(id, value) {
	if (id == "wahrungx" || id == "wahrungin") {
		if (wahrung.indexOf(value) >= 0) {
		} else {
			swal("Please choose valid currency");
			return;
		}
		let old_posi = curr.fiat_name.indexOf(fiatl);
		let old_price = curr.fiat_price[old_posi];
		let new_posi = curr.fiat_name.indexOf(value);
		let new_price = curr.fiat_price[new_posi];
		for (let i = 0; i < coinl.length; i++) {
			if (coinbp[i] != 0) {
				coinbp[i] = ((coinbp[i] / old_price) * new_price).toString();
			}
			if (coinal[i] != 0) {
				coinal[i] = ((parseInt(coinal[i]) / old_price) * new_price).toString();
			}
		}

		$("#wahrungin").val(value);
		let a = $("#wahrungin").val();
		obj["Portfolio" + firstview]["Fix_Currency"] = a;
		fs.writeFileSync("config.json", JSON.stringify(obj, null, 4), "utf-8");
	}
	if (id == "coinx") {
		$("#coinin").val(value);
	}
}

function erstergross(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function rgb2hex(rgb) {
	rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
	function hex(x) {
		return ("0" + parseInt(x).toString(16)).slice(-2);
	}
	return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

function httpGet(theUrl) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", theUrl, false);

	xmlHttp.send(null);

	if (xmlHttp.status == 404) {
		swal({
			title: "Error in config.json",
			text:
				"A coin in your config.json is not on CoinMarketCap.com delete the coin manuell in config.json or delete file to load default config",
			type: "warning",

			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Default config"
		}).then(result => {
			if (result.value) {
				fs.writeFileSync("config.json", JSON.stringify(def, null, 4), "utf-8");
				location.reload();
			}
		});
	}
	data2 = xmlHttp.responseText;
	data = JSON.parse(data2);
}

window.loadall = function() {
	$("#bigsort,#slim").html("");
	dropzone.style.display = "none";

	if (parseInt(nop) > 1) {
		document.getElementById("portfnr").innerHTML = "&#160;" + firstview;
		document.getElementById("portfnr2").innerHTML = "&#160;" + firstview;
		document.getElementById("psw").style.display = "block";
	} else {
		document.getElementById("psw").style.display = "none";
	}
	all_data = JSON.parse(fs.readFileSync("data/all_data.json"));
	curr = JSON.parse(fs.readFileSync("data/currency_changer.json"));
	let curr_posi = curr.fiat_name.indexOf(fiatl);

	wahrung = curr.fiat_name;

	$(".autocomplete2").autocomplete({
		source: wahrung,
		delay: 800,
		search: function(e, ui) {
			$(this).data("ui-autocomplete").menu.bindings = $();
		}
	});
	for (let i = 0; i < wahrung.length; i++) {
		$("#wahrungdd,#wahrungin").append(
			"<a class=dropdown-item id=wahrungx onclick=listtoinput(id,this.innerHTML) data-value=" +
				i +
				">" +
				wahrung[i] +
				"</a>"
		);
	}

	onclick = "";
	glob = Math.round(all_data.glob * curr.fiat_price[curr_posi]);

	for (let i = 0; i < all_data.coinl_all.length; i++) {
		all[i] = all_data.coinl_all[i] + ": " + all_data.coink_all[i];
		$("#ddm").append(
			"<a class=dropdown-item id=coinx onclick=listtoinput(id,this.innerHTML) value=" +
				i +
				">" +
				all[i] +
				"</a>"
		);
	}
	for (let i = 0; i < coinl.length; i++) {
		let marker = all_data.coinl_all.indexOf(coinl[i]);
		if (all_data.btcprice_all[marker] == null) {
			btcprice[i] = "0";
		} else {
			btcprice[i] = all_data.btcprice_all[marker].toString();
		}
		if (all_data.coinp_all[marker] == null) {
			coinp[i] = 0;
		} else {
			coinp[i] = all_data.coinp_all[marker] * curr.fiat_price[curr_posi];
		}

		coinr[i] = all_data.coinr_all[marker];
		coinm[i] = Math.round(
			all_data.coinm_all[marker] * curr.fiat_price[curr_posi]
		);
		if (all_data.coin1h_all[marker] == null) {
			coin1h[i] = "0";
		} else {
			coin1h[i] = all_data.coin1h_all[marker];
		}
		if (all_data.coin24h_all[marker] == null) {
			coin24h[i] = "0";
		} else {
			coin24h[i] = all_data.coin24h_all[marker];
		}
		if (all_data.coin7d_all[marker] == null) {
			coin7d[i] = "0";
		} else {
			coin7d[i] = all_data.coin7d_all[marker];
		}

		bil[i] =
			"https://coincheckup.com/images/coins/" +
			all_data.website_slug[marker] +
			".png";

		if (coinl[i] == "Bitcoin") {
			btca.push(0);
		}
		if (btcprice[i] == "0") {
			btca.push("");
			btcb.push("0");
			btcbb.push("");
		} else {
			if (btcprice[i].indexOf("e") > 0) {
				let a = btcprice[i].charAt(btcprice[i].length - 1);
				let btcueb = "0.";
				let b = btcprice[i].slice(0, btcprice[i].indexOf("e"));
				let c = b.slice(0, b.indexOf(".")) + b.slice(b.indexOf(".") + 1);

				for (
					let p = 0;
					p < btcprice[i].charAt(btcprice[i].length - 1) - 1;
					p++
				) {
					btcueb += "0";
				}

				btcb.push(btcueb);
				btcbb.push(c);
				btca.push(0);
			} else {
				for (let o = 0; o < btcprice[i].length - 1; o++) {
					if (
						btcprice[i].charAt(o) == "1" ||
						btcprice[i].charAt(o) == "2" ||
						btcprice[i].charAt(o) == "3" ||
						btcprice[i].charAt(o) == "4" ||
						btcprice[i].charAt(o) == "5" ||
						btcprice[i].charAt(o) == "6" ||
						btcprice[i].charAt(o) == "7" ||
						btcprice[i].charAt(o) == "8" ||
						btcprice[i].charAt(o) == "9"
					) {
						btca.push(o);
						break;
					}
				}
				btcb.push(btcprice[i].slice(0, btca[i]));
				btcbb.push(btcprice[i].slice(btca[i], 10));
			}
		}
		filler();

		load(
			coinl[i],
			bil[i],
			coinr[i],
			btcprice[i],
			coinp[i],
			coin1h[i],
			coin24h[i],
			coin7d[i],
			coinm[i],
			coinam[i],
			coinbp[i],
			coinal[i],
			coink[i],
			capit[i],
			btcb[i],
			btcbb[i],
			alsize[i]
		);
	}
	for (let i = 0; i < coinl.length; i++) {
		pl.push(coinam[i] * coinp[i]);
	}

	plload();

	if (view == "list") {
		$(".in2").prop("checked", true);
		slimall.style.display = "table";
		bigsort.style.display = "none";
	} else {
		$(".in2").prop("checked", false);
		bigsort.style.display = "block";
		slimall.style.display = "none";
	}
	hide();

	if (view == "big") {
		$(".sortable:nth-child(odd)").css("background-color", "#1b2433");
	}
};

function rgb2hex(rgb, i) {
	rgb = rgb.match(
		/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i
	);
	return rgb && rgb.length === 4
		? "#" +
				("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
				("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
				("0" + parseInt(rgb[3], 10).toString(16)).slice(-2)
		: "";
}

function load(
	coinlong,
	bil,
	rank,
	btcp,
	coinpricetemp,
	c1h,
	c24h,
	c7d,
	cmtemp,
	cam,
	cbp,
	cal,
	coinshort,
	cap,
	btcb2,
	btcbb2,
	als
) {
	if (roundup == 0) {
		c1h = Math.round(c1h * 1) / 1;
		c24h = Math.round(c24h * 1) / 1;
		c7d = Math.round(c7d * 1) / 1;
	}

	if (cbp == "0") {
		cap = "0";
		mon = 0;
	} else {
		mon = parseFloat(cam) * coinpricetemp - parseFloat(cam) * parseFloat(cbp);

		capit.push(mon.toString());
		cap = parseFloat(capit[capit.length - 1]).toLocaleString(undefined, {
			maximumFractionDigits: roundup
		});
	}
	if (cbp == "0") {
		cap = "0";
		mon = 0;
	} else {
		if (parseFloat(cbp) < 1) {
			if (roundup == 0) {
				cbp = cbp.slice(0, ffn(cbp) + 1);
			} else {
				if (cbp.length > 10) {
					cbp = cbp.slice(0, ffn(cbp) + 3);
				}
			}
		} else {
			if (cbp.indexOf(".") == -1) {
			} else {
				if (roundup == 0) {
					cbp = cbp.slice(0, cbp.indexOf("."));
				} else {
					cbp = cbp.slice(0, cbp.indexOf(".") + 3);
				}
			}
		}
	}

	let plin = (parseFloat(cam) * coinpricetemp).toLocaleString(undefined, {
		maximumFractionDigits: roundup
	});

	if (cam == "0") {
	} else {
		if (parseInt(cam) < 1) {
			if (roundup == 0) {
				cam = cam.slice(0, ffn(cam) + 1);
			} else {
			}
		} else {
			if (roundup == 0) {
				cam = cam.slice(0, cam.indexOf("."));
			} else {
				cam = cam.slice(0, cam.indexOf(".") + 3);
			}
		}
	}

	if (glob > 999999999) {
		document.getElementById("glob").innerHTML =
			"GM: " +
			(Math.round(MoneyFormat(glob) * 100) / 100).toLocaleString(undefined, {
				maximumFractionDigits: roundup
			}) +
			" B " +
			fiatk;
	} else {
		document.getElementById("glob").innerHTML =
			"GM: " +
			(Math.round(MoneyFormat(glob) * 100) / 100).toLocaleString(undefined, {
				maximumFractionDigits: roundup
			}) +
			" M " +
			fiatk;
	}

	if (coinpricetemp > 1) {
		coinprice = (Math.round(coinpricetemp * 100) / 100).toLocaleString(
			undefined,
			{
				maximumFractionDigits: roundup
			}
		);
	} else {
		if (roundup == 2) {
			btcround = 6;
		} else {
			btcround = ffn(coinpricetemp) - 1;
		}
		coinprice = (Math.round(coinpricetemp * 1000000) / 1000000).toLocaleString(
			undefined,
			{
				minimumFractionDigits: btcround
			}
		);
	}

	let e = (Math.round(MoneyFormat(cmtemp) * 100) / 100).toLocaleString(
		undefined,
		{
			maximumFractionDigits: roundup
		}
	);
	if (cmtemp > 999999) {
		cm = e + " M ";
	}
	if (cmtemp > 999999999) {
		cm = e + " B ";
	}
	if (cmtemp <= 999999) {
		cm = e + " T ";
	}
	if (cmtemp <= 999) {
		cm = e;
	}

	if (als == "<") {
		grkl = "Smaller than";
	} else {
		grkl = "Greater than";
	}
	if (view == "big") {
		ddb =
			"<button id=aldd" +
			coinlong +
			" class='btn btn-outline-secondary dropdown-toggle ddbt' type=button data-toggle=dropdown aria-haspopup=true aria-expanded=false data-value='" +
			als +
			"'> " +
			grkl +
			"</button>	<div class='dropdown-menu pre-scrollable'  style='overflow: hidden;text-align: center !important;'><a class='dropdown-item' onclick=alchange(2,'" +
			coinlong +
			"')>Greater than</a><a class='dropdown-item' onclick=alchange(1,'" +
			coinlong +
			"')>Smaller than</a></div>";
		dda = "";
	}
	if (view == "list") {
		dda =
			"<button id=aldd" +
			coinlong +
			" class='btn btn-outline-secondary dropdown-toggle ddbt' type=button data-toggle=dropdown aria-haspopup=true aria-expanded=false data-value='" +
			als +
			"'> " +
			grkl +
			"</button>	<div class='dropdown-menu pre-scrollable'  style='overflow: hidden;text-align: center !important;'><a class='dropdown-item' onclick=alchange(2,'" +
			coinlong +
			"')>Greater than</a><a class='dropdown-item' onclick=alchange(1,'" +
			coinlong +
			"')>Smaller than</a></div>";
		ddb = "";
	}
	if (cal > 0) {
		vorz = als;
	} else {
		vorz = "";
	}

	listala = "";
	if (view == "list") {
		if (parseFloat(cal) > 0) {
			listala =
				"<td id='aler'><a title='@" +
				coinprice +
				als +
				cal +
				"'>&#x1f514;</a></td>";
		}
	}

	if (parseInt(cap) < 0) {
		cap = cap.toString().slice(1);
	}

	$("#bigsort").append(
		"<div id=" +
			coinlong +
			" class='tt sortable' data-value=" +
			coinlong +
			" ><table class=tt><tbody ><tr><td id='" +
			coinlong +
			"add' class='tt ' ></a> <img id='" +
			coinlong +
			"pic' class=bil1 src=" +
			bil +
			"></img><span class=tvhover onclick=tv('" +
			coinshort +
			"') id=" +
			coinlong +
			"ala class=w2>" +
			coinlong +
			"<a class=ra> #" +
			rank +
			"</a></span></a><br><a class=tg-lqy6 style= color:grey>" +
			btcb2 +
			"</a><a class=tg-lqy6 style= color:burlywood;>" +
			btcbb2 +
			" BTC</a><span class=w id=" +
			coinlong +
			"p><br><a id=pricecolor class=pricecolor style='position: fix;'>" +
			coinprice +
			" " +
			fiatk +
			"</a></span></td></tr></tbody></table><table ><tbody><tr class=tts><td class='tts tts2' id=" +
			coinlong +
			"1h ><a class=w2>1h&nbsp</a> <a style=color:" +
			color(c1h) +
			">" +
			check(c1h) +
			"%</a></td>	<td class='tts tts3' id=" +
			coinlong +
			"24h><a class=w2>24h&nbsp </a> <a style=color:" +
			color(c24h) +
			">" +
			check(c24h) +
			"%</td><td class='tts tts4' id=" +
			coinlong +
			"7d ><a class=w2>7d&nbsp </a> <a style=color:" +
			color(c7d) +
			">" +
			check(c7d) +
			"%</td></tr></tbody></table><table class=tt><tbody><tr class=tt><td class='ttu cscolor' id=" +
			coinlong +
			"mAll>Market<br><a class=awcolor>" +
			cm +
			"</a></td><td class='tt tt4 cscolor'>Amount<br><input type=number  class=numin  onkeyup=coinam[coinl.indexOf('" +
			coinlong +
			"')]=this.value; onkeydown=this.style.width=((this.value.length+1)*15)+'px' style='text-align: center;width:" +
			(cam.length + 1) * 15 +
			"px;' disabled=true  value=" +
			cam +
			"></input></td><td class='tt tt5 cscolor' >Price@Buy<br><input type=number class=numin onkeyup=coinbp[coinl.indexOf('" +
			coinlong +
			"')]=this.value; onkeydown=this.style.width=((this.value.length+1)*15)+'px' style='text-align: center;width:" +
			(cbp.length + 1) * 15 +
			"px;'  disabled=true value=" +
			cbp +
			"></input></td><td class='tt tt2 cscolor' >Alert<br>" +
			ddb +
			"<a>" +
			vorz +
			"</a><input type=number class=numin onkeyup=inal('" +
			coinlong +
			"',this.value) onkeydown=this.style.width=((this.value.length+1)*15)+'px' style='text-align: center;width:" +
			(cal.length + 1) * 15 +
			"px;'  disabled=true  value=" +
			cal +
			"></input></td><td class='tt tt3 cscolor' >Profit<a class=" +
			coinlong +
			"cap> <br>" +
			cap +
			"</td><td class='tt profit cscolor' >Capital<a class=" +
			coinlong +
			"pl> <br><a class=awcolor>" +
			plin +
			"</a></td></tr></tbody></table></div>"
	);
	$("#slim").append("<tr class=delrow id='" + coinlong + "maintr' ></tr>");

	for (let v = 0; v < colorder.length; v++) {
		if (colorder[v] == "thrank") {
			$("#" + coinlong + "maintr").append("<td scope=row >" + rank + "</td>");
		}

		if (colorder[v] == "thcoin") {
			$("#" + coinlong + "maintr").append(
				"<td class=tvhover onclick=tv('" +
					coinshort +
					"')><img src=" +
					bil +
					" width=16px height=16px id='" +
					coinlong +
					"pic1'></img>&nbsp;" +
					coinshort +
					"</td>"
			);
		}
		if (colorder[v] == "lp") {
			$("#" + coinlong + "maintr").append(
				"<td class=pricecolor>" + coinprice + "</td>"
			);
		}
		if (colorder[v] == "mp") {
			$("#" + coinlong + "maintr").append("<td>" + cm + "</td>");
		}
		if (colorder[v] == "thbtc") {
			$("#" + coinlong + "maintr").append(
				"<td><a class=tg-lqy6 style= color:grey>" +
					btcb2 +
					"</a><a style= color:burlywood;>" +
					btcbb2 +
					"</a></td>"
			);
		}
		if (colorder[v] == "th1h") {
			$("#" + coinlong + "maintr").append(
				"<td><a style=color:" + color(c1h) + ">" + check(c1h) + "</a></td>"
			);
		}
		if (colorder[v] == "th24h") {
			$("#" + coinlong + "maintr").append(
				"<td><a style=color:" + color(c24h) + ">" + check(c24h) + "</td>"
			);
		}
		if (colorder[v] == "th7d") {
			$("#" + coinlong + "maintr").append(
				"<td><a style=color:" + color(c7d) + ">" + check(c7d) + "</td>"
			);
		}
		if (colorder[v] == "thamount") {
			$("#" + coinlong + "maintr").append(
				"<td><input type=number class=numin onkeyup=coinam[coinl.indexOf('" +
					coinlong +
					"')]=this.value; onkeydown=this.style.width=((this.value.length+1)*15)+'px' style='text-align: center;width:" +
					(cam.length + 1) * 15 +
					"px;'  disabled=true  value=" +
					cam +
					"></input></td>"
			);
		}
		if (colorder[v] == "thpricebuy") {
			$("#" + coinlong + "maintr").append(
				"<td><input type=number class=numin onkeyup=coinbp[coinl.indexOf('" +
					coinlong +
					"')]=this.value; onkeydown=this.style.width=((this.value.length+1)*15)+'px' style='text-align: center;width:" +
					(cbp.length + 1) * 15 +
					"px;'  disabled=true  value=" +
					cbp +
					"></input></td>"
			);
		}
		if (colorder[v] == "thalert") {
			$("#" + coinlong + "maintr").append(
				"<td >" +
					dda +
					"<a>" +
					vorz +
					"</a><input type=number class=numin onkeyup=inal('" +
					coinlong +
					"',this.value) onkeydown=this.style.width=((this.value.length+1)*15)+'px' style='text-align: center;width:" +
					(cal.length + 1) * 15 +
					"px;'  disabled=true  value=" +
					cal +
					"></input></td>"
			);
		}
		if (colorder[v] == "pp") {
			$("#" + coinlong + "maintr").append(
				"<td><a class=" + coinlong + "cap >" + cap + "</td>"
			);
		}
		if (colorder[v] == "cp") {
			$("#" + coinlong + "maintr").append(
				"<td style='color:white;' class='tt profit' ><a class=" +
					coinlong +
					"pl>" +
					plin +
					"</td>"
			);
		}
	}
	$("#" + coinlong + "maintr").append(listala);
	if (view == "list") {
		document.getElementById(coinlong + "pic1").onerror = function() {
			document.getElementById(coinlong + "pic1").src = "errp.png";
		};
	}
	if (view == "big") {
		document.getElementById(coinlong + "pic").onerror = function() {
			document.getElementById(coinlong + "pic").src = "errp.png";
		};
	}

	if (cam == "0" || cam == "") {
	} else {
		if (mon > 0) {
			$("." + coinlong + "cap").css("color", "green");
		}
		if (mon < 0) {
			$("." + coinlong + "cap").css("color", "red");
		}
	}
	if (cal == "0" || cal == "") {
	} else {
		if ($("#aldd" + coinlong).data("value") == ">") {
			if (coinpricetemp > parseFloat(cal)) {
				msgal(coinlong, cal, fiatk);
			}
		}
		if ($("#aldd" + coinlong).data("value") == "<") {
			if (coinpricetemp < parseFloat(cal)) {
				msgal(coinlong, cal, fiatk);
			}
		}
	}

	if (cap == "0") {
		$("." + coinlong + "cap").css("color", "white");
	}

	total = 0;
	$.each(capit, function() {
		total += parseFloat(this);
	});

	if (view == "big") {
		if (parseFloat(cal) > 0) {
			$("#" + coinlong + "ala").append(
				"<a  title='@" + coinprice + vorz + cal + "'>&#x1f514;</a>"
			);
		}
		$(".sortable:nth-child(odd)").css("background-color", "#1b2433");
	}
}

function check(input) {
	if (input < 0) {
		input = input.toString().slice(1);
	}
	return input;
}

let flagpl = 1;
let plall = 0;
function plload() {
	try {
		let data = JSON.parse(fs.readFileSync("config.json"));
		flagpl = data.Profit_Capital;
	} catch (e) {}

	if (flagpl == undefined) {
		flagpl = 1;
	}
	$("#alles").html("");
	if (flagpl == 0) {
		for (let i = 0; i < pl.length; i++) {
			plall = plall + pl[i];
		}

		$("#alles").html(
			"Capital: " +
				plall.toLocaleString(undefined, {
					maximumFractionDigits: roundup
				}) +
				" " +
				fiatk
		);
		plall = 0;
	}

	if (flagpl == 1) {
		$("#alles").html(
			"Profit: " +
				total.toLocaleString(undefined, {
					maximumFractionDigits: roundup
				}) +
				" " +
				fiatk
		);
	}
}

function plchange() {
	if (flagpl == 0) {
		flagpl = 1;
		obj["Profit_Capital"] = flagpl;
		fs.writeFileSync("config.json", JSON.stringify(obj, null, 4), "utf-8");
		plload();
		return;
	}
	if (flagpl == 1) {
		flagpl = 0;
		obj["Profit_Capital"] = flagpl;
		fs.writeFileSync("config.json", JSON.stringify(obj, null, 4), "utf-8");
		plload();
		return;
	}
}

function inal(coinlong, thi) {
	coinal[coinl.indexOf(coinlong)] = thi;
	alsize[coinl.indexOf(coinlong)] = $("#aldd" + coinlong).data("value");
}

function msgal(o, b, wahr) {
	u = o.toLowerCase();
	swal({
		imageUrl: "https://coincheckup.com/images/coins/" + u + ".png",
		text: "ALERT! Price reached " + b + " " + wahr,
		animation: false,
		customClass: "animated tada"
	}).then(result => {
		clearload();
	});
	coinal[coinl.indexOf(o)] = "0";
	savesingle(firstview, "Alert", coinal, coinl.indexOf(o));
}

function alchange(i, coinlong2) {
	let a = "#aldd" + coinlong2;
	if (i == 1) {
		$(a).html("Smaller than");
		$(a).data("value", "<");
	}
	if (i == 2) {
		$(a).html("Greater than");
		$(a).data("value", ">");
	}
	alsize[coinl.indexOf(coinlong2)] = $("#aldd" + coinlong2).data("value");
}

function hidebig() {
	if (view == "big") {
		for (let i = 0; i < catnames.length; i++) {
			$("#" + catnames[i]).prop("checked", category[catnames[i]]);
			if (category.price == false) {
				$(".w").hide();
			}
			if (category.rank == false) {
				$(".ra").hide();
			}
			if (category.market == false) {
				$(".ttu").hide();
			}
			if (category.pricebtcc == false) {
				$(".tg-lqy6").hide();
			}
			if (category.oneh == false) {
				$(".tts2").hide();
			}
			if (category.tfh == false) {
				$(".tts3").hide();
			}

			if (category.sevend == false) {
				$(".tts4").hide();
			}
			if (category.alert == false) {
				$(".tt2").hide();
			}
			if (category.capital == false) {
				$(".tt3").hide();
			}
			if (category.amount == false) {
				$(".tt4").hide();
			}
			if (category.byp == false) {
				$(".tt5").hide();
			}
			if (category.profit == false) {
				$(".profit").hide();
			}
		}
	}
}

function del(value) {
	console.log(value);
	let b = coinl.indexOf(value);
	for (let i = 0; i < dellist.length; i++) {
		let a = eval(dellist[i]);

		a.splice(b, 1);
	}

	save(firstview);
	$("#bigsort").html("");
	$("#slim").html("");
	capit.length = 0;
	total = 0;

	for (let i = 0; i < coinl.length; i++) {
		let u = coinl[i].toLowerCase();
		load(
			coinl[i],
			bil[i],
			coinr[i],
			btcprice[i],
			coinp[i],
			coin1h[i],
			coin24h[i],
			coin7d[i],
			coinm[i],
			coinam[i],
			coinbp[i],
			coinal[i],
			coink[i],
			capit[i],
			btcb[i],
			btcbb[i],
			alsize[i]
		);
	}
	clearload();
	hide();
}

function hide() {
	hidebig();
	if (view == "big") {
		return;
	}

	for (let i = 0; i < catnames.length; i++) {
		if (category[catnames[i]] == false) {
			$("#" + catnames[i]).prop("checked", false);
		}
		if (category[catnames[i]] == true) {
			$("#" + catnames[i]).prop("checked", true);
		}
	}
}
window.first = function() {
	try {
		cf = fs.readFileSync("config.json");
		try {
			JSON.parse(cf);
		} catch (e) {
			if (e == "SyntaxError: Unexpected end of JSON input") {
				location.reload();
				return;
			}
			swal({
				type: "warning",
				title: "Your config.json is broken, check json validation",
				text: e
			});
			return;
		}
	} catch (err) {
		swal({
			title: "No config.json in Folder",
			text:
				"Copy your old config.json in programm folder, or restore default config",
			type: "warning",

			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Default config"
		}).then(result => {
			if (result.value) {
				fs.writeFileSync("config.json", JSON.stringify(def, null, 4), "utf-8");
				location.reload();
			}
		});
		return;
	}
	try {
		obj = JSON.parse(cf);
		let loadjson = obj;
		firstview = loadjson.First_View_Portfolio;

		nop = eval("loadjson.Number_of_Portfolio");
		coinl = eval("loadjson.Portfolio" + firstview + ".Coins");
		coink = eval("loadjson.Portfolio" + firstview + ".Coinshort");
		fiatl = eval("loadjson.Portfolio" + firstview + ".Fix_Currency");
		coinam = eval("loadjson.Portfolio" + firstview + ".Amount");
		coinbp = eval("loadjson.Portfolio" + firstview + ".Price_Buy");
		coinal = eval("loadjson.Portfolio" + firstview + ".Alert");
		alsize = eval("loadjson.Portfolio" + firstview + ".Alert_direction");
		view = eval("loadjson.Portfolio" + firstview + ".View");
		category = eval("loadjson.Portfolio" + firstview + ".Category");

		if (Object.keys(category).length < 12) {
			obj["Portfolio" + firstview]["Category"] = Portfolio1.Category;
			category = Portfolio1.Category;
		}
		try {
			roundup = eval("loadjson.Point_numbers");
			if (roundup == undefined) {
				roundup = 2;
			}
			if (eval("loadjson.Nav_show") == 0) {
				topnavhs();
			}

			if (roundup == 0) {
				document.getElementById("checkBox").checked = true;
			}

			colorder = eval("loadjson.Portfolio" + firstview + ".Column_order");

			if (colorder == undefined) {
				colorder = allcolid;
				for (let i = 0; i < catnames.length; i++) {
					if (category[catnames[i]] == false) {
						category[catnames[i]] = true;
					}
				}
			}

			document.getElementById("mtr2").innerHTML = "";
			for (let i = 0; i < colorder.length; i++) {
				for (let o = 0; o < allcolid.length; o++) {
					if (colorder[i] == allcolid[o]) {
						document.getElementById("mtr2").innerHTML += allcol[o];
					}
				}
			}
			fs.writeFileSync("config.json", JSON.stringify(obj, null, 4), "utf-8");
		} catch (e) {}

		for (let i = 1; i - 1 < nop; i++) {
			$("#allportin").append(
				"<th><div ><label class=switch><input class=portf id=" +
					i +
					"   type=checkbox check=false onclick=porttog(id)><span class=slider></span></label><a class=pnum>&nbsp;&nbsp;" +
					i +
					"</a></div></th>"
			);
		}
		$("#forbutton").append(
			"<button onclick=newportf() type=button class=btnnew>+</button><button onclick=delportf() type=button style=background:red class=btnnew>-</button><button onclick=dupli() type=button style=background:blue class=btnnew>&#10064;</button>"
		);
		if (alsize == undefined || alsize.length == 0) {
			for (let i = 0; i < coinl.length; i++) {
				alsize[i] = ">";
			}
		}
		for (let i = 0; i < coinl.length; i++) {
			$("#cn").append(
				"<li class=list-group-item style=text-align:center!important; value=" +
					coinl[i] +
					">" +
					coinl[i] +
					"<button style='position:absolute;right:0;padding:1px 8px!important' type=button class='btn btn-danger' onclick=del('" +
					coinl[i] +
					"')>x</button></li>"
			);
		}
		fiatk = fiatl.substring(fiatl.search(":") + 1, fiatl.length);
		wa = fiatl.substring(0, fiatl.search(":")).toLowerCase();

		$("#" + firstview).prop("checked", true);
		$("#wahrungin").val(fiatl);
		fs.writeFileSync("config.json", JSON.stringify(obj, null, 4), "utf-8");
	} catch (e) {
		if (
			e == "TypeError: Cannot set property '0' of undefined" ||
			"TypeError: Cannot read property 'Coins' of undefined"
		) {
			obj = JSON.parse(cf);
			let loadjson = obj;

			let loadold = new Object();
			loadold = {
				First_View_Portfolio: "1",
				Number_of_Portfolio: "4",
				Portfolio1: {},
				Portfolio2: {},
				Portfolio3: {},
				Portfolio4: {}
			};

			for (let o = 1; o < 5; o++) {
				coink = [];
				alsize = [];
				let b = eval("loadjson.Portfolio" + o + ".Coins");
				loadold["Portfolio" + o].Coins = b;

				setTimeout(function() {
					let y = [];
					let x = [];
					for (let i = 0; i < b.length; i++) {
						x.push(all_data.coink_all[all_data.coinl_all.indexOf(b[i])]);
						y.push(">");
					}
					loadold["Portfolio" + o].Coinshort = x;
					loadold["Portfolio" + o].Alert_direction = y;
					loadold["Portfolio" + o].Fix_Currency = "EUR:€";
					loadold["Portfolio" + o].Amount = eval(
						"loadjson.Portfolio" + o + ".Amount"
					);
					loadold["Portfolio" + o].Price_Buy = eval(
						"loadjson.Portfolio" + o + ".Price_Buy"
					);
					loadold["Portfolio" + o].Alert = eval(
						"loadjson.Portfolio" + o + ".Alarm"
					);
					loadold["Portfolio" + o].View = "list";
					loadold["Portfolio" + o].Category = {
						rank: true,
						price: true,
						market: true,
						pricebtcc: true,
						oneh: true,
						tfh: true,
						sevend: true,
						amount: true,
						byp: true,
						alert: true,
						capital: true,
						profit: true
					};

					try {
						fs.writeFileSync(
							"config.json",
							JSON.stringify(loadold, null, 4),
							"utf-8"
						);
						location.reload();
					} catch (e) {
						console.log("Failed to save the file !");
					}
				}, 300);
			}
		} else {
			swal({
				title: "Error in config.json",
				text: "Check your config.json or load default",
				type: "warning",

				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Default config"
			}).then(result => {
				if (result.value) {
					fs.writeFileSync(
						"config.json",
						JSON.stringify(def, null, 4),
						"utf-8"
					);
					location.reload();
				}
			});
		}
	}
};

function dupli() {
	swal({
		title: "Select portfolio to clone",
		html: "<input id=copy type=number></input>",
		showCancelButton: true,
		confirmButtonText: "Duplicate",
		showLoaderOnConfirm: true
	}).then(result => {
		if (result.value) {
			if (
				$("#copy").val() > nop ||
				$("#copy").val() == 0 ||
				$("#copy")
					.val()
					.toString()
					.indexOf(".") > 0 ||
				$("#copy")
					.val()
					.toString()
					.indexOf(",") > 0
			) {
				swal("Wrong input!");
			} else {
				let over = fs.readFileSync("config.json");
				let loadjson = JSON.parse(over);
				let i = parseFloat(eval("loadjson.Number_of_Portfolio")) + 1;
				let b = parseFloat(nop) + 1;
				obj["Portfolio" + i] = obj["Portfolio" + $("#copy").val()];
				obj["Number_of_Portfolio"] = b.toString();
				fs.writeFileSync("config.json", JSON.stringify(obj, null, 4), "utf-8");
				localload();
			}
		}
	});
}

function ed() {
	if (document.getElementById("edi").checked) {
		$("#slimall").addClass("draggable");
		load_js();
		$("tbody#slim").sortable({
			opacity: 0.7,
			scroll: false,
			sort: function(event, ui) {
				if (!ui.helper) return;

				if (ui.offset.top < 100) {
					scroll = "up";
				} else {
					scroll = "";
				}
				if (ui.offset.top > $(window).height() - 50) {
					scroll = "down";
				}
				scrolling();
			},
			over: function(event, ui) {
				scroll = "";
			},
			deactivate: function(event, ui) {
				scroll = "";
			},

			activate: function(event, ui) {
				$("#udbt").hide();

				dropzone.style.display = "block";
				let a = ui.item[0].id;
				vd = a.slice(0, a.indexOf("maintr"));
			},
			stop: function(event, ui) {
				$("#udbt").show();
				dropzone.style.display = "none";
				let new_index = ui.item.index();
				let old_index = coinl.indexOf(vd.slice(0, vd.indexOf("maintr")));
				for (let i = 0; i < dellist.length; i++) {
					array_move(eval(dellist[i]), old_index, new_index);
				}

				save(firstview);
			}
		});

		$(".bigsort").sortable({
			opacity: 0.7,
			items: ".sortable",
			sort: function(event, ui) {
				if (!ui.helper) return;
				if (ui.offset.top < 80) {
					scroll2 = "up";
				} else {
					scroll2 = "";
				}
				if (ui.offset.top > $(window).height() - 100) {
					scroll2 = "down";
				}
				scrolling2();
			},
			over: function(event, ui) {
				scroll2 = "";
			},
			deactivate: function(event, ui) {
				scroll2 = "";
			},
			activate: function(event, ui) {
				$("#udbt").hide();
				dropzone.style.display = "block";
				vd = ui.item[0].id;
			},
			stop: function(event, ui) {
				$("#udbt").show();
				dropzone.style.display = "none";
				let new_index = ui.item.index();
				let old_index = coinl.indexOf(vd);

				for (let i = 0; i < dellist.length; i++) {
					array_move(eval(dellist[i]), old_index, new_index);
				}
				save(firstview);
			}
		});

		$("#dropzone").droppable({
			tolerance: "touch",
			drop: function() {
				swal({
					title: "Are you sure?",
					text: "You want delete " + vd,
					type: "warning",
					showCancelButton: true,
					confirmButtonColor: "#3085d6",
					cancelButtonColor: "#d33",
					confirmButtonText: "Yes, delete it!"
				}).then(result => {
					if (result.value) {
						del(vd);
					}
				});
			}
		});
		$("#aler").hide();
		if (view == "big") {
			$(".tt2").show();
			$(".tt4").show();
			$(".tt5").show();
		}

		if (view == "list") {
			if (category.amount == false) {
				$("#mtr2").append(allcol[8]);
				$("#thamount").css("pointer-events", "none");
				for (let i = 0; i < coinl.length; i++) {
					$("#" + coinl[i] + "maintr").append(
						"<td ><input type=number class=numin onkeyup=coinam[coinl.indexOf('" +
							coinl[i] +
							"')]=this.value; onkeydown=this.style.width=((this.value.length+1)*15)+'px' style='text-align: center;width:" +
							(coinam[i].length + 1) * 15 +
							"px;'  disabled=true  value=" +
							coinam[i] +
							"></input></td>"
					);
				}
			}
			if (category.byp == false) {
				$("#mtr2").append(allcol[9]);
				$("#thpricebuy").css("pointer-events", "none");
				for (let i = 0; i < coinl.length; i++) {
					if (coinbp[i] == "0") {
						cbp = "0";
					} else {
						if (parseFloat(coinbp[i]) < 1) {
							if (roundup == 0) {
								cbp = coinbp[i].slice(0, ffn(coinbp[i]) + 1);
							} else {
								if (coinbp[i].length > 10) {
									cbp = coinbp[i].slice(0, ffn(coinbp[i]) + 3);
								} else {
									cbp = coinbp[i];
								}
							}
						} else {
							if (coinbp[i].indexOf(".") == -1) {
							} else {
								if (roundup == 0) {
									cbp = coinbp[i].slice(0, coinbp[i].indexOf("."));
								} else {
									cbp = coinbp[i].slice(0, coinbp[i].indexOf(".") + 3);
								}
							}
						}
					}
					if (coinbp[i] == "1") {
						cbp = "1";
					}
					$("#" + coinl[i] + "maintr").append(
						"<td><input type=number class=numin onkeyup=coinbp[coinl.indexOf('" +
							coinl[i] +
							"')]=this.value; onkeydown=this.style.width=((this.value.length+1)*15)+'px' style='text-align: center;width:" +
							(cbp.length + 1) * 15 +
							"px;'  disabled=true  value=" +
							cbp +
							"></input></td>"
					);
				}
			}
			if (category.alert == false) {
				$("#mtr2").append(allcol[10]);
				$("#thalert").css("pointer-events", "none");
				for (let i = 0; i < coinl.length; i++) {
					$("#" + coinl[i] + "maintr").append(
						"<td>" +
							dda +
							"<a>" +
							vorz +
							"</a><input type=number class=numin onkeyup=inal('" +
							coinl[i] +
							"',this.value) onkeydown=this.style.width=((this.value.length+1)*15)+'px' style='text-align: center;width:" +
							(coinal[i].length + 1) * 15 +
							"px;'  disabled=true  value=" +
							coinal[i] +
							"></input></td>"
					);
				}
			}
		}
		$(".sortable").css("cursor", "ns-resize");
		$(".delrow").css("cursor", "ns-resize");
		$("tbody#slim").sortable("enable");
		$("#slimall").css("pointer-events", "visible");
		$(".mtr2").css("cursor", "ew-resize");
		$(".bigsort").css("pointer-events", "visible");
		$(".bigsort").sortable("enable");
		$(".numin").prop("disabled", false);
		$(".numin").css({
			color: "black",
			"background-color": "white",
			"border-style": "solid"
		});
		$(".ddbt").show();
		if (view == "list") {
			window.resizeTo(
				document.getElementById("slim").offsetWidth + 30,
				$(window).outerHeight() + 75
			);
		}
	} else {
		$("tbody#slim").sortable("disable");
		$(".bigsort").sortable("disable");
		$(".numin").prop("disabled", true);
		$(".numin").css({
			color: "white",
			"background-color": "transparent",
			"border-style": "none"
		});
		$(".ddbt").hide();

		save(firstview);

		$("#bigsort").html("");
		$("#slim").html("");
		capit.length = 0;
		total = 0;

		for (let i = 0; i < coinl.length; i++) {
			let u = coinl[i].toLowerCase();
			load(
				coinl[i],
				bil[i],
				coinr[i],
				btcprice[i],
				coinp[i],
				coin1h[i],
				coin24h[i],
				coin7d[i],
				coinm[i],
				coinam[i],
				coinbp[i],
				coinal[i],
				coink[i],
				capit[i],
				btcb[i],
				btcbb[i],
				alsize[i]
			);
		}
		hide();

		clearload();

		if (view == "list") {
			$("#slimall").css("pointer-events", "none");
			$(".tvhover").css("pointer-events", "visible");
			window.resizeTo(
				document.getElementById("slim").offsetWidth + 30,
				$(window).outerHeight() + 75
			);
		}
	}
}

function porttog(id) {
	$(".portf").attr("disabled", false);
	$(".portf")
		.not($("#" + id).attr("disabled", true))
		.prop("checked", false);

	obj["First_View_Portfolio"] = id.toString();
	fs.writeFileSync("config.json", JSON.stringify(obj, null, 4), "utf-8");
	clearload();
}
const { webFrame } = require("electron");
window.clearload = function() {
	if (cc == 10) {
		location.reload();
		cc = 0;
	} else {
		cc++;
	}

	$("#cn,#allportin,#forbutton,#glob").html("");

	capit.length = 0;

	pl = [];
	total = 0;
	btca = [];
	btcbb = [];
	btcb = [];
	$("#edi").prop("checked", false);

	first();

	loadall();

	load_js();

	try {
		cuco = JSON.parse(fs.readFileSync("custom_color.css"));
		let i = 0;
		for (property in cuco) {
			let a = Object.values(cuco)[i];
			let b = a.slice(0, a.indexOf("#"));
			let c = a.slice(a.indexOf("#"), a.length);
			if ($(property).attr("style") == undefined) {
				d = "";
			} else {
				d = $(property).attr("style") + ";";
			}
			if (property == ".slimall") {
				$("body").css(
					"cssText",
					$("body").attr("style") + ";" + b + ":" + c + " !important"
				);
			}

			$(property).css("cssText", d + b + ":" + c + " !important");

			i++;
			custom_color[property] =
				a.slice(0, a.indexOf("#")) + a.slice(a.indexOf("#"), a.length);
		}
		if (view == "big") {
			$("#bigsort").show();
			$("#slimall").hide();
		} else {
			$("#bigsort").hide();
			$("#slimall").show();
		}
	} catch (e) {}
	$("#loading").hide();
	$("#allcont").show();
};

function npn(checked) {
	if (checked) {
		roundup = 0;
	} else {
		roundup = 2;
	}
	obj["Point_numbers"] = roundup;
	fs.writeFileSync("config.json", JSON.stringify(obj, null, 4), "utf-8");
}

function colorreset() {
	fs.unlink("custom_color.css", err => {
		if (err) throw err;
	});
	let sc = [
		"#262626",
		"FFA500",
		"FF8000",
		"FFFFFF",
		"FF0000",
		"#262626",
		"#262626",
		"#262626"
	];
	for (let i = 0; i < allcolor.length; i++) {
		$(allcolorid[i]).css(
			"cssText",
			allcolortype[i] + ":#" + sc[i] + " !important"
		);
		if (allcolorid[i] == ".slimall") {
			$("body").css("cssText", "background-color:#" + sc[i] + " !important");
		}
	}
	colorload();

	clearload();
	Object.keys(custom_color).forEach(k => delete custom_color[k]);
}

let custom_color = {};

function colorload() {
	$("#colorlist").html("");

	for (let i = 0; i < allcolor.length; i++) {
		let a = rgb2hex(
			$(allcolorid[i])
				.css(allcolortype[i])
				.toString(),
			allcolorid[i]
		);
		$("#colorlist").append(
			"	<li  class=list-group-item ><br>" +
				allcolor[i] +
				": <input id=" +
				i +
				" class=jscolor value='" +
				a.slice(1, a.length) +
				"'></input></li>"
		);
	}

	jscolor.installByClassName("jscolor");
	$(".jscolor").change(function() {
		if (view == "big") {
			$("#bigsort").show();
			$("#slimall").hide();
		} else {
			$("#bigsort").hide();
			$("#slimall").show();
		}
		let a = allcolorid[this.id];
		let b = allcolortype[this.id];
		let c = "#" + this.value;
		if ($(allcolorid[this.id]).attr("style") == undefined) {
			d = "";
		} else {
			d = $(allcolorid[this.id]).attr("style") + ";";
		}

		if (allcolorid[this.id] == ".slimall") {
			$("body").css(
				"cssText",
				$("body").attr("style") + ";" + b + ":" + c + " !important"
			);
		}

		$(allcolorid[this.id]).css(
			"cssText",
			d + allcolortype[this.id] + ":#" + this.value + "!important"
		);
		hide();
		custom_color[allcolorid[this.id]] =
			allcolortype[this.id] + "#" + this.value;
		fs.writeFileSync(
			"custom_color.css",
			JSON.stringify(custom_color, null, 4),
			"utf-8"
		);
	});
}

function tv(coin) {
	var html =
		'<html><head></head><body><div class="tradingview-widget-container"> <div id="tradingview_ee558"></div> <div class="tradingview-widget-copyright"><a href="#" onclick=openext() rel="noopener" ><span class="blue-text">' +
		coin +
		"/" +
		"USD" +
		' chart</span></a> by TradingView&nbsp;&nbsp;&nbsp;&nbsp;       USD is default fiat!<img src="https://media.go2speed.org/brand/files/tradingview/2/728x90.jpg" width="728" height="90" border="0" /></a><img src="https://tradingview.go2cloud.org/aff_i?offer_id=2&file_id=292&aff_id=11778" width="1" height="1" /></div><script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script><script>	var shell = require("electron").shell;			function openext(){shell.openExternal("https://tradingview.go2cloud.org/aff_c?offer_id=2&aff_id=11778&url_id=3")}				</script> <script type="text/javascript">	  new TradingView.widget(	  {	  "width": 980,	  "height": 610,	  "symbol": "' +
		coin +
		"USD" +
		'",	 "interval": "D",	  "timezone": "' +
		moment.tz.guess() +
		'",	  "theme": "Dark", "hide_side_toolbar":false,	  "style": "1",	  "locale": "en",	  "toolbar_bg": "#f1f3f6",	  "enable_publishing": false,	  "allow_symbol_change": true,	  "container_id": "tradingview_ee558"	}	  );	var shell = require("electron").shell;				</script></div></body></html>';
	uri = "data:text/html," + encodeURIComponent(html);
	newWindow = window.open(
		uri,
		"TradingView " + coin + "/" + "USD",
		"height=800,width=1050,x=0,y=0"
	);
}

function newportf() {
	let over = fs.readFileSync("config.json");
	let loadjson = JSON.parse(over);
	let i = parseFloat(eval("loadjson.Number_of_Portfolio")) + 1;
	let b = parseFloat(nop) + 1;
	obj["Portfolio" + i] = Portfolio1;
	obj["Number_of_Portfolio"] = b.toString();
	fs.writeFileSync("config.json", JSON.stringify(obj, null, 4), "utf-8");
	localload();
}

function ffn(string) {
	let bt = string.toString();

	for (let o = 0; o < bt.length; o++) {
		if (
			bt.charAt(o) == "1" ||
			bt.charAt(o) == "2" ||
			bt.charAt(o) == "3" ||
			bt.charAt(o) == "4" ||
			bt.charAt(o) == "5" ||
			bt.charAt(o) == "6" ||
			bt.charAt(o) == "7" ||
			bt.charAt(o) == "8" ||
			bt.charAt(o) == "9"
		) {
			return o;
			break;
		}
	}
}

function localload() {
	$("#allportin,#forbutton,#cn,#alles").html("");
	first();
	for (let i = 0; i < catnames.length; i++) {
		$("#" + catnames[i]).prop("checked", category[catnames[i]]);
	}
	if (view == "big") {
		$(".in2").prop("checked", false);
	}
	if (view == "list") {
		$(".in2").prop("checked", true);
	}
}

function delportf() {
	swal({
		title: "Select portfolio to delete",
		html:
			"<input class=numeric onkeydown=onlynum() id=delpo type=number></input>",
		showCancelButton: true,
		confirmButtonText: "Delete"
	}).then(result => {
		if (result.value) {
			if (nop == "1") {
				swal("You need at least one portfolio");
			}

			if (
				parseInt($("#delpo").val()) > parseInt(nop) ||
				parseInt($("#delpo").val()) <= 0
			) {
				swal("Wrong input!");
			} else {
				let a = $("#delpo")
					.val()
					.toString();
				if (a == nop) {
					delete obj["Portfolio" + a];
				} else {
					delete obj["Portfolio" + a];
					for (let i = parseInt(a); i < parseInt(nop); i++) {
						let b = obj["Portfolio" + (i + 1)];
						delete obj["Portfolio" + (i + 1)];
						obj["Portfolio" + i] = b;
					}
				}
				obj["Number_of_Portfolio"] = (parseInt(nop) - 1).toString();
				nop--;
				obj["Number_of_Portfolio"] = nop.toString();
				firstview = nop;
				obj["First_View_Portfolio"] = nop.toString();
				fs.writeFileSync("config.json", JSON.stringify(obj, null, 4), "utf-8");
				localload();
			}
		}
	});
}

function onlynum() {
	$(".numeric").keypress(function(event) {
		// Backspace, tab, enter, end, home, left, right
		// We don't support the del key in Opera because del == . == 46.
		var controlKeys = [8, 9, 13, 35, 36, 37, 39];
		// IE doesn't support indexOf
		var isControlKey = controlKeys.join(",").match(new RegExp(event.which));
		// Some browsers just don't raise events for control keys. Easy.
		// e.g. Safari backspace.
		if (
			!event.which || // Control keys in most browsers. e.g. Firefox tab is 0
			(48 <= event.which && event.which <= 57) || // Always 1 through 9
			(48 == event.which && $(this).attr("value")) || // No 0 first digit
			isControlKey
		) {
			// Opera assigns values for control keys.
			return;
		} else {
			event.preventDefault();
		}
	});
}

function savesingle(portfolio, id, arr, posi) {
	obj["Portfolio" + portfolio][id][posi] = eval(arr)[posi];
	fs.writeFileSync("config.json", JSON.stringify(obj, null, 4), "utf-8");
}

function catsave(id, value) {
	category[catnames[catnames.indexOf(id)]] = $("#" + id).prop("checked");
	if ($("#" + id).prop("checked") == false) {
		colorder.splice(colorder.indexOf(value), 1);
		obj["Portfolio" + firstview]["Column_order"] = colorder;

		fs.writeFileSync("config.json", JSON.stringify(obj, null, 4), "utf-8");
	}
	if ($("#" + id).prop("checked") == true) {
		if (colorder.indexOf(value) == -1) {
			colorder.push(value);
			obj["Portfolio" + firstview]["Column_order"] = colorder;

			fs.writeFileSync("config.json", JSON.stringify(obj, null, 4), "utf-8");
		}
	}
}

function save(i) {
	for (let i = 0; i < coinam.length; i++) {
		if (coinam[i] == "") {
			coinam[i] = "0";
		} else {
			if (coinam[i] == "0") {
			} else {
				if (coinam[i].indexOf("0,") >= 0 || coinam[i].indexOf("0.") >= 0) {
				} else {
					if (coinam[i].charAt(0) == 0) {
						coinam[i] = coinam[i].slice(1);
					}
				}
			}
		}
	}
	for (let i = 0; i < coinbp.length; i++) {
		if (coinbp[i] == "") {
			coinbp[i] = "0";
		} else {
			if (coinbp[i] == "0") {
			} else {
				if (coinbp[i].indexOf("0,") >= 0 || coinbp[i].indexOf("0.") >= 0) {
				} else {
					if (coinbp[i].charAt(0) == 0) {
						coinbp[i] = coinbp[i].slice(1);
					}
				}
			}
		}
	}
	for (let i = 0; i < coinal.length; i++) {
		if (coinal[i] == "") {
			coinal[i] = "0";
		} else {
			if (coinal[i] == "0") {
			} else {
				if (coinal[i].indexOf("0,") >= 0 || coinal[i].indexOf("0.") >= 0) {
				} else {
					if (coinal[i].charAt(0) == 0) {
						coinal[i] = coinal[i].slice(1);
					}
				}
			}
		}
	}

	obj["First_View_Portfolio"] = firstview;
	obj["Number_of_Portfolio"] = nop;
	obj["Portfolio" + i]["Coins"] = coinl;
	obj["Portfolio" + i]["Coinshort"] = coink;
	obj["Portfolio" + i]["Fix_Currency"] = fiatl;
	obj["Portfolio" + i]["Amount"] = coinam;
	obj["Portfolio" + i]["Price_Buy"] = coinbp;
	obj["Portfolio" + i]["Alert"] = coinal;
	obj["Portfolio" + i]["Alert_direction"] = alsize;
	obj["Portfolio" + i]["View"] = view;
	obj["Portfolio" + i]["Category"] = category;
	try {
		fs.writeFileSync("config.json", JSON.stringify(obj, null, 4), "utf-8");
	} catch (e) {
		console.log("Failed to save the file !");
	}
}

function filler() {
	let a = coinl.length;
	let b = [coinam, coinbp, coinal, alsize];
	for (let o = 0; o < b.length; o++) {
		if (b[o].length < a) {
			for (let i = b[o].length; i < a; i++) {
				if (o == 3) {
					b[o][i] = ">";
				} else {
					b[o][i] = "0";
				}
			}
		}
	}
}

function delall() {
	swal({
		title: "Are you sure?",
		html:
			"You won't be able to revert this! <b>All</b> your <b>coins</b> in <b>portfolio " +
			firstview +
			"</b> would be deleted!",
		type: "warning",

		showCancelButton: true,
		confirmButtonColor: "#3085d6",
		cancelButtonColor: "#d33",
		confirmButtonText: "Yes, delete it!"
	}).then(result => {
		if (result.value) {
			coinl.splice(0, coinl.length);
			coink.splice(0, coink.length);
			coinam.splice(0, coinam.length);
			coinbp.splice(0, coinbp.length);
			coinal.splice(0, coinal.length);
			alsize.splice(0, alsize.length);
			save(firstview);
			$("#cn").html("");
		}
	});
}

function savecfg() {
	dialog.showSaveDialog(
		{
			title: "Config Save",
			defaultPath: "~/config.json"
		},
		function(result) {
			fs.writeFile(result, JSON.stringify(obj, null, 4), function(err) {
				if (err) return alert(err);
			});
		}
	);
}

function loadcfg() {
	dialog.showOpenDialog(
		{
			title: "Config Load",
			defaultPath: "~/config.json"
		},
		function(result) {
			if (result == undefined) {
				return;
			}
			try {
				let over = fs.readFileSync(result.toString());

				loadjson99 = JSON.parse(over);
			} catch (e) {
				swal({
					type: "warning",
					title: "Your config.json is broken, check validity",
					text: e
				});
			}

			fs.writeFile("config.json", JSON.stringify(loadjson99, null, 4), function(
				err
			) {
				if (err) return alert(err);
			});

			location.reload();
		}
	);
}

function MoneyFormat(labelValue) {
	return Math.abs(Number(labelValue)) >= 1.0e9
		? Math.abs(Number(labelValue)) / 1.0e9
		: Math.abs(Number(labelValue)) >= 1.0e6
			? Math.abs(Number(labelValue)) / 1.0e6
			: // Three Zeroes for Thousands
			  Math.abs(Number(labelValue)) >= 1.0e3
				? Math.abs(Number(labelValue)) / 1.0e3
				: Math.abs(Number(labelValue));
}

function color(x) {
	if (x > 0) {
		x = "green";
	}
	if (x < 0) {
		x = "red";
	}
	return x;
}

function nextportf() {
	if (nop < parseInt(firstview) + 1) {
		firstview = "1";
		obj.First_View_Portfolio = firstview;
		fs.writeFileSync("config.json", JSON.stringify(obj, null, 4), "utf-8");

		clearload();
		$("#slimall").css("pointer-events", "none");
		$(".bigsort").css("pointer-events", "none");
		$(".tvhover").css("pointer-events", "visible");
		document.getElementById("portfnr").innerHTML = "&#160;" + firstview;
		document.getElementById("portfnr2").innerHTML = "&#160;" + firstview;
	} else {
		firstview = (parseInt(firstview) + 1).toString();
		obj.First_View_Portfolio = firstview;
		fs.writeFileSync("config.json", JSON.stringify(obj, null, 4), "utf-8");

		clearload();
		$("#slimall").css("pointer-events", "none");
		$(".bigsort").css("pointer-events", "none");
		$(".tvhover").css("pointer-events", "visible");
		document.getElementById("portfnr").innerHTML = "&#160;" + firstview;
		document.getElementById("portfnr2").innerHTML = "&#160;" + firstview;
	}
}

function bevorportf() {
	if (parseInt(firstview) <= 1) {
		firstview = nop;
		obj.First_View_Portfolio = firstview;
		fs.writeFileSync("config.json", JSON.stringify(obj, null, 4), "utf-8");

		clearload();
		$("#slimall").css("pointer-events", "none");
		$(".bigsort").css("pointer-events", "none");
		$(".tvhover").css("pointer-events", "visible");
		document.getElementById("portfnr").innerHTML = "&#160;" + firstview;
		document.getElementById("portfnr2").innerHTML = "&#160;" + firstview;
	} else {
		firstview = (parseInt(firstview) - 1).toString();
		obj.First_View_Portfolio = firstview;
		fs.writeFileSync("config.json", JSON.stringify(obj, null, 4), "utf-8");

		clearload();
		$("#slimall").css("pointer-events", "none");

		$(".bigsort").css("pointer-events", "none");
		$(".tvhover").css("pointer-events", "visible");
		document.getElementById("portfnr").innerHTML = "&#160;" + firstview;
		document.getElementById("portfnr2").innerHTML = "&#160;" + firstview;
	}
}

function load_js() {
	var head = document.getElementsByTagName("head")[0];
	var script = document.createElement("script");
	script.src = "dragtable.js";
	head.appendChild(script);
}

window.colsave = function() {
	var IDs = [];

	$("#mtr2")
		.find("th")
		.each(function() {
			IDs.push(this.id);
		});
	if (view == "list") {
		if (category.amount == false) {
			if (IDs.indexOf("thamount") >= 0) {
				IDs.splice(IDs.indexOf("thamount"), 1);
			}
		}
		if (category.byp == false) {
			if (IDs.indexOf("thpricebuy") >= 0) {
				IDs.splice(IDs.indexOf("thpricebuy"), 1);
			}
		}
		if (category.alert == false) {
			if (IDs.indexOf("thalert") >= 0) {
				IDs.splice(IDs.indexOf("thalert"), 1);
			}
		}
	}
	obj["Portfolio" + firstview]["Column_order"] = IDs;

	fs.writeFileSync("config.json", JSON.stringify(obj, null, 4), "utf-8");
};
