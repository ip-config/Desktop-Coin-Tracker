function load() {
	let a9 = firstview[9];
	let b9 = eval("amm" + a9);
	let c9 = eval("kamm" + a9);
	let d9 = eval("coin" + a9);
	let f9 = eval("alarm" + a9);

	amm = b9;
	kamm = c9;
	coin = d9;
	alarm = f9;

	document.getElementById("cse").innerHTML = "";
	if (view == "big" && coin.length <= 11) {
		for (let i = 0; i < coin.length + 2; i++) {
			document.getElementById("cse").innerHTML += "<br>";
		}
	}
	if (coin.length > 11) {
		if (view == "small") {
			for (let i = 0; i < coin.length - 5; i++) {
				document.getElementById("cse").innerHTML += "<br>";
			}
		}
	}
	document.getElementById("cn").innerHTML = "";
	document.getElementById("stan").innerHTML = "";
	document.getElementById("wahrung").value = wa;
	document.getElementById(wa).checked = true;

	if (view == "small") {
		nb.style.display = "block";
		slim2.style.display = "block";
		stan.style.display = "none";
		document.getElementById("small").checked = true;
	} else {
		nb.style.display = "none";
		for (let i = 0; i < coin.length + 7; i++) {
			document.getElementById("cse").innerHTML += "<br>";
		}
		slim2.style.display = "none";
		stan.style.display = "block";
		document.getElementById("big").checked = true;
	}
	//kopfzeile
	let grund =
		"<table class=tg id=slim><thead><tr class=tg-baqh><td class=tg-j2zy>Coin</td><td class=tg-j2zy>Price " +
		wahr +
		"</td><td class=tg-j2zy>Price BTC</td><td class=tg-j2zy>1H</td><td class=tg-j2zy>24H</td><td class=tg-j2zy>7D</td><td class=tg-j2zy>Market " +
		wahr +
		"</td><td class=tg-j2zy class=tab>Amount</td> <td class=tg-j2zy class=tab>Price @ Buy</td><td class=tg-j2zy class=tab>Alert&#x1f514;</td><td class=tg-j2zy>Cap " +
		wahr +
		"</td></thead></tr>";
	document.getElementById("slim2").innerHTML = grund;
	$.get("https://api.coinmarketcap.com/v1/global/?convert=" + wa, function(
		data
	) {
		glob = Math.round(data["total_market_cap_" + wa]);
		if (glob > 999999999) {
			document.getElementById("glob").innerHTML =
				(Math.round(MoneyFormat(glob) * 100) / 100).toLocaleString(undefined, {
					maximumFractionDigits: 2
				}) +
				" B " +
				wahr;
		} else {
			document.getElementById("glob").innerHTML =
				(Math.round(MoneyFormat(glob) * 100) / 100).toLocaleString(undefined, {
					maximumFractionDigits: 2
				}) +
				" M " +
				wahr;
		}
	});
	for (let o = 0; o < coin.length; o++) {
		rahmen = document.createElement("div");

		rahmen.innerHTML = "<div id=" + coin[o] + " class=tt></div>";
		document.getElementById("stan").appendChild(rahmen);

		let u = low(coin[o]);

		httpGet("https://api.coinmarketcap.com/v1/ticker/" + u + "/?convert=" + wa);

		btcprice[o] = data[0]["price_btc"];
		coin1h[o] = data[0]["percent_change_1h"];
		coinp[o] = data[0]["price_" + wa];
		coinr[o] = " #" + data[0].rank;
		coind[o] = data[0]["percent_change_7d"];
		coinh[o] = data[0]["percent_change_24h"];
		coinm[o] = Math.round(data[0]["market_cap_" + wa]);
		coins[o] = data[0]["symbol"];
		bil = "https://coincheckup.com/images/coins/" + u + ".png";

		let btc = btcprice[o];
		for (let i = 0; i < btc.length - 1; i++) {
			if (
				btc.charAt(i) == "1" ||
				btc.charAt(i) == "2" ||
				btc.charAt(i) == "3" ||
				btc.charAt(i) == "4" ||
				btc.charAt(i) == "5" ||
				btc.charAt(i) == "6" ||
				btc.charAt(i) == "7" ||
				btc.charAt(i) == "8" ||
				btc.charAt(i) == "9"
			) {
				btca.push(i);
				break;
			} else {
			}
		}

		btcb.push(btcprice[o].slice(0, btca[o]));
		btcbb.push(btcprice[o].slice(btca[o], btcprice[o].lenght));

		let a = firstview[9];
		let b = eval("alarm" + a);
		if (b[o] == 0) {
		} else {
			if (b[o] <= eval(coinp[o])) {
				swal({
					imageUrl: "https://coincheckup.com/images/coins/" + u + ".png",
					text: "ALERT! Price over " + b[o] + " " + wahr[o],
					animation: false,
					customClass: "animated tada"
				});

				b[o] = "0";
			}
		}

		erg[o] = amm[o] * coinp[o] - amm[o] * kamm[o];

		if (isNaN(erg[o]) || erg[o] == 0) {
			//big oben
			tableq =
				"<table class=tt><thead><td class=tt><span class=w>" +
				coin[o] +
				"</span><a class=w id=" +
				coin[o] +
				"rang></a><a id=" +
				coin[o] +
				"erg></a><img class=bil1 src=" +
				bil +
				" /><br><a class=tg-lqy6 style= color:grey;font-size:18px;>" +
				btcb[o] +
				"</a><a style= color:burlywood;font-size:18px;>" +
				btcbb[o] +
				" BTC</a><span id=" +
				coin[o] +
				"p></span></td></thead><tbody></tbody></table>";
		} else {
			erg[o] = Math.round(erg[o] * 100) / 100;

			tableq =
				"<table class=tt><thead><td class=tt><img src=" +
				bil +
				" class=bil1 /><span class=w>" +
				coin[o] +
				"</span><a class=w id=" +
				coin[o] +
				"rang></a><a id=" +
				coin[o] +
				"erg>  " +
				erg[o] +
				wahr +
				"</a><br><a class=tg-lqy6 style= color:grey;font-size:18px;>" +
				btcb[o] +
				"</a><a style= color:burlywood;font-size:18px;>" +
				btcbb[o] +
				" BTC</a><span id=" +
				coin[o] +
				"p> </span></td></thead><tbody></tbody></table>";
		}

		document.getElementById(coin[o]).innerHTML = tableq;
		document.getElementById(coin[o] + "rang").innerHTML = coinr[o];

		if (eval(coinp[o]) > 1) {
			document.getElementById(coin[o] + "p").innerHTML =
				"<br><font color=#FF8000>" +
				(Math.round(coinp[o] * 100) / 100).toLocaleString(undefined, {
					maximumFractionDigits: 2
				}) +
				wahr +
				"</font>";
		} else {
			document.getElementById(coin[o] + "p").innerHTML =
				"<br><font color=#FF8000>" +
				(Math.round(coinp[o] * 1000000) / 1000000).toLocaleString(undefined, {
					minimumFractionDigits: 6
				}) +
				wahr +
				"</font>";
		}

		let mAll = coinm[o];
		let h = coinh[o];
		let d = coind[o];
		let fg = coin1h[o];
		//big unten
		row =
			"<table class=tt><tbody><tr class=tt><td style= color:white; class=tt id=" +
			coin[o] +
			"mAll>" +
			mAll +
			"</td><td  class=tt id=" +
			coin[o] +
			"1h><a class=w>1h<br>%</a><br>" +
			fg +
			"</td><td  class=tt id=" +
			coin[o] +
			"24h><a class=w>24h<br>%</a><br>" +
			h +
			"</td><td class=tt id=" +
			coin[o] +
			"7d><a class=w>7 Days<br>%</a><br>" +
			d +
			"</td></tr></tbody></table>";
		if (eval(coinp[o]) > 1) {
			po = (Math.round(coinp[o] * 100) / 100).toLocaleString(undefined, {
				maximumFractionDigits: 2
			});
		} else {
			po = (Math.round(coinp[o] * 1000000) / 1000000).toLocaleString(
				undefined,
				{ minimumFractionDigits: 6 }
			);
		}
		let tp = Math.round(coind[o]);
		let sp = Math.round(coinh[o]);
		let hp = Math.round(coin1h[o]);

		if (isNaN(erg[o])) {
			erg[o] = [0];
		}
		let ala = "";

		if (b[o] == 0) {
		} else {
			document.getElementById(coin[o] + "rang").innerHTML +=
				"<a title=@" + b[o] + ">&#x1f514;</a>";
			ala = "<td title=@" + b[o] + ">&#x1f514;</td>";
		}

		let biggestamm = "0";
		let biggestkamm = "0";
		let biggestal = "0";

		for (var i = 0; i < amm.length; i++) {
			let a1 = amm[i];
			let a2 = kamm[i];
			let a3 = alarm[i];

			if (a1.length > biggestamm) {
				biggestamm = a1.toString().length;
			}
			if (a2.length > biggestkamm) {
				biggestkamm = a2.length;
			}
			if (a3.length > biggestal) {
				biggestal = a3.length;
			}
		}

		let wida = (biggestamm + 1) * 10 + "px;";
		let widk = (biggestkamm + 1) * 10 + "px;";
		let widal = (biggestal + 1) * 10 + "px;";

		let erg2 = erg[o].toLocaleString(undefined, {
			maximumFractionDigits: 2
		});

		if (fla == true) {
			slim3 =
				"<tr id=" +
				coin[o] +
				"la  class=tg-baqhtg><td class=tg-lqy6><img src=" +
				bil +
				" width=16px height=16px></img>&nbsp;" +
				coins[o] +
				"</td><td class=tg-lqy6 style= color:orange;font-size:18px;>" +
				po +
				"</td><td class=tg-lqy6 style= color:grey;font-size:18px;>" +
				btcb[o] +
				"<a style= color:burlywood;font-size:18px;>" +
				btcbb[o] +
				"</a></td><td class=tg-lqy6 id=" +
				coin[o] +
				"hp>" +
				hp +
				"</td><td class=tg-lqy6 id=" +
				coin[o] +
				"sp>" +
				sp +
				"</td><td class=tg-lqy6 id=" +
				coin[o] +
				"tp>" +
				tp +
				"</td><td class=tg-lqy6 id=" +
				coin[o] +
				"mAll2>" +
				mAll +
				"</td><td class=unt><input class=no-spinners onkeypress=this.style.width=((this.value.length+1)*10)+'px'; style=text-align:center;width:" +
				wida +
				"  type=number  id=inamm" +
				o +
				"  value=" +
				amm[o] +
				" onchange=save(" +
				o +
				")></input></td> <td class=unt><input class=no-spinners onkeypress=this.style.width=((this.value.length+1)*10)+'px';  style=text-align:center;width:" +
				widk +
				" type=number id=inprice" +
				o +
				" value=" +
				kamm[o] +
				" onchange=save(" +
				o +
				")></input></td><td class=unt><input class=no-spinners onkeypress=this.style.width=((this.value.length+1)*10)+'px'; style=text-align:center;width:" +
				widal +
				" type=number id=alert" +
				o +
				" value=" +
				b[o] +
				" onchange=save(" +
				o +
				")></input></td><td class=tg-lqy6 id=" +
				coin[o] +
				"ergslim>" +
				erg2 +
				"</td>" +
				ala;
			fla = false;
		} else {
			slim3 =
				"<tr id=" +
				coin[o] +
				"la class=tg-baqhtg style= background-color:black;><td class=tg-lqy6><img src=" +
				bil +
				" width=16px height=16px></img>&nbsp;" +
				coins[o] +
				"</td><td class=tg-lqy6 style= color:orange;font-size:18px;>" +
				po +
				"</td><td class=tg-lqy6 style= color:grey;font-size:18px;>" +
				btcb[o] +
				"<a style= color:burlywood;font-size:18px;>" +
				btcbb[o] +
				"</a></td><td class=tg-lqy6 id=" +
				coin[o] +
				"hp>" +
				hp +
				"</td><td class=tg-lqy6 id=" +
				coin[o] +
				"sp>" +
				sp +
				"</td><td class=tg-lqy6 id=" +
				coin[o] +
				"tp>" +
				tp +
				"</td><td class=tg-lqy6 id=" +
				coin[o] +
				"mAll2>" +
				mAll +
				"</td><td class=unt><input class=no-spinners onkeypress=this.style.width=((this.value.length+1)*10)+'px'; style=text-align:center;width:" +
				wida +
				"  type=number  id=inamm" +
				o +
				"  value=" +
				amm[o] +
				"  onchange=save(" +
				o +
				")></input></td> <td class=unt><input class=no-spinners onkeypress=this.style.width=((this.value.length+1)*10)+'px'; style=text-align:center;width:" +
				widk +
				" type=number id=inprice" +
				o +
				" value=" +
				kamm[o] +
				" onchange=save(" +
				o +
				")></input></td><td class=unt><input class=no-spinners onkeypress=this.style.width=((this.value.length+1)*10)+'px'; style=text-align:center;width:" +
				widal +
				" type=number id=alert" +
				o +
				" value=" +
				b[o] +
				" onchange=save(" +
				o +
				")></input></td><td class=tg-lqy6 id=" +
				coin[o] +
				"ergslim>" +
				erg2 +
				"</td>" +
				ala;
			fla = true;
		}
		document.getElementById("slim").innerHTML += slim3;

		document.getElementById("cn").innerHTML +=
			"<button type=button id=delbutton " +
			o +
			" class=css3button onclick=del(" +
			[o] +
			")>X </button>" +
			coin[o] +
			"<br>";
		document.getElementById(coin[o]).innerHTML += row;

		farbe(o);
		mill(o);

		z = 0;
		for (let i = 0; i < erg.length; i++) {
			if (isNaN(erg[i])) {
			} else {
				z = z + erg[i];
			}
		}
		if (z > 0) {
			document.getElementById("alles").style.color = "green";
		} else {
			document.getElementById("alles").style.color = "red";
		}
		z = (Math.round(z * 100) / 100).toLocaleString(undefined, {
			maximumFractionDigits: 2
		});
		document.getElementById("alles").innerHTML = z + wahr;

		var el = document.getElementById("slim");
		var dragger = tableDragger(el, {
			mode: "row",
			onlyBody: true,
			animation: 300
		});
		dragger.on("drop", function(from, to) {
			let posi1 = coin[from - 1];
			let posi2 = amm[from - 1];
			let posi3 = kamm[from - 1];
			let posi4 = alarm[from - 1];
			coin.splice(from - 1, 1);
			coin.splice(to - 1, 0, posi1);
			amm.splice(from - 1, 1);
			amm.splice(to - 1, 0, posi2);
			kamm.splice(from - 1, 1);
			kamm.splice(to - 1, 0, posi3);
			alarm.splice(from - 1, 1);
			alarm.splice(to - 1, 0, posi4);
			load();
		});

		let arr = [];
		let arr2 = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];
		$(".cat1:checked").each(function() {
			arr.push($(this).val());
		});
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
				if (flag == false) {
					nb.style.display = "block";
					$("td:nth-child(" + (i + 2) + ")").hide();
					flag = false;
				}
			}
		}

		startTimer(179);
	}

	localsave();
	erg = [];
	btca = [];
	btcb = [];
	btcbb = [];
}
