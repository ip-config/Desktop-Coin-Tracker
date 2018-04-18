window.coin = [];
window.coin1h = [];
window.coinm = [];
window.coinh = [];
window.coind = [];
window.coinr = [];
window.coinp = [];
window.coins = [];
window.cmc = [];
window.wahr;
window.wa;
window.amm = [];
window.kamm = [];
window.erg = [];
window.view;
window.sym = [];
window.all = [];
window.fla = false;
window.btcprice = [];
window.btca = [];
window.btcb = [];
window.btcbb = [];
window.alarm = [];
window.firstview;
window.coin1 = [];
window.coin2 = [];
window.coin3 = [];
window.coin4 = [];
window.wa1 = [];
window.wa2 = [];
window.wa3 = [];
window.wa4 = [];
window.amm1 = [];
window.amm2 = [];
window.amm3 = [];
window.amm4 = [];
window.kamm1 = [];
window.kamm2 = [];
window.kamm3 = [];
window.kamm4 = [];
window.alarm1 = [];
window.alarm2 = [];
window.alarm3 = [];
window.alarm4 = [];
window.view1 = [];
window.view2 = [];
window.view3 = [];
window.view4 = [];
window.category = [];
window.category1 = [];
window.category2 = [];
window.category3 = [];
window.category4 = [];
window.wert = ["eur", "usd"];
window.drag = ["coin", "amm", "kamm", "alarm"];
window.setflag = false;
window.forsearch = [];
window.fs = require("fs");
window.tableDragger = require("table-dragger");
window.swal = require("sweetalert2");
window.jsv = require("json-validator");
const { dialog } = require("electron").remote;

const obj = {
	Portfolio1: {},
	Portfolio2: {},
	Portfolio3: {},
	Portfolio4: {}
};

function backup() {
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

function backupload() {
	dialog.showOpenDialog(
		{
			title: "Config Load",
			defaultPath: "~/config.json"
		},
		function(result) {
			if (result.toString().indexOf("config.json") >= 0) {
				try {
					let over = fs.readFileSync(result.toString());
					let loadjson = JSON.parse(over);
					jsv.validate(loadjson, function(err, messages) {
						if (err) {
							throw err;
						}
					});
				} catch (e) {
					swal({
						title: "Your config.json is broken!",
						type: "warning",
						confirmButtonText: "Ok",
						showCancelButton: false,
						html:
							"<a class=open-in-browser onclick=jsoncheck(); href=index.html>Check</a> your config.json validation and retry something is broken"
					});
					return;
				}
				if (fs.readFileSync("config.json")) {
					coin.splice(0, coin.length);
					kamm.splice(0, kamm.length);
					amm.splice(0, amm.length);
					alarm.splice(0, alarm.length);
					fs.unlink("./config.json", err => {
						if (err) throw console.log(err);
						console.log("/config.json was deleted");
					});
				}

				first(result.toString());

				localsave();
				swal("Backup Loaded!");
				load();
				myModal.style.display = "none";
			} else {
				swal("Wrong file! Select your old config.json");
				load();
				myModal.style.display = "block";
			}
		}
	);
}

function filler() {
	let a = ["", "amm", "kamm", "alarm"];
	for (let i = 1; i < 4; i++) {
		d = eval("coin" + i);

		for (let p = 1; p < 4; p++) {
			let aa = eval("amm" + i);
			let bb = eval("kamm" + i);
			let cc = eval("alarm" + i);
			if (d.length > aa.length) {
				let f = d.length - aa.length;
				for (let o = 0; o < f; o++) {
					aa[d.length - 1] = "0";
				}
			}
			if (d.length > bb.length) {
				let f = d.length - bb.length;
				for (let o = 0; o < f; o++) {
					bb[d.length - 1] = "0";
				}
			}
			if (d.length > cc.length) {
				let f = d.length - cc.length;
				for (let o = 0; o < f; o++) {
					cc[d.length - 1] = "0";
				}
			}
		}
	}
}

function loaddef() {
	wahr = " €";
	wa = "eur";
	view = "small";
	firstview = "Portfolio1";
	coin = ["Bitcoin", "Ethereum"];
	document.getElementById("port1").checked = true;
	document.getElementById(wa).checked = true;

	alarm = ["0", "0"];
	amm = ["0", "0"];
	kamm = ["0", "0"];
	category = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
	let saved = ["", "Portfolio1", "Portfolio2", "Portfolio3", "Portfolio4"];

	for (let i = 1; i <= 4; i++) {
		let a = eval("coin" + i);
		ab = coin;

		let b = eval("wa" + i);
		bb = wa;
		b.push(bb.toString());

		let c = eval("amm" + i);
		cc = amm;

		let d = eval("kamm" + i);
		dd = kamm;

		let e = eval("alarm" + i);
		ee = alarm;

		let f = eval("view" + i);
		ff = view;

		f.push(ff.toString());
		for (let p = 0; p <= category.length - 1; p++) {
			let g = eval("category" + i);

			g.push(category[p].toString());
		}

		for (let i = 2; i < category.length + 2; i++) {
			document.getElementById(i).checked = true;
		}

		for (let o = 0; o < 2; o++) {
			a.push(ab[o]);
			c.push(cc[o]);
			d.push(dd[o]);
			e.push(ee[o]);
		}
	}

	localsave();
}

function first(file) {
	try {
		let over = fs.readFileSync(file);

		let loadjson = JSON.parse(over);

		firstview = loadjson.First_View_Portfolio;
		let t9 = firstview[9];
		let t8 = "port" + t9;
		let t5 = "Portfolio" + t9;
		document.getElementById(t8).checked = true;
		let saved = ["", "Portfolio1", "Portfolio2", "Portfolio3", "Portfolio4"];

		for (let i = 1; i <= 4; i++) {
			let a = eval("coin" + i);
			a.length = 0;
			let b = eval("wa" + i);
			b.length = 0;
			let f = eval("view" + i);
			f.length = 0;
			let c = eval("amm" + i);
			c.length = 0;
			let d = eval("kamm" + i);
			d.length = 0;
			let e = eval("alarm" + i);
			e.length = 0;
			let g = eval("category" + i);
			g.length = 0;
		}

		for (let i = 1; i <= 4; i++) {
			let a = eval("coin" + i);
			ab = eval("loadjson." + saved[i] + ".Coins");

			let b = eval("wa" + i);
			bb = eval("loadjson." + saved[i] + ".Fix_Currency");

			b.push(bb.toString());

			let c = eval("amm" + i);
			cc = eval("loadjson." + saved[i] + ".Amount");

			let d = eval("kamm" + i);
			dd = eval("loadjson." + saved[i] + ".Price_Buy");

			let e = eval("alarm" + i);
			ee = eval("loadjson." + saved[i] + ".Alarm");

			let f = eval("view" + i);
			ff = eval("loadjson." + saved[i] + ".View");
			f.push(ff.toString());

			for (
				let o = 0;
				o <= eval("loadjson." + saved[i] + ".Coins").length - 1;
				o++
			) {
				a.push(ab[o]);
				c.push(cc[o]);
				d.push(dd[o]);
				e.push(ee[o]);
			}
		}
		wa = [];
		coin = [];
		amm = [];
		kamm = [];
		alarm = [];
		view = [];

		wa = eval("loadjson." + t5 + ".Fix_Currency");
		if (wa == "eur") {
			wahr = "€";
		} else {
			wahr = "$";
		}
		coin = eval("loadjson." + t5 + ".Coins");
		amm = eval("loadjson." + t5 + ".Amount");
		kamm = eval("loadjson." + t5 + ".Price_Buy");
		alarm = eval("loadjson." + t5 + ".Alarm");
		view = eval("loadjson." + t5 + ".View");

		try {
			//for future adding new elements in cfg
			category = eval("loadjson." + t5 + ".Category");

			if (category == undefined) {
				category = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];

				for (let i = 1; i <= 4; i++) {
					for (let p = 0; p <= category.length - 1; p++) {
						let g = eval("category" + i);

						g.push(category[p].toString());
					}

					for (let i = 2; i < category.length + 2; i++) {
						document.getElementById(i).checked = true;
					}
				}
			}
			for (let i = 1; i <= 4; i++) {
				gg = eval("loadjson." + saved[i] + ".Category");

				for (let u = 0; u <= gg.length - 1; u++) {
					let g = eval("category" + i);

					g.push(gg[u]);
				}
				category = eval("loadjson." + t5 + ".Category");

				for (let i = 0; i < category.length; i++) {
					$("td:nth-child(" + category[i] + ")").show();
					document.getElementById(category[i]).checked = true;
				}
			}
		} catch (e) {}

		console.log("File load complete");
	} catch (e) {
		console.log("Failed to load the file !");
		firstview = "Portfolio1";

		swal({
			title: "Your config.json is broken!",
			type: "warning",

			cancelButtonText: "Load default config",
			confirmButtonText: "Exit",
			showCancelButton: true,

			html:
				"<a class=open-in-browser onclick=jsoncheck(); href=index.html>Check</a> your config.json validation and retry or Load default config<br><b>You won't be able to revert this!</b> Load default config resets all Coins, Amount, Price@Buy ,... "
		}).then(result => {
			if (result.value) {
				process.exit();
			} else if (result.dismiss === swal.DismissReason.cancel) {
				loaddef();
				location.reload();
			}
		});
	}

	$.get("https://api.coinmarketcap.com/v1/ticker/?limit=0", function(data) {
		for (let i = 0; i < data.length; i++) {
			cmc[i] = data[i].id;
			sym[i] = data[i].symbol;
			all[i] = cmc[i] + ": " + sym[i];
		}
		all.sort();

		if (forsearch.length > 0) {
		} else {
			for (let i = 0; i < cmc.length; i++) {
				forsearch.push(cmc[i]);
			}

			for (let i = 0; i < sym.length; i++) {
				forsearch.push(sym[i]);
			}
		}

		var select = document.getElementById("liste");
		for (x = 0; x < cmc.length; x++) {
			var opt = all[x];
			var el = document.createElement("option");
			el.textContent = opt;
			el.value = opt;

			select.appendChild(el);
		}
	});
}

function jsoncheck() {
	require("openurl").open("https://jsonlint.com/");
}

function druck() {
	let c = document.getElementById("myInput").value;
	let b = ucFirst(c);
	let d = c.toUpperCase();

	if (cmc.indexOf(c) == -1) {
		if (sym.indexOf(d) >= 0) {
			ext = sym.indexOf(d);
			let extg = ucFirst(cmc[ext]);
			if (coin.indexOf(extg) >= 0) {
				swal({
					type: "warning",
					title: "Oops...",
					text: b + " already exist!"
				});
				document.getElementById("myInput").value = "";
			} else {
				let ab = ucFirst(cmc[ext]);

				coin.push(ab);

				let d = firstview[9];
				let e = eval("coin" + d);

				if (e.indexOf(ab) >= 0) {
				} else {
					e.push(ab);
				}
				filler();
				localsave();
				load();

				document.getElementById("myInput").value = "";
			}
		} else {
			swal({
				type: "warning",
				title: "Oops...",
				text: "No " + b + " found on coinmarketcap"
			});
		}
	} else {
		if (coin.indexOf(b) >= 0) {
			swal({
				type: "warning",
				title: "Oops...",
				text: b + " already exist!"
			});
			document.getElementById("myInput").value = "";
		} else {
			let d = firstview[9];
			let e = eval("coin" + d);

			e.push(b);
			document.getElementById("cn").innerHTML = "";
			document.getElementById("myInput").value = "";
			filler();
			localsave();
			load();
		}
	}
}

function set() {
	setflag = true;
	portf();
}

Array.prototype.swapItems = function(a, b) {
	this[a] = this.splice(b, 1, this[a])[0];
	return this;
};

var startTime, countAmt, interval;

function now() {
	return new Date().getTime();
}

function tick() {
	var elapsed = now() - startTime;
	var cnt = countAmt - elapsed;
	var elem = document.getElementById("zeit");
	if (cnt > 0) {
		elem.innerHTML = minute(Math.round(cnt / 1000));
	} else {
		elem.innerHTML = "0";
		clearInterval(interval);
	}
}

function startTimer(secs) {
	clearInterval(interval);
	document.getElementById("zeit").innerHTML = minute(secs);
	countAmt = secs * 1000;
	startTime = now();
	interval = setInterval(tick, 1000);
}
function minute(secs) {
	minVar = Math.floor(secs / 60);
	secs = secs % 60;
	if (secs < 10) {
		secs = "0" + secs;
	}
	if (eval(minVar) == 0 && eval(secs) == 1) {
		load();
	}
	return "Update:&nbsp;" + minVar + ":" + secs;
}

function formatNumber(num) {
	return ("" + num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, function($1) {
		return $1 + ".";
	});
}

function del(item) {
	coin.splice(item, 1);
	kamm.splice(item, 1);
	amm.splice(item, 1);
	alarm.splice(item, 1);

	let a = firstview[9];
	let c = eval("coin" + a);
	let b = eval("amm" + a);
	let d = eval("kamm" + a);
	let e = eval("alarm" + a);

	localsave();
	load();
	myModal.style.display = "block";
	if (view == "big") {
		slim2.style.display = "none";
		stan.style.display = "block";

		nb.style.display = "none";
	} else {
		slim2.style.display = "block";
		stan.style.display = "none";

		nb.style.display = "block";
	}
}

function httpGet(theUrl) {
	var xmlHttp = new XMLHttpRequest();

	xmlHttp.open("GET", theUrl, false);
	xmlHttp.send(null);

	data2 = xmlHttp.responseText;

	data = JSON.parse(data2);
}

function farbe(i) {
	let a = coind[i];
	let b = coinh[i];
	let aa = coin[i] + "7d";
	let bb = coin[i] + "24h";
	let c = erg[i];
	let cc = coin[i] + "erg";
	let dd = coin[i] + "tp";
	let ee = coin[i] + "sp";
	let ff = coin[i] + "ergslim";
	let g = coin1h[i];
	let gg = coin[i] + "hp";
	let h = coin[i];
	let hh = coin[i] + "1h";

	if (eval(a) > 0) {
		document.getElementById(aa).style.color = "green";
		document.getElementById(dd).style.color = "green";
	} else {
		document.getElementById(aa).style.color = "red";
		document.getElementById(dd).style.color = "red";
	}

	if (eval(b) > 0) {
		document.getElementById(bb).style.color = "green";
		document.getElementById(ee).style.color = "green";
	} else {
		document.getElementById(bb).style.color = "red";
		document.getElementById(ee).style.color = "red";
	}

	if (eval(c) > 0) {
		document.getElementById(cc).style.color = "green";
		document.getElementById(ff).style.color = "green";
	} else {
		document.getElementById(cc).style.color = "red";
		document.getElementById(ff).style.color = "red";
	}
	if (eval(g) > 0) {
		document.getElementById(gg).style.color = "green";
	} else {
		document.getElementById(gg).style.color = "red";
	}

	if (hh > 0) {
		document.getElementById(hh).style.color = "green";
	} else {
		document.getElementById(hh).style.color = "red";
	}
}

function mill(x) {
	let a = coinm[x];
	let b = coin[x] + "mAll";
	let c = Trenner(Math.round(eval(a)));
	let f = coin[x] + "mAll2";
	let d = MoneyFormat(a);
	let e = (Math.round(d * 100) / 100).toLocaleString(undefined, {
		maximumFractionDigits: 2
	});

	if (eval(a) > 999999) {
		document.getElementById(b).innerHTML = "Market" + "<br>" + e + " M" + wahr;
		document.getElementById(f).innerHTML = e + " M";
	}
	if (eval(a) > 999999999) {
		document.getElementById(f).innerHTML = e + " B";
		document.getElementById(b).innerHTML = "Market" + "<br>" + e + " B" + wahr;
	}
	if (eval(a) <= 999999) {
		document.getElementById(f).innerHTML = c + " T";
		document.getElementById(b).innerHTML = "Market" + "<br>" + c + wahr;
	}
	if (eval(a) <= 999) {
		document.getElementById(f).innerHTML = c;
		document.getElementById(b).innerHTML = "Market" + "<br>" + c + wahr;
	}
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

function Trenner(Zahl) {
	Zahl = "" + Zahl;
	if (Zahl.length > 3) {
		var mod = Zahl.length % 3;
		var output = mod > 0 ? Zahl.substring(0, mod) : "";
		for (let i = 0; i < Math.floor(Zahl.length / 3); i++) {
			if (mod == 0 && i == 0)
				output += Zahl.substring(mod + 3 * i, mod + 3 * i + 3);
			else output += "." + Zahl.substring(mod + 3 * i, mod + 3 * i + 3);
		}
		return output;
	} else return Zahl;
}

function ucFirst(string) {
	return string.substring(0, 1).toUpperCase() + string.substring(1);
}
function low(string) {
	return string.substring(0, 1).toLowerCase() + string.substring(1);
}

function findLong(s) {
	return Math.max.apply(null, s.split(" ").map(w => w.length));
}

function save(i) {
	setflag = false;
	amm = [];
	kamm = [];
	alarm = [];

	let h = document.getElementById("inamm" + i).value;
	let j = document.getElementById("inprice" + i).value;
	let k = document.getElementById("alert" + i).value;

	if (isNaN(h) || h == "") {
		let a = firstview[9];
		let b = eval("amm" + a);
		b[i] = "0";

		swal({
			type: "warning",
			title: "Oops...",
			text: "Your Amount is not a valid number!"
		});

		localsave();
		load();
		return;
	}
	if (isNaN(j) || j == "") {
		let a = firstview[9];
		let c = eval("kamm" + a);
		c[i] = "0";
		swal({
			type: "warning",
			title: "Oops...",
			text: "Your Price@Buy is not a valid number!"
		});

		localsave();
		load();
		return;
	}
	if (isNaN(k) || k == "") {
		let a = firstview[9];
		let d = eval("alarm" + a);
		d[i] = "0";

		swal({
			type: "warning",
			title: "Oops...",
			text: "Your Alert is not a valid number!"
		});

		localsave();
		load();
		return;
	} else {
		hn = h.replace(/,/g, ".");
		jn = j.replace(/,/g, ".");
		kn = k.replace(/,/g, ".");

		let a = firstview[9];
		let b = eval("amm" + a);
		let c = eval("kamm" + a);
		let d = eval("alarm" + a);
		d[i] = kn;
		b[i] = hn;
		c[i] = jn;
	}

	localsave();
	load();
}

function portf(ueb) {
	waeh();

	if (document.getElementById("port1").checked) {
		firstview = "firstview1";
	}
	if (document.getElementById("port2").checked) {
		firstview = "firstview2";
	}
	if (document.getElementById("port3").checked) {
		firstview = "firstview3";
	}
	if (document.getElementById("port4").checked) {
		firstview = "firstview4";
	}

	document.getElementById("cn").innerHTML = "";
	document.getElementById("stan").innerHTML = "";
	let a = firstview[9];
	coin = [];
	coin = eval("coin" + a);
	wa = [];
	wa = eval("wa" + a);
	amm = [];
	amm = eval("amm" + a);
	kamm = [];
	kamm = eval("kamm" + a);
	alarm = [];
	alarm = eval("alarm" + a);
	view = [];
	view = eval("view" + a);
	if (wa == "eur") {
		wahr = " €";
	}
	if (wa == "usd") {
		wahr = " $";
	}
	category = [];
	category = eval("category" + a);

	for (let i = 2; i < 12; i++) {
		document.getElementById(i).checked = false;
	}
	for (let i = 0; i < category.length; i++) {
		document.getElementById(category[i]).checked = true;
	}

	localsave();
	load();

	if (ueb == undefined) {
		myModal.style.display = "none";
	} else {
		myModal.style.display = "block";
	}
}

function catsave() {
	let arr = [];
	let arr2 = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];
	$(".cat1:checked").each(function() {
		arr.push($(this).val());
	});

	let a = firstview[9];
	let c = eval("category" + a);

	c.length = 0;
	category = [];

	for (let v = 0; v < arr.length; v++) {
		c.push(arr[v]);
		category.push(arr[v]);
	}

	let flag = false;
	for (let i = 0; i <= 9; i++) {
		for (let p = 0; p < arr.length; p++) {
			if (arr2[i].indexOf(arr[p]) !== -1) {
				flag = true;
				$("td:nth-child(" + (i + 2) + ")").show();
				break;
			} else {
				flag = false;
			}
		}
		if (view == "big") {
			nb.style.display = "none";
		} else {
			nb.style.display = "block";
			if (flag == false) {
				$("td:nth-child(" + (i + 2) + ")").hide();
				flag = false;
			}
		}
	}

	localsave();
}

function localsave() {
	obj["First_View_Portfolio"] = firstview;

	obj["Portfolio1"]["Coins"] = coin1;
	obj["Portfolio1"]["Fix_Currency"] = wa1;
	obj["Portfolio1"]["Amount"] = amm1;
	obj["Portfolio1"]["Price_Buy"] = kamm1;
	obj["Portfolio1"]["Alarm"] = alarm1;
	obj["Portfolio1"]["View"] = view1;
	obj["Portfolio1"]["Category"] = category1;

	obj["Portfolio2"]["Coins"] = coin2;
	obj["Portfolio2"]["Fix_Currency"] = wa2;
	obj["Portfolio2"]["Amount"] = amm2;
	obj["Portfolio2"]["Price_Buy"] = kamm2;
	obj["Portfolio2"]["Alarm"] = alarm2;
	obj["Portfolio2"]["View"] = view2;
	obj["Portfolio2"]["Category"] = category2;

	obj["Portfolio3"]["Coins"] = coin3;
	obj["Portfolio3"]["Fix_Currency"] = wa3;
	obj["Portfolio3"]["Amount"] = amm3;
	obj["Portfolio3"]["Price_Buy"] = kamm3;
	obj["Portfolio3"]["Alarm"] = alarm3;
	obj["Portfolio3"]["View"] = view3;
	obj["Portfolio3"]["Category"] = category3;

	obj["Portfolio4"]["Coins"] = coin4;
	obj["Portfolio4"]["Fix_Currency"] = wa4;
	obj["Portfolio4"]["Amount"] = amm4;
	obj["Portfolio4"]["Price_Buy"] = kamm4;
	obj["Portfolio4"]["Alarm"] = alarm4;
	obj["Portfolio4"]["View"] = view4;
	obj["Portfolio4"]["Category"] = category4;

	try {
		fs.writeFileSync("config.json", JSON.stringify(obj, null, 4), "utf-8");
	} catch (e) {
		console.log("Failed to save the file !");
	}
}

function waeh() {
	for (let i = 0; i < wert.length; i++) {
		if (document.getElementById(wert[i]).checked) {
			wa = wert[i];
			let a = firstview[9];
			let b = eval("wa" + a);

			b[0] = [];
			b[0] = wa;
		}
	}
	if (document.getElementById("big").checked) {
		stan.style.display = "block";
		slim2.style.display = "none";
		view = "big";
		let a = firstview[9];
		let b = eval("view" + a);

		b[0] = [];
		b[0] = view;
	} else {
		stan.style.display = "none";
		slim2.style.display = "block";
		view = "small";
		let a = firstview[9];
		let b = eval("view" + a);

		b[0] = [];
		b[0] = view;
	}
	if (wa == "eur") {
		wahr = " €";
	}
	if (wa == "usd") {
		wahr = " $";
	}
}

function autocomplete(inp, arr) {
	var currentFocus;
	/*execute a function when someone writes in the text field:*/
	inp.addEventListener("input", function(e) {
		var a,
			b,
			i,
			val = this.value;
		/*close any already open lists of autocompleted values*/
		closeAllLists();
		if (!val) {
			return false;
		}
		currentFocus = -1;
		/*create a DIV element that will contain the items (values):*/
		a = document.createElement("DIV");

		a.setAttribute("id", this.id + "autocomplete-list");
		a.setAttribute("class", "autocomplete-items");
		/*append the DIV element as a child of the autocomplete container:*/
		this.parentNode.appendChild(a);
		/*for each item in the array...*/
		for (i = 0; i < arr.length; i++) {
			/*check if the item starts with the same letters as the text field value:*/
			if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
				/*create a DIV element for each matching element:*/
				b = document.createElement("DIV");
				/*make the matching letters bold:*/
				b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
				b.innerHTML += arr[i].substr(val.length);
				/*insert a input field that will hold the current array item's value:*/
				b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
				/*execute a function when someone clicks on the item value (DIV element):*/
				b.addEventListener("click", function(e) {
					/*insert the value for the autocomplete text field:*/
					inp.value = this.getElementsByTagName("input")[0].value;
					/*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
					closeAllLists();
				});
				a.appendChild(b);
			}
		}
	});
	/*execute a function presses a key on the keyboard:*/
	inp.addEventListener("keydown", function(e) {
		var x = document.getElementById(this.id + "autocomplete-list");

		if (x) x = x.getElementsByTagName("div");
		if (e.keyCode == 40) {
			/*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
			currentFocus++;
			/*and and make the current item more visible:*/
			addActive(x);
		} else if (e.keyCode == 38) {
			//up
			/*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
			currentFocus--;
			/*and and make the current item more visible:*/
			addActive(x);
		} else if (e.keyCode == 13) {
			/*If the ENTER key is pressed, prevent the form from being submitted,*/
			e.preventDefault();
			if (currentFocus > -1) {
				/*and simulate a click on the "active" item:*/
				if (x) x[currentFocus].click();
			}
		}
	});
	function addActive(x) {
		/*a function to classify an item as "active":*/
		if (!x) return false;
		/*start by removing the "active" class on all items:*/
		removeActive(x);
		if (currentFocus >= x.length) currentFocus = 0;
		if (currentFocus < 0) currentFocus = x.length - 1;
		/*add class "autocomplete-active":*/
		x[currentFocus].classList.add("autocomplete-active");
	}
	function removeActive(x) {
		/*a function to remove the "active" class from all autocomplete items:*/
		for (var i = 0; i < x.length; i++) {
			x[i].classList.remove("autocomplete-active");
		}
	}
	function closeAllLists(elmnt) {
		/*close all autocomplete lists in the document,
    except the one passed as an argument:*/
		var x = document.getElementsByClassName("autocomplete-items");
		for (var i = 0; i < x.length; i++) {
			if (elmnt != x[i] && elmnt != inp) {
				x[i].parentNode.removeChild(x[i]);
			}
		}
	}
	/*execute a function when someone clicks in the document:*/
	document.addEventListener("click", function(e) {
		closeAllLists(e.target);
	});
}

function delall() {
	coin.splice(0, coin.length);
	kamm.splice(0, kamm.length);
	amm.splice(0, amm.length);
	alarm.splice(0, alarm.length);
	document.getElementById("cn").innerHTML = "";
	localsave();
	load();
}

function topf() {
	let x = document.getElementById("topx").value;
	let f = true;
	if (x == 0) {
		swal("Enter a valid number!");
	} else {
		if (x > 50) {
			swal("You can maximal add Top50 Coins");
		} else {
			for (let i = 0; i < x; i++) {
				let b = ucFirst(cmc[i]);

				let d = firstview[9];
				let e = eval("coin" + d);

				if (e.indexOf(b) >= 0) {
				} else {
					e.push(b);
					filler();
					f = false;
				}
			}
			if (f == true) {
				swal("All coins you wish are already in list");
			}
			document.getElementById("cn").innerHTML = "";
			document.getElementById("topx").value = "0";
			localsave();
			load();
		}
	}
}

function exit() {
	modal1.style.display = "none";
}
function exit2() {
	modal2.style.display = "none";
}
