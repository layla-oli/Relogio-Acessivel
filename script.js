var msg = new SpeechSynthesisUtterance();
var fontes = ["courier","arial","times new roman", "verdana"];
var indice = 0;
//+ Carlos R. L. Rodrigues
//@ http://jsfromhell.com/string/extenso [rev. #3]
String.prototype.extenso = function(c){
    var ex = [
        ["zero", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove", "dez", "onze", "doze", "treze", "quatorze", "quinze", "dezesseis", "dezessete", "dezoito", "dezenove"],
        ["dez", "vinte", "trinta", "quarenta", "cinquenta", "sessenta", "setenta", "oitenta", "noventa"],
    ];
    var a, n, v, i, n = this.replace(c ? /[^,\d]/g : /\D/g, "").split(","), e = " e ", $ = "real", d = "centavo", sl;
    for(var f = n.length - 1, l, j = -1, r = [], s = [], t = ""; ++j <= f; s = []){
        j && (n[j] = (("." + n[j]) * 1).toFixed(2).slice(2));
        if(!(a = (v = n[j]).slice((l = v.length) % 3).match(/\d{3}/g), v = l % 3 ? [v.slice(0, l % 3)] : [], v = a ? v.concat(a) : v).length) continue;
        for(a = -1, l = v.length; ++a < l; t = ""){
            if(!(i = v[a] * 1)) continue;
            i % 100 < 20 && (t += ex[0][i % 100]) ||
            i % 100 + 1 && (t += ex[1][(i % 100 / 10 >> 0) - 1] + (i % 10 ? e + ex[0][i % 10] : ""));
            s.push((i < 100 ? t : !(i % 100) ? ex[2][i == 100 ? 0 : i / 100 >> 0] : (ex[2][i / 100 >> 0] + e + t)) +
            ((t = l - a - 2) > -1 ? " " + (i > 1 && t > 0 ? ex[3][t].replace("ão", "ões") : ex[3][t]) : ""));
        }
        a = ((sl = s.length) > 1 ? (a = s.pop(), s.join(" ") + e + a) : s.join("") || ((!j && (n[j + 1] * 1 > 0) || r.length) ? "" : ex[0][0]));
        a && r.push(a + (c ? (" " + (v.join("") * 1 > 1 ? j ? d + "s" : (/0{6,}$/.test(n[0]) ? "de " : "") + $.replace("l", "is") : j ? d : $)) : ""));
    }
    return r.join(e);
}

function pegaHora(){
	var data=new Date();
	var hor=data.getHours();
	var min=data.getMinutes();
	var seg=data.getSeconds();
				
	if(hor < 10){
		hor="0"+hor;
	}
	if(min < 10){
		min="0"+min;
	}
	if(seg < 10){
		seg="0"+seg;
	}
				
	var horas=hor + ":" + min + ":" + seg;
				
    document.getElementById("horario").value=horas;
   
}

var timer = setInterval(pegaHora, 1000);

var tamanhoLetra = 10

var relogio = document.getElementById('horario')

function configLetra(action) {
    if (action === '+' && tamanhoLetra <= 30) {
        tamanhoLetra += 1
        relogio.style.fontSize = tamanhoLetra + 'vmin'
    } else if (action === '-' && tamanhoLetra >= 10) {
        tamanhoLetra -= 0.5
        relogio.style.fontSize = tamanhoLetra + 'vmin'
    }
}

function changeColor() {
    let corPrimaria = document.getElementById('corPrimaria').value
    let corSecundaria = document.getElementById('corSecundaria').value
    if (corPrimaria != corSecundaria) {
        relogio.style.color = corPrimaria
        let container = document.getElementById('relogio')
        container.style.backgroundColor = corSecundaria
        let nav = document.getElementById('navegacao')
        nav.style.color = corSecundaria
        nav.style.backgroundColor = corPrimaria
        let rodape = document.getElementById('rodape')
        rodape.style.color = corSecundaria
        rodape.style.backgroundColor = corPrimaria
        let btnMais = document.getElementById("btnMais");
        let btnMenos = document.getElementById("btnMenos");
        let btnMudar = document.getElementById("btnMudar");
        btnMais.style.color = corSecundaria;
        btnMais.style.backgroundColor = corPrimaria;
        btnMenos.style.color = corSecundaria;
        btnMenos.style.backgroundColor = corPrimaria;
        btnMudar.style.color = corSecundaria;
        btnMudar.style.backgroundColor = corPrimaria;
        let paletaPri = document.getElementById("corPrimaria");
        let paletaSec = document.getElementById("corSecundaria");
        paletaPri.style.backgroundColor = corPrimaria;
        paletaSec.style.backgroundColor = corPrimaria;
        

    }
}

window.addEventListener('keydown', (e) => {
    if (e.defaultPrevented) {
    return;
  }

  var handled = false;
    if (e.code!== undefined) {
       
      var data=new Date();
      var hor=String(data.getHours()).extenso();
	    var min=String(data.getMinutes()).extenso();
        switch (e.code) {
          
            case "ArrowUp":
                configLetra('+')
                break
            case "ArrowDown":
                configLetra('-')
                break
            case "ArrowRight":
                indice++;
                if(indice >=fontes.length) indice = 0;
                if(indice<0) indice = fontes.length-1;
                document.getElementById("horario").style.fontFamily = fontes[indice];
                console.log(fontes[indice]);
                break
            case "ArrowLeft":
                indice--;
                if(indice >=fontes.length ) indice = 0;
                if(indice<0) indice = fontes.length-1;
                document.getElementById("horario").style.fontFamily = fontes[indice];console.log(fontes[indice]);
                break
            case "Space":
                msg.text = "São" + hor +"horas e " + min + "minutos";
                msg.lang = 'br';
                msg.rate = 0.7;
                if(window.speechSynthesis.speaking == false)
                  window.speechSynthesis.speak(msg); 
                break
        }
        handled = true
  }

  if (handled) {
    e.preventDefault();
  }
}, true)