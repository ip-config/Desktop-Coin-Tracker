let cmc = [];
let sym = [];
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
let btca = [];
let btcb = [];
let btcbb = [];
let view;
let nop;
let total = 0;
let firstview = "1";
let dellist = ["coinl", "coink", "coinam", "coinbp", "coinal", "alsize"];
let Portfolio1 = {
	Coins: ["Bitcoin", "Ethereum"],
	Coinshort: ["BTC", "ETH"],
	Fix_Currency: "EUR:€",
	Amount: ["0", "0"],
	Price_Buy: ["0", "0"],
	Alert: ["0", "0"],
	Alert_direction: [">", ">"],
	View: "list",
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
		capital: true
	}
};
let def = {
	First_View_Portfolio: "1",
	Number_of_Portfolio: "1",
	Portfolio1
};
let wahrung = [
	"AUD:$",
	"BRL:R$",
	"CAD:$",
	"CHF:Fr.",
	"CLP:$",
	"CNY:¥",
	"CZK:Kč",
	"DKK:kr.",
	"EUR:€",
	"GBP:£",
	"HKD:$",
	"HUF:Ft",
	"IDR:Rp",
	"ILS:₪",
	"INR:₹",
	"JPY:¥",
	"KRW:₩",
	"MXN:$",
	"MYR:RM",
	"NOK:kr",
	"NZD:$",
	"PHP:₱",
	"PKR:Rs",
	"PLN:zł",
	"RUB:₽",
	"SEK:kr",
	"SGD:S$",
	"THB:฿",
	"TRY:₺",
	"TWD:NT$",
	"USD:$",
	"ZAR:R"
];
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
	capital: true
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
	"capital"
];
let swal = require("sweetalert2");
let path = require("path");
let fs = require("fs");
const { dialog } = require("electron").remote;

$(function() {
	if (navigator.onLine) {
	} else {
		swal({
			title: "No Internet!",
			text: "AutoRefresh in 1min, or check connection and restart program",
			timer: 60000,
			onOpen: () => {
				swal.showLoading();
			}
		}).then(result => {
			if (
				// Read more about handling dismissals
				result.dismiss === swal.DismissReason.timer
			) {
				location.reload();
			}
		});
	}

	$.get("https://api.coinmarketcap.com/v1/ticker/?limit=0", function(data) {
		for (let i = 0; i < data.length; i++) {
			cmc[i] = data[i].id;
			sym[i] = data[i].symbol;
			all[i] = cmc[i] + ": " + sym[i];
			$("#ddm").append(
				"<a class=dropdown-item id=coinx onclick=listtoinput(id,this.innerHTML) value=" +
					i +
					">" +
					all[i] +
					"</a>"
			);
		}
		all.sort();
	});
	first();
	loadall();
});
document.addEventListener("DOMContentLoaded", init, false);
function init() {
	$(".autocomplete").autocomplete({
		source: all
	});
	for (let i = 0; i < wahrung.length; i++) {
		$("#wahrungdd").append(
			"<a class=dropdown-item id=wahrungx onclick=listtoinput(id,this.innerHTML) data-value=" +
				i +
				">" +
				wahrung[i] +
				"</a>"
		);
	}

	$(".in2").click(function(event, ui) {
		if ($(".in2").prop("checked")) {
			bigsort.style.display = "none";
			slimall.style.display = "block";
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
		clearload();
	});

	$("tbody#slim").sortable({
		opacity: 0.7,
		activate: function(event, ui) {
			dropzone.style.display = "block";
			vd = ui.item[0].id;
		},
		stop: function(event, ui) {
			dropzone.style.display = "none";
			let new_index = ui.item.index();
			let old_index = coinl.indexOf(vd);
			array_move(coinl, old_index, new_index);
			array_move(coink, old_index, new_index);
			array_move(coinam, old_index, new_index);
			array_move(coinbp, old_index, new_index);
			array_move(coinal, old_index, new_index);
			save(firstview);
		}
	});
	$(".bigsort").sortable({
		opacity: 0.7,
		items: ".sortable",
		activate: function(event, ui) {
			dropzone.style.display = "block";
			vd = ui.item[0].id;
		},
		stop: function(event, ui) {
			dropzone.style.display = "none";
			let new_index = ui.item.index();
			let old_index = coinl.indexOf(vd);
			array_move(coinl, old_index, new_index);
			array_move(coink, old_index, new_index);
			array_move(coinam, old_index, new_index);
			array_move(coinbp, old_index, new_index);
			array_move(coinal, old_index, new_index);
			save(firstview);
		}
	});
	$(".sortable:nth-child(odd)").css("background-color", "#1b2433");
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

	function clock() {
		$(".your-clock").FlipClock(180, {
			clockFace: "MinuteCounter",
			clockFaceOptions: {
				countdown: true
			},
			onStart: function() {
				setTimeout(function() {
					for (let i = 0; i < coinl.length; i++) {
						let u = coinl[i].toLowerCase();
						gettaasync(u, wa, i);
					}
				}, 175000);
			},
			onStop: function() {
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
				clock();
			}
		});
	}
	clock();

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
			return;
		} else {
			if (coinl.length >= 50) {
				swal("You can maximal add 50 Coins");
				return;
			}
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
				return;
			}
		}
		let u = coinl[coinl.length - 1].toLowerCase();
		let i = coinl.length - 1;
		alsize[i] = ">";
		getta(u, wa, i);
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
		hide();
		save(firstview);
		$("#coinin").val("");
		clearload();
	});

	$(".topx").click(function() {
		let top = $("#tx").val();
		if (top == "" || top == "0") {
			swal("You must enter a number of Top X Coins you want");
			return;
		}
		let f = true;
		if (top > 50) {
			swal("You can maximal add Top50 Coins");
			return;
		}
		for (let i = 0; i < top; i++) {
			if (coinl.length >= 50) {
				swal("You can maximal add 50 Coins");
				return;
			}
			if (
				coinl.indexOf(erstergross(cmc[i])) >= 0 ||
				coink.indexOf(sym[i]) >= 0
			) {
			} else {
				coinl.push(erstergross(cmc[i]));
				coink.push(sym[i]);
				f = false;
			}
			filler();
			total = 0;
			save(firstview);
		}
		clearload();
		if (f == true) {
			swal("All coins you wish are already in list");
		}
		$("#tx").val("");
	});
}

function array_move(arr, old_index, new_index) {
	if (new_index >= arr.length) {
		var k = new_index - arr.length + 1;
		while (k--) {
			arr.push(undefined);
		}
	}
	arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
	return arr;
}

function fiat() {
	let a = $("#wahrungin").val();
	obj["Portfolio" + firstview]["Fix_Currency"] = a;
	fs.writeFileSync("config.json", JSON.stringify(obj, null, 4), "utf-8");
	clearload();
}

function listtoinput(id, value) {
	if (id == "wahrungx") {
		$("#wahrungin").val(value);
	}
	if (id == "coinx") {
		$("#coinin").val(value);
	}
}

function erstergross(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function httpGet(theUrl) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", theUrl, false);
	xmlHttp.send(null);
	data2 = xmlHttp.responseText;
	data = JSON.parse(data2);
}

function loadall() {
	$("#bigsort,#slim").html("");
	dropzone.style.display = "none";
	for (let i = 0; i < coinl.length; i++) {
		let u = coinl[i].toLowerCase();
		getta(u, wa, i);
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
	if (view == "list") {
		$(".in2").prop("checked", true);
		slimall.style.display = "block";
		bigsort.style.display = "none";
	} else {
		$(".in2").prop("checked", false);
		bigsort.style.display = "block";
		slimall.style.display = "none";
	}
	hide();
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
	$.get("https://api.coinmarketcap.com/v1/global/?convert=" + wa, function(
		data
	) {
		glob = Math.round(data["total_market_cap_" + wa]);
		if (glob > 999999999) {
			document.getElementById("glob").innerHTML =
				"GM: " +
				(Math.round(MoneyFormat(glob) * 100) / 100).toLocaleString(undefined, {
					maximumFractionDigits: 2
				}) +
				" B " +
				fiatk;
		} else {
			document.getElementById("glob").innerHTML =
				"GM: " +
				(Math.round(MoneyFormat(glob) * 100) / 100).toLocaleString(undefined, {
					maximumFractionDigits: 2
				}) +
				" M " +
				fiatk;
		}
	});
	if (coinpricetemp > 1) {
		coinprice = (Math.round(coinpricetemp * 100) / 100).toLocaleString(
			undefined,
			{
				maximumFractionDigits: 2
			}
		);
	} else {
		coinprice = (Math.round(coinpricetemp * 1000000) / 1000000).toLocaleString(
			undefined,
			{ minimumFractionDigits: 6 }
		);
	}
	let e = (Math.round(MoneyFormat(cmtemp) * 100) / 100).toLocaleString(
		undefined,
		{
			maximumFractionDigits: 2
		}
	);
	if (cmtemp > 999999) {
		cm = e + " M " + fiatk;
	}
	if (cmtemp > 999999999) {
		cm = e + " B " + fiatk;
	}
	if (cmtemp <= 999999) {
		cm = e + " T " + fiatk;
	}
	if (cmtemp <= 999) {
		cm = e + " " + fiatk;
	}
	let mon = parseFloat(cam) * coinpricetemp - parseFloat(cam) * parseFloat(cbp);
	capit.push(mon.toString());
	cap = parseFloat(capit[capit.length - 1]).toLocaleString(undefined, {
		maximumFractionDigits: 2
	});
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
	$("#bigsort").append(
		"<div id=" +
			coinlong +
			" class='tt sortable' data-value=" +
			coinlong +
			" ><table class=tt><tbody><tr><td id='" +
			coinlong +
			"add' class='tt ' ></a> <img class=bil1 src=" +
			bil +
			"><span class=w2>" +
			coinlong +
			"<a class=ra>" +
			rank +
			"</a></span></a><br><a class=tg-lqy6 style= color:grey>" +
			btcb2 +
			"</a><a class=tg-lqy6 style= color:burlywood;>" +
			btcbb2 +
			" BTC</a><span class=w id=" +
			coinlong +
			"p><br><font style='position	: fix;' color=#FF8000>" +
			coinprice +
			" " +
			fiatk +
			"</font></span></td></tr></tbody></table><table ><tbody><tr class=tts><td class='tts tts2' id=" +
			coinlong +
			"1h ><a class=w2>1h&nbsp</a> <a style=color:" +
			color(c1h) +
			">" +
			c1h +
			"%</a></td>	<td class='tts tts3' id=" +
			coinlong +
			"24h><a class=w2>24h&nbsp </a> <a style=color:" +
			color(c24h) +
			">" +
			c24h +
			"%</td><td class='tts tts4' id=" +
			coinlong +
			"7d ><a class=w2>7d&nbsp </a> <a style=color:" +
			color(c7d) +
			">" +
			c7d +
			"%</td></tr></tbody></table><table class=tt><tbody><tr class=tt><td style=color:white; class=ttu id=" +
			coinlong +
			"mAll>Market<br>" +
			cm +
			"</td><td style=color:white; class='tt tt4'>Amount<br><input type=number  class=numin  onkeyup=coinam[coinl.indexOf('" +
			coinlong +
			"')]=this.value; onkeydown=this.style.width=((this.value.length+1)*15)+'px' style='text-align: center;width:" +
			(cam.length + 1) * 15 +
			"px;' disabled=true  value=" +
			cam +
			"></input></td><td style=color:white; class='tt tt5' >Price@Buy<br><input type=number class=numin onkeyup=coinbp[coinl.indexOf('" +
			coinlong +
			"')]=this.value; onkeydown=this.style.width=((this.value.length+1)*15)+'px' style='text-align: center;width:" +
			(cbp.length + 1) * 15 +
			"px;'  disabled=true value=" +
			cbp +
			"></input></td><td style=color:white; class='tt tt2' >Alert<br>" +
			ddb +
			"<a>" +
			vorz +
			"</a><input type=number class=numin onkeyup=inal('" +
			coinlong +
			"',this.value) onkeydown=this.style.width=((this.value.length+1)*15)+'px' style='text-align: center;width:" +
			(cal.length + 1) * 15 +
			"px;'  disabled=true  value=" +
			cal +
			"></input></td><td style=color:white; class='tt tt3' >Capital<a class=" +
			coinlong +
			"cap> <br>" +
			cap +
			fiatk +
			"</td></tr></tbody></table></div>"
	);

	$("#slim").append(
		"<tr class=delrow id=" +
			coinlong +
			"><td scope=row >" +
			rank +
			"</td><td><img src=" +
			bil +
			" width=16px height=16px></img>&nbsp;" +
			coinshort +
			"</td><td style=color:orange;>" +
			coinprice +
			"</td><td>" +
			cm +
			"</td><td><a class=tg-lqy6 style= color:grey>" +
			btcb2 +
			"</a><a style= color:burlywood;>" +
			btcbb2 +
			"</a></td><td><a style=color:" +
			color(c1h) +
			">" +
			c1h +
			"</a></td><td><a style=color:" +
			color(c24h) +
			">" +
			c24h +
			"</td><td><a style=color:" +
			color(c7d) +
			">" +
			c7d +
			"</td><td><input type=number class=numin onkeyup=coinam[coinl.indexOf('" +
			coinlong +
			"')]=this.value; onkeydown=this.style.width=((this.value.length+1)*15)+'px' style='text-align: center;width:" +
			(cam.length + 1) * 15 +
			"px;'  disabled=true  value=" +
			cam +
			"></input></td><td><input type=number class=numin onkeyup=coinbp[coinl.indexOf('" +
			coinlong +
			"')]=this.value; onkeydown=this.style.width=((this.value.length+1)*15)+'px' style='text-align: center;width:" +
			(cbp.length + 1) * 15 +
			"px;'  disabled=true  value=" +
			cbp +
			"></input></td><td>" +
			dda +
			"<a>" +
			vorz +
			"</a><input type=number class=numin onkeyup=inal('" +
			coinlong +
			"',this.value) onkeydown=this.style.width=((this.value.length+1)*15)+'px' style='text-align: center;width:" +
			(cal.length + 1) * 15 +
			"px;'  disabled=true  value=" +
			cal +
			"></input></td><td><a class=" +
			coinlong +
			"cap>" +
			cap +
			fiatk +
			"</td></tr>"
	);

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
	total = 0;
	$.each(capit, function() {
		total += parseFloat(this);
	});
	document.getElementById("alles").innerHTML =
		"Profit: " +
		total.toLocaleString(undefined, {
			maximumFractionDigits: 2
		}) +
		" " +
		fiatk;
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
	});
	coinal[coinl.indexOf(o)] = "0";
	savesingle(firstview, "Alert", coinal, coinl.indexOf(o));
	clearload();
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
		}
	}
}

function del(value) {
	let item = coinl.indexOf(value);
	for (let i = 0; i < dellist.length; i++) {
		let a = eval(dellist[i]);
		a.splice(item, 1);
	}
	save(firstview);
	clearload();
}

function hide() {
	hidebig();
	if (view == "big") {
		return;
	}

	for (let i = 0; i < catnames.length; i++) {
		$("#" + catnames[i]).prop("checked", category[catnames[i]]);
		if (category[catnames[i]] == false) {
			$("td:nth-child(" + $("#" + catnames[i]).prop("value") + ")").hide();
		}
		if (category[catnames[i]] == true) {
			$("td:nth-child(" + $("#" + catnames[i]).prop("value") + ")").show();
		}
	}
}

function first() {
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
	}
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
		"<button onclick=newportf() type=button class=btnnew>+</button><button onclick=delportf() type=button style=background:red class=btnnew>-</button>"
	);
	if (alsize == undefined || alsize.length == 0) {
		for (let i = 0; i < coinl.length; i++) {
			alsize[i] = ">";
		}
	}
	for (let i = 0; i < coinl.length; i++) {
		$("#cn").append(
			"<li class=list-group-item style=text-align:center!important;>" +
				coinl[i] +
				"</li>"
		);
	}
	fiatk = fiatl.substring(fiatl.search(":") + 1, fiatl.length);
	wa = fiatl.substring(0, fiatl.search(":")).toLowerCase();
	$("#lp").html("Price " + fiatk);
	$("#" + firstview).prop("checked", true);
	$("#wahrungin").val(fiatl);
}

function ed() {
	if (document.getElementById("edi").checked) {
		$(".numin").prop("disabled", false);
		$(".numin").css({
			color: "black",
			"background-color": "white",
			"border-style": "solid"
		});
		$(".ddbt").show();
	} else {
		$(".numin").prop("disabled", true);
		$(".numin").css({
			color: "white",
			"background-color": "transparent",
			"border-style": "none"
		});
		$(".ddbt").hide();
		save(firstview);
		clearload();
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

function clearload() {
	$("#cn,#allportin,#forbutton,#glob,#alles").html("");
	capit.length = 0;
	total = 0;
	btca = [];
	btcbb = [];
	btcb = [];
	$("#edi").prop("checked", false);

	first();
	loadall();
}

function newportf() {
	let over = fs.readFileSync("config.json");
	let loadjson = JSON.parse(over);
	let i = parseFloat(eval("loadjson.Number_of_Portfolio")) + 1;
	let b = parseFloat(nop) + 1;
	obj["Portfolio" + i] = Portfolio1;
	obj["Number_of_Portfolio"] = b.toString();
	fs.writeFileSync("config.json", JSON.stringify(obj, null, 4), "utf-8");
	clearload();
}

function delportf() {
	if (nop == 1) {
		swal("You need at least one portfolio");
		return;
	}
	swal({
		title: "Are you sure?",
		text:
			"You won't be able to revert this! Your complete Portfolio " +
			nop +
			" would be deleted!",
		type: "warning",

		showCancelButton: true,
		confirmButtonColor: "#3085d6",
		cancelButtonColor: "#d33",
		confirmButtonText: "Yes, delete it!"
	}).then(result => {
		if (result.value) {
			let over = fs.readFileSync("config.json");
			let loadjson = JSON.parse(over);
			let i = parseFloat(eval("loadjson.Number_of_Portfolio"));

			let b = parseFloat(nop) - 1;
			delete obj["Portfolio" + i];
			obj["Number_of_Portfolio"] = b.toString();
			obj["First_View_Portfolio"] = b.toString();
			fs.writeFileSync("config.json", JSON.stringify(obj, null, 4), "utf-8");
			clearload();
		}
	});
}

function savesingle(portfolio, id, arr, posi) {
	obj["Portfolio" + portfolio][id][posi] = eval(arr)[posi];
	fs.writeFileSync("config.json", JSON.stringify(obj, null, 4), "utf-8");
}

function catsave(id, value) {
	$("td:nth-child(" + value + ")").toggle();
	category[catnames[catnames.indexOf(id)]] = $("#" + id).prop("checked");
	savesingle(firstview, "Category", "category", id);
	clearload();
}

function save(i) {
	for (let i = 0; i < coinam.length; i++) {
		if (coinam[i] == "") {
			coinam[i] = "0";
		}
	}
	for (let i = 0; i < coinbp.length; i++) {
		if (coinbp[i] == "") {
			coinbp[i] = "0";
		}
	}
	for (let i = 0; i < coinal.length; i++) {
		if (coinal[i] == "") {
			coinal[i] = "0";
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
		text:
			"You won't be able to revert this! All your coins in portfolio " +
			firstview +
			" would be deleted! For single delete just drag n drop on main window",
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
			clearload();
		}
	});
}

function gettaasync(u, wa, i) {
	$.ajax({
		url: "https://api.coinmarketcap.com/v1/ticker/" + u + "/?convert=" + wa,
		success: function(data) {
			btcprice[i] = data[0]["price_btc"];
			coin1h[i] = data[0]["percent_change_1h"];
			coinp[i] = data[0]["price_" + wa];
			coinr[i] = " #" + data[0].rank;
			coin7d[i] = data[0]["percent_change_7d"];
			coin24h[i] = data[0]["percent_change_24h"];
			coinm[i] = Math.round(data[0]["market_cap_" + wa]);
			bil[i] = "https://coincheckup.com/images/coins/" + u + ".png";
			let btc = btcprice[i];

			for (let o = 0; o < btc.length - 1; o++) {
				if (
					btc.charAt(o) == "1" ||
					btc.charAt(o) == "2" ||
					btc.charAt(o) == "3" ||
					btc.charAt(o) == "4" ||
					btc.charAt(o) == "5" ||
					btc.charAt(o) == "6" ||
					btc.charAt(o) == "7" ||
					btc.charAt(o) == "8" ||
					btc.charAt(o) == "9"
				) {
					btca.push(o);
					break;
				} else {
				}
			}

			btcb.push(btcprice[i].slice(0, btca[i]));
			btcbb.push(btcprice[i].slice(btca[i], btcprice[i].lenght));
		}
	});
	filler();
}

function getta(u, wa, i) {
	httpGet("https://api.coinmarketcap.com/v1/ticker/" + u + "/?convert=" + wa);
	btcprice[i] = data[0]["price_btc"];
	coin1h[i] = data[0]["percent_change_1h"];
	coinp[i] = data[0]["price_" + wa];
	coinr[i] = " #" + data[0].rank;
	coin7d[i] = data[0]["percent_change_7d"];
	coin24h[i] = data[0]["percent_change_24h"];
	coinm[i] = Math.round(data[0]["market_cap_" + wa]);
	bil[i] = "https://coincheckup.com/images/coins/" + u + ".png";
	let btc = btcprice[i];

	for (let o = 0; o < btc.length - 1; o++) {
		if (
			btc.charAt(o) == "1" ||
			btc.charAt(o) == "2" ||
			btc.charAt(o) == "3" ||
			btc.charAt(o) == "4" ||
			btc.charAt(o) == "5" ||
			btc.charAt(o) == "6" ||
			btc.charAt(o) == "7" ||
			btc.charAt(o) == "8" ||
			btc.charAt(o) == "9"
		) {
			btca.push(o);
			break;
		} else {
		}
	}
	btcb.push(btcprice[i].slice(0, btca[i]));
	btcbb.push(btcprice[i].slice(btca[i], btcprice[i].lenght));
	filler();
}

function search(nameKey, myArray) {
	for (var i = 0; i < myArray.length; i++) {
		if (myArray[i] === nameKey) {
			return myArray[i];
		}
	}
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
				console.log(result);
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
			clearload();
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
