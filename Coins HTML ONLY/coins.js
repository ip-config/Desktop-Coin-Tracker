let coin = [];
let coin1h = [];
let coinm = [];
let coinh = [];
let coind = [];
let coinr = [];
let coinp = [];
let coins = [];
let cmc = [];
let wahr;
let wa;
let amm = [];
let kamm = [];
let erg = [];
let view;
let sym = [];
let all = [];
let fla;
let btcprice = [];
let btca = [];
let btcb = [];
let btcbb= [];
let alarm = [];

function first(){

  if (localStorage.wa==undefined){
    wahr = " €"
    wa = "eur"
  }else{
  wa = JSON.parse(localStorage.wa)
  wahr = JSON.parse(localStorage.wahr)
  document.getElementById("wahrung").value = wa
  }
  document.getElementById(wa).checked = true


if (localStorage.amm == undefined){}else{
  amm = JSON.parse(localStorage.amm)
kamm = JSON.parse(localStorage.kamm)
}

if (localStorage.coin == undefined){
    coin.push("Bitcoin","Ethereum")
  }else{
    let z = JSON.parse(localStorage.coin)
   for (let i=0; i<z.length; i++){
      coin.push(z[i])
    }
  }

  if (localStorage.alarml == undefined){

    for (let i = 0; i<coin.length;i++){
      alarm.push(0)

    }}else{
      alarm = JSON.parse(localStorage.alarml)

    }


  httpGet("https://api.coinmarketcap.com/v1/ticker/?limit=0")
for (let i=0; i<data.length; i++){
  cmc[i] = (data[i].id);
  sym[i] = (data[i].symbol)
  all[i] = cmc[i]+": "+sym[i]

  }
  all.sort()



  var select = document.getElementById("liste")
                for (x=0; x<cmc.length; x++){
                  var opt = all[x];
                     var el = document.createElement("option");
                     el.textContent = opt;
                     el.value = opt;

                     select.appendChild(el);


              }

            };


function druck(){


let c = document.getElementById("liste").value
  let a = c.substring( 0, c.indexOf( ":" ) );
   let b = ucFirst(a)


if (coin.indexOf(b)>=0){
alert("Coin already exist!")
}else{
 coin.push(b)
 load()

}
settings.style.display = 'block';
slim2.style.display = 'none';
stan.style.display = 'none';
startTimer(3600)
}


function load(){


  document.getElementById("wahrung").value = wa
  document.getElementById(wa).checked = true

  if (localStorage.view==undefined){
    view="big"
    settings.style.display = 'none';
   slim2.style.display = 'none';
  stan.style.display = 'block';
  document.getElementById("big").checked = true
  }else{
    view = JSON.parse(localStorage.view)
    if (view=="big"){
      settings.style.display = 'none';
     slim2.style.display = 'none';
    stan.style.display = 'block';
    document.getElementById("big").checked = true
  }else{

    settings.style.display = 'none';
    slim2.style.display = 'block';
    stan.style.display = 'none';
  document.getElementById("small").checked = true
  }
}
let  grund = "<table class=tg id=slim><tr class=tg-baqh><td class=tg-j2zy>Coin</td><td class=tg-j2zy>Price "+wahr+"</td><td class=tg-j2zy>Price BTC</td><td class=tg-j2zy>1H</td><td class=tg-j2zy>24H</td><td class=tg-j2zy>7D</td><td class=tg-j2zy>Market"+wahr+"</td><td class=tg-j2zy>Cap"+wahr+"</td></tr></table>"
      document.getElementById("slim2").innerHTML = grund

let grund2 = "<table class=tg id=grt><tr class=tg-baqh><td class=tg-j2zy class=unt>Coin</td> <td class=tg-j2zy class=tab>Amount</td> <td class=tg-j2zy class=tab>Price @ Buy</td><td class=tg-j2zy class=tab>Alert&#x1f514;(act. Price)</td></tr></table>"
document.getElementById("newe").innerHTML = grund2

httpGet("https://api.coinmarketcap.com/v1/global/?convert="+wa)

 glob = (Math.round(data["total_market_cap_"+wa]))
 if (glob>999999999){
   document.getElementById("glob").innerHTML = ((Math.round((MoneyFormat(glob))*100)/100)+" B "+wahr);
 } else {
   document.getElementById("glob").innerHTML = ((Math.round((MoneyFormat(glob))*100)/100)+" M "+wahr);
 }




  for (let o = 0; o<coin.length; o++){
    rahmen = document.createElement("div")
  rahmen.innerHTML = "<div id="+coin[o]+" class=tt></div></div>"
  document.getElementById("stan").appendChild(rahmen)

let u = low(coin[o])

  httpGet("https://api.coinmarketcap.com/v1/ticker/"+u+"/?convert="+wa)

    btcprice[o] = (data[0]["price_btc"])
    coin1h[o] = (data[0]["percent_change_1h"])
    coinp[o] = (data[0]["price_"+wa])
    coinr[o] = (" #"+data[0].rank)
    coind[o] = (data[0]["percent_change_7d"])
    coinh[o] = (data[0]["percent_change_24h"])
    coinm[o] = (Math.round(data[0]["market_cap_"+wa]))
    coins[o] = (data[0]["symbol"])
    bil = "http://files.coinmarketcap.com.s3-website-us-east-1.amazonaws.com/static/img/coins/200x200/"+u+".png"
    bil2 = "https://files.coinmarketcap.com/static/img/coins/16x16/"+u+".png"





erg[o] = (amm[o]*coinp[o])-(amm[o]*kamm[o])

if (isNaN(erg[o]) || erg[o]==0){
  tableq = "<table class=tt><thead><td class=tt><span>"+coin[o]+"</span><a id="+coin[o]+"rang></a><a id="+coin[o]+"erg></a><img class=bil1 src="+bil+" /><br><a>"+btcprice[o]+" BTC</a><span id="+coin[o]+"p></span></td></thead><tbody></tbody></table>";

}else{

  erg[o] = Math.round(erg[o]*100)/100


tableq = "<table class=tt><thead><td class=tt><img src="+bil+" class=bil1 /><span>"+coin[o]+"</span><a id="+coin[o]+"rang></a><a id="+coin[o]+"erg>  "+erg[o]+wahr+"</a><br><a>"+btcprice[o]+" BTC</a><span id="+coin[o]+"p> </span></td></thead><tbody></tbody></table>";
}


      document.getElementById(coin[o]).innerHTML = tableq;
      document.getElementById(coin[o]+"rang").innerHTML = coinr[o];

      if (eval(coinp[o])>1){
        document.getElementById(coin[o]+"p").innerHTML = "<br><font color=#FF8000>"+(Math.round(coinp[o]*100)/100)+wahr+"</font>";
      } else     {
        document.getElementById(coin[o]+"p").innerHTML = "<br><font color=#FF8000>"+(Math.round(coinp[o]*1000000)/1000000)+wahr+"</font>";
      }

      let mAll = coinm[o]
      let h = coinh[o]
      let d = coind[o]

      row = "<table class=tt><tbody><tr class=tt><td class=tt id="+coin[o]+"mAll>"+mAll+ "</td><td class=tt id="+coin[o]+"24h><a>24h<br>%</a><br>"+h+ "</td><td class=tt id="+coin[o]+"7d><a>7 Days<br>%</a><br>"+d+ "</td></tr></tbody></table>";
      if (eval(coinp[o])>1){
               po=(Math.round(coinp[o]*100)/100)
             } else     {
               po=(Math.round(coinp[o]*1000000)/1000000)
             }
    let tp = Math.round(coind[o])
    let sp = Math.round(coinh[o])
    let hp = Math.round(coin1h[o])
    let btc = btcprice[o]

for (let i=0; i<btc.length; i++){

if ((btc.charAt(i) == "1") || (btc.charAt(i) == "2")|| (btc.charAt(i) == "3")|| (btc.charAt(i) == "4")|| (btc.charAt(i) == "5")|| (btc.charAt(i) == "6")|| (btc.charAt(i) == "7")|| (btc.charAt(i) == "8")|| (btc.charAt(i) == "9")){


btca.push(i)
break
}else {}
}
btcb.push(btcprice[o].slice(0, btca[o]))
btcbb.push(btcprice[o].slice(btca[o], btcprice[o].lenght))

if (isNaN(erg[o])){
  erg[o]= [0]
}
let ala =""

if (alarm[o]==0){}else{
  document.getElementById(coin[o]+"rang").innerHTML += "<a title=@"+alarm[o]+">&#x1f514;</a>"
 ala = "<td title=@"+alarm[o]+">&#x1f514;</td>"
}

if (fla==true){
     slim3 =   "<tr  class=tg-baqhtg><td class=tg-lqy6><img src="+bil2+" width=16px height=16px></img>&nbsp;"+coins[o]+"</td><td class=tg-lqy6 style= color:orange;font-size:18px;>"+po+"</td><td class=tg-lqy6 style= color:grey;font-size:18px;>"+btcb[o]+"<a style= color:burlywood;font-size:18px;>"+btcbb[o]+"</a></td><td class=tg-lqy6 id="+coin[o]+"hp>"+hp+"</td><td class=tg-lqy6 id="+coin[o]+"sp>"+sp+"</td><td class=tg-lqy6 id="+coin[o]+"tp>"+tp+"</td><td class=tg-lqy6 id="+coin[o]+"mAll2>"+mAll+"</td><td class=tg-lqy6 id="+coin[o]+"ergslim>"+erg[o]+"</td>"+ala
fla = false

}else{
   slim3 =   "<tr class=tg-baqhtg style= background-color:black;><td class=tg-lqy6><img src="+bil2+" width=16px height=16px></img>&nbsp;"+coins[o]+"</td><td class=tg-lqy6 style= color:orange;font-size:18px;>"+po+"</td><td class=tg-lqy6 style= color:grey;font-size:18px;>"+btcb[o]+"<a style= color:burlywood;font-size:18px;>"+btcbb[o]+"</a></td><td class=tg-lqy6 id="+coin[o]+"hp>"+hp+"</td><td class=tg-lqy6 id="+coin[o]+"sp>"+sp+"</td><td class=tg-lqy6 id="+coin[o]+"tp>"+tp+"</td><td class=tg-lqy6 id="+coin[o]+"mAll2>"+mAll+"</td><td class=tg-lqy6 id="+coin[o]+"ergslim>"+erg[o]+"</td>"+ala
fla = true

}
          document.getElementById("slim").innerHTML += slim3


        document.getElementById(coin[o]).innerHTML += row;

      farbe(o)
        mill(o)

         z = 0
        for (let i=0; i<(erg.length);i++){
          if(isNaN(erg[i])){}else{
          z = z+erg[i]
}
        }
        if (z>0){
          document.getElementById("alles").style.color = 'green';
        } else {
          document.getElementById("alles").style.color = 'red';
        }
      z=  Math.round(z*100)/100
        document.getElementById("alles").innerHTML =  z+wahr;



     if (amm[o] ==  undefined){

          roww =   "<tr><td class=unt><img src="+bil2+" width=16px height=16px></img>&nbsp"+coins[o]+"&nbsp;</td><td class=unt><input  type=number;  id=inamm"+o+"  value=0 ></input></td> <td class=unt><input type=number id=inprice"+o+" value=0></input></td><td class=unt><input type=number id=alert"+o+" value=0>("+po+")</input></td><td ><button type=button id=plus value="+coin[o]+" onclick=hoch(value)>&#8593</button></td><td><button type=button value="+coin[o]+" id=minus onclick=runter(value)>&#8595</button></td><td><button type=button id=delbutton"+o+" onclick=del("+[o]+")>X</button></td></tr></table>"

      }
      else{
          roww =   "<tr><td class=unt><img src="+bil2+" width=16px height=16px></img>&nbsp"+coins[o]+"&nbsp;</td><td class=unt><input  type=number;  id=inamm"+o+"  value="+amm[o]+" ></input></td> <td class=unt><input type=number id=inprice"+o+" value="+kamm[o]+"></input></td><td class=unt><input type=number id=alert"+o+" value="+alarm[o]+">("+po+")</input></td><td ><button type=button id=plus value="+coin[o]+" onclick=hoch(value)>&#8593</button></td><td><button type=button value="+coin[o]+" id=minus onclick=runter(value)>&#8595</button></td><td><button type=button id=delbutton"+o+" onclick=del("+[o]+")>X</button></td></tr></table>"
 }


         document.getElementById("grt").innerHTML += roww;




if (alarm[o]==0){}else{

  if (alarm[o]<=eval(coinp[o])){
    alert(coin[o]+" Alert!! Price over "+alarm[o])
    alarm[o]=0

  }
}


  startTimer(180);
      }





localsave()

}

function set(){
startTimer(3600)
  settings.style.display = 'block';
  slim2.style.display = 'none';
  stan.style.display = 'none';

}

Array.prototype.swapItems = function(a, b){
    this[a] = this.splice(b, 1, this[a])[0];
    return this;
}

function hoch(x){
let za = coin.indexOf(x)
if (za==0){}else{
coin.swapItems(za, za-1)
amm.swapItems(za, za-1)
kamm.swapItems(za, za-1)
alarm.swapItems(za, za-1)
load()
set()

}
}

function runter(x){
let za = coin.indexOf(x)
if (za==coin.length-1){}else{
coin.swapItems(za, za+1)
amm.swapItems(za, za+1)
kamm.swapItems(za, za+1)
alarm.swapItems(za, za+1)
load()
set()

}
}



function save(){

amm = []
kamm = []

  for (let i=0; i<coin.length; i++){


let h = document.getElementById("inamm"+i).value
let j = document.getElementById("inprice"+i).value
let k = document.getElementById("alert"+i).value
hn = h.replace(/,/g, '.')
jn = j.replace(/,/g, '.')
kn = k.replace(/,/g, '.')


alarm[i]=kn
amm.push(hn)
kamm.push(jn)

};


localStorage["kamm"] = JSON.stringify(kamm);
localStorage["amm"] = JSON.stringify(amm);
localStorage["alarml"] = JSON.stringify(alarm);
waeh()
load()
location.reload()

}

var startTime, countAmt, interval;

function now() {
  return ((new Date()).getTime());
}

function tick() {
  var elapsed = now() - startTime;
  var cnt = countAmt - elapsed;
  var elem = document.getElementById("zeit");
  if (cnt > 0) {
    elem.innerHTML = minute(Math.round(cnt / 1000))
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
function minute(secs){
    minVar = Math.floor(secs/60);
    secs = secs % 60;
    if (secs < 10) {
        secs = "0"+secs;
    }
    if (eval(minVar)==0 && eval(secs)==1){
    load()
    }
    return "Update:&nbsp;"+minVar+":"+secs;
}



function del(item){
coin.splice(item,1)
kamm.splice(item,1)
amm.splice(item,1)
alarm.splice(item,1)
localsave()
load()
settings.style.display = 'block';
slim2.style.display = 'none';
stan.style.display = 'none';

};



function httpGet(theUrl){
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );

    data2 =  xmlHttp.responseText;

    data = JSON.parse(data2)
}



function farbe(i){

let a = coind[i]
let b = coinh[i]
let  aa = coin[i]+"7d"
let bb = coin[i]+"24h"
let c = erg[i]
let cc = coin[i]+"erg"
let  dd = coin[i]+"tp"
let ee = coin[i]+"sp"
let ff = coin[i]+"ergslim"
let g = coin1h[i]
let gg = coin[i]+"hp"

if (eval(a)>0){
  document.getElementById(aa).style.color = 'green';
  document.getElementById(dd).style.color = 'green';
} else {
  document.getElementById(aa).style.color = 'red';
  document.getElementById(dd).style.color = 'red';
}

if (eval(b)>0){
document.getElementById(bb).style.color = 'green';
document.getElementById(ee).style.color = 'green'
} else {
document.getElementById(bb).style.color = 'red';
document.getElementById(ee).style.color = 'red';
}

if (eval(c)>0){
document.getElementById(cc).style.color = 'green';
document.getElementById(ff).style.color = 'green';
} else {
document.getElementById(cc).style.color = 'red';
document.getElementById(ff).style.color = 'red';
}
if (eval(g)>0){
document.getElementById(gg).style.color = 'green';

} else {
document.getElementById(gg).style.color = 'red';

}
};


function mill(x){
let  a = coinm[x]
let  b = coin[x]+"mAll"
let  c = Trenner(Math.round(eval(a)))
let f = coin[x]+"mAll2"
let d = MoneyFormat(a)
let e = Math.round(d * 100) / 100



  if(eval(a)>999999){
    document.getElementById(b).innerHTML = ("Market"+"<br>"+e+" M"+wahr);
    document.getElementById(f).innerHTML = (e+" M");

    }
    if (eval(a)>999999999){
      document.getElementById(f).innerHTML = (e+" B");
      document.getElementById(b).innerHTML = ("Market"+"<br>"+e+" B"+wahr);
    }
    if (eval(a)<=999999) {
      document.getElementById(f).innerHTML = (c+" T");
    document.getElementById(b).innerHTML = ("Market"+"<br>"+c+wahr);
    }
    if (eval(a)<=999) {
      document.getElementById(f).innerHTML = (c);
    document.getElementById(b).innerHTML = ("Market"+"<br>"+c+wahr);
    }
}
function MoneyFormat(labelValue) {

  return Math.abs(Number(labelValue)) >= 1.0e+9

       ? Math.abs(Number(labelValue)) / 1.0e+9

       : Math.abs(Number(labelValue)) >= 1.0e+6

       ? Math.abs(Number(labelValue)) / 1.0e+6
       // Three Zeroes for Thousands
       : Math.abs(Number(labelValue)) >= 1.0e+3

       ? Math.abs(Number(labelValue)) / 1.0e+3

       : Math.abs(Number(labelValue));

   }


function Trenner(Zahl) {
  Zahl = '' + Zahl; if (Zahl.length > 3) {
    var mod = Zahl.length % 3; var output = (mod > 0 ? (Zahl.substring(0,mod)) : '');
    for (let i=0 ; i < Math.floor(Zahl.length / 3); i++) {
      if ((mod == 0) && (i == 0)) output += Zahl.substring(mod+ 3 * i, mod + 3 * i + 3);
      else
      output+= '.' + Zahl.substring(mod + 3 * i, mod + 3 * i + 3); } return (output); } else return Zahl;
};

function ucFirst(string) {
    return string.substring(0, 1).toUpperCase() + string.substring(1);
}
function low(string) {
    return string.substring(0, 1).toLowerCase() + string.substring(1);
}


function localsave(){

  localStorage["coin"] = JSON.stringify(coin);
  localStorage["wa"] = JSON.stringify(wa);
  localStorage["wahr"] = JSON.stringify(wahr);
  localStorage["kamm"] = JSON.stringify(kamm);
  localStorage["amm"] = JSON.stringify(amm);
localStorage["alarml"] = JSON.stringify(alarm);
}


let wert = ["eur", "usd"]

function waeh(){
for (let i=0; i<wert.length; i++){
  if (document.getElementById(wert[i]).checked){
    wa = wert[i]
  }
}


  if (document.getElementById("big").checked){
    settings.style.display = 'none';
    stan.style.display = 'block';
    slim2.style.display = 'none';
    view="big"
  }else{
    settings.style.display = 'none';
    stan.style.display = 'none';
    slim2.style.display = 'block';
    view="small"
  }
  localStorage["view"] = JSON.stringify(view);

if (wa=="eur"){
   wahr = " €"
}
if (wa=="usd"){
  wahr = " $"
}
if (wa=="btc"){
  wahr = " BTC"
}
}
