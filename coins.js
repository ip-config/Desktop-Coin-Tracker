let coin = [];
let coinm = [];
let coinh = [];
let coind = [];
let coinr = [];
let coinp = [];
let coins = [];
let cmc = [];
let wahr
let wa
let amm = [];
let kamm = [];
let erg = [];
let view
let sym = []
let all = []


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

  httpGet("https://api.coinmarketcap.com/v1/ticker/")
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

            }


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
let  grund = "<table class=tg id=slim><tr class=tg-baqh><td class=tg-j2zy>Coin</td><td class=tg-j2zy>Price "+wahr+"</td><td class=tg-j2zy>24H %</td><td class=tg-j2zy>7D %</td><td class=tg-j2zy>Market"+wahr+"</td><td class=tg-j2zy>Own"+wahr+"</td></tr></table>"
      document.getElementById("slim2").innerHTML = grund

let grund2 = "<table ><tr><td class=unt>Coin</td> <td class=tab>Amount</td> <td class=tab>Price @ Buy</td></tr>"
document.getElementById("newe").innerHTML = grund2

  for (let o = 0; o<coin.length; o++){
  rahmen = document.createElement("div")
  rahmen.innerHTML = "<div id="+coin[o]+" class=tt></div></div>"
  document.getElementById("stan").appendChild(rahmen)

let u = low(coin[o])

  httpGet("https://api.coinmarketcap.com/v1/ticker/"+u+"/?convert="+wa)

    coinp[o] = (data[0]["price_"+wa])
    coinr[o] = (" #"+data[0].rank)
    coind[o] = (data[0]["percent_change_7d"])
    coinh[o] = (data[0]["percent_change_24h"])
    coinm[o] = (Math.round(data[0]["market_cap_"+wa]))
    coins[o] = (data[0]["symbol"])
    bil = "http://files.coinmarketcap.com.s3-website-us-east-1.amazonaws.com/static/img/coins/200x200/"+u+".png"
    err = "this.src='./pic/1.gif'"



erg[o] = (amm[o]*coinp[o])-(amm[o]*kamm[o])

if (isNaN(erg[o]) || erg[o]==0){
  tableq = "<table class=tt><thead><td class=tt><span>"+coin[o]+"</span><a id="+coin[o]+"rang></a><a id="+coin[o]+"erg></a><img src="+bil+" onerror="+err+" /><br><span id="+coin[o]+"p></span></td></thead><tbody></tbody></table>";

}else{

  erg[o] = Math.round(erg[o]*100)/100


tableq = "<table class=tt><thead><td class=tt><img src="+bil+" onerror="+err+" /><span>"+coin[o]+"</span><a id="+coin[o]+"rang></a><br><a id="+coin[o]+"erg>"+erg[o]+wahr+"</a><span id="+coin[o]+"p></span></td></thead><tbody></tbody></table>";
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
if (isNaN(erg[o])){
  erg[o]= [0]
}
    let slim2 =   "<tr><td class=tg-yw4l>"+coins[o]+"</td><td class=tg-lqy6>"+po+"</td><td class=tg-lqy6 id="+coin[o]+"sp>"+sp+"</td><td class=tg-lqy6 id="+coin[o]+"tp>"+tp+"</td><td class=tg-lqy6 id="+coin[o]+"mAll2>"+mAll+"</td><td class=tg-lqy6 id="+coin[o]+"ergslim>"+erg[o]+"</td></tr></tbody></table>"
          document.getElementById("slim").innerHTML += slim2


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

          roww =   "<tr><td class=unt>"+coins[o]+"&nbsp;</td><td class=unt><input  type=number;  id=inamm"+o+"  value=0></input></tr></td> <td class=unt><input type=number id=inprice"+o+" value=0></input></td></tr><br>"

      }
      else{
        roww =   "<tr><td class=unt>"+coins[o]+"&nbsp;</td><td class=unt><input  type=number;  id=inamm"+o+"  value="+amm[o]+" ></input></tr></td> <td class=unt><input type=number id=inprice"+o+" value="+kamm[o]+"></input></td></tr><br>"
  }
         document.getElementById("newe").innerHTML += roww;
let zt = "Last Update "+new Date().toLocaleTimeString();
         document.getElementById("zeit").innerHTML = zt;

      }





localsave()
document.getElementById("newe").innerHTML += "</table>"
}

function set(){
  settings.style.display = 'block';
  slim2.style.display = 'none';
  stan.style.display = 'none';

}





function save(){
amm = []
kamm = []

  for (let i=0; i<coin.length; i++){
let h = document.getElementById("inamm"+i).value
let j = document.getElementById("inprice"+i).value

hn = h.replace(/,/g, '.')
jn = j.replace(/,/g, '.')



amm.push(hn)
kamm.push(jn)

}


localStorage["kamm"] = JSON.stringify(kamm);
localStorage["amm"] = JSON.stringify(amm);

waeh()

load()

}

function del(){
  let a = coin.length-1
   let b = coin[a]

  document.getElementById(b).innerHTML = ""

 coin.splice(a, 1);
 kamm.splice(a, 1)
 erg.splice(a, 1)
 amm.splice(a, 1)



 localsave()
 load()
 settings.style.display = 'block';
 slim2.style.display = 'none';
 stan.style.display = 'none';
}



function httpGet(theUrl){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    data2 =  xmlHttp.responseText;
    data = eval(data2)
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
}c

if (eval(c)>0){
document.getElementById(cc).style.color = 'green';
document.getElementById(ff).style.color = 'green';
} else {
document.getElementById(cc).style.color = 'red';
document.getElementById(ff).style.color = 'red';
}
}

function zu(){

  if (view=="big"){
    settings.style.display = 'none';
    stan.style.display = 'block';
    slim2.style.display = 'none';

  }else{
    settings.style.display = 'none';
    stan.style.display = 'none';
    slim2.style.display = 'block';

  }

  load()
}



function mill(x){
let  a = coinm[x]
let  b = coin[x]+"mAll"
let  c = Trenner(Math.round(eval(a)))
let f = coin[x]+"mAll2"
let d = MoneyFormat(a)
let e = Math.round(d * 100) / 100

  if(eval(a)>999999){
    document.getElementById(b).innerHTML = ("Market"+"<br>"+e+" Mill"+wahr);
    document.getElementById(f).innerHTML = (e+" Mill");
    }
    if (eval(a)>999999999){
      document.getElementById(f).innerHTML = (e+" Bill");
      document.getElementById(b).innerHTML = ("Market"+"<br>"+e+" Bill"+wahr);
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

}


let wert = ["eur", "usd", "btc"]

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
