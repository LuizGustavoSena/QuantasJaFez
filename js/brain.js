var i = -1
var entregas = new Array()
var bd = new abreConexao()

$(document).ready( function(){
    bd.criarTabela()
    $('corpo').empty()
    headTable()
    bd.listar(listaEntregas)
    totalGanho()
    qtdaPagas()
})

function listaEntregas(msg){
    for(var j = 0; j < msg.rows.length; j++){
        i++
        entregas[i] = definirMatriz(msg.rows.item(j)[['id']], msg.rows.item(j)[['valor']], msg.rows.item(j)[['descricao']], msg.rows.item(j)[['pago']])
        criarLinhaTabela(entregas[i][0], entregas[i][1], entregas[i][2], i)
        eventCheckbox(i)
    }

    if(i == -1){
        adicionarLinha()
    }
}

function addBanco(posicao, valor, local, pago){

    var existe = false
    if(posicao > 0){
        for(var j = 0; j < entregas.length; j++){
            if(entregas[j])
        }
            if(entregas[posicao - 1][0].value == entregas[posicao][0].value &&
                entregas[posicao - 1][1].value == entregas[posicao][1].value){
                existe = true
                j = entregas.length
            }
    }
        if(existe){
            console.log("Linha existente" + posicao)
                bd.atualizar(posicao, valor, local, pago)
        }else{
            console.log("Linha nova" + posicao)
            bd.inserir(posicao, valor, local, pago)
        }
}

function adicionarLinha(){
    if(i == -1 || entregas[i][0].value != ""){

        if(i >= 0){
            if(entregas[i][2].checked){
                var pago = 1
            }else{
                var pago = 0
            }
            addBanco(i, entregas[i][0].value, entregas[i][1].value, entregas[i][2].value)
        }
        
        i++
        entregas[i] = definirMatriz(i, null, null, null)
        criarLinhaTabela(entregas[i][0], entregas[i][1], entregas[i][2], i)
        
        qtdaPagas()
        
    }else{
        alert("Cadastre na linha já existente")
    }
};

function totalGanho(){
    var j = i
    var acumulador = 0

    while (j >= 0){
        if(entregas[j][2].checked && entregas[j][0].value != ""){
            acumulador+= parseInt(entregas[j][0].value)
        }
        j--
    }

    acumulador = acumulador.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

    document.getElementById("ptotal").innerHTML =  acumulador
}

function eventCheckbox(id) {
    if(entregas[id][2].checked ){  // Marcado
        document.getElementById(id).style.background = '#00FF7F'
        entregas[id][0].readOnly = true
        entregas[id][1].readOnly = true
        entregas[id][2].setAttribute("value", 1)
    }else{  // Desmarcado
        document.getElementById(id).style.background = 'rgb(255, 106, 106)'
        entregas[id][0].readOnly = false
        entregas[id][1].readOnly = false
        entregas[id][2].setAttribute("value", 0)
    }

    //if(roda == 1){
        addBanco(id, entregas[id][0].value, entregas[id][1].value, entregas[id][2].value)
    //}
    totalGanho()
    qtdaPagas()
}

function qtdaPagas(){
        var j = i
        var paga = 0
        var npaga = 0

        while(j >=0){
            if(entregas[j][2].checked){
                paga += 1
            }else{
                npaga += 1
            }
            j--
        }

        document.getElementById("ppagas").innerHTML = paga
        document.getElementById("pnpagas").innerHTML = npaga
    }

function definirMatriz(posicao, valor, descricao, pago){
    var matriz = new Array();

    matriz[0] = document.createElement("input")
    matriz[1] = document.createElement("input")
    matriz[2] = document.createElement('input')

    matriz[0].setAttribute("type", "number")
    matriz[0].setAttribute("id", "valor")
    if(valor != null){
        matriz[0].setAttribute("value", valor)
    } 
    matriz[0].setAttribute("class", "form-control")  
    matriz[0].setAttribute("placeholder", "R$ 0,00") 

    matriz[1].setAttribute("type", "text")
    matriz[1].setAttribute("id", "local")
    if(descricao != null){
        matriz[1].setAttribute("value", descricao)
    }
    matriz[1].setAttribute("class", "form-control")
    matriz[1].setAttribute("placeholder", "Descrição do local de entrega")  

    matriz[2].setAttribute("type", "checkbox")
    matriz[2].setAttribute("id", "pago")
    matriz[2].setAttribute("value", 0)
    if(pago == 1){
        matriz[2].checked = true
    }
    matriz[2].setAttribute("onclick", "eventCheckbox(" + posicao + ")")

    return matriz;
}

function headTable(){
    var table = document.createElement("table")
    var thead = document.createElement("thead")
    var tr = document.createElement("tr")
    var thv = document.createElement("th")
    var thl = document.createElement("th")
    var thp = document.createElement("th")

    table.setAttribute("id","tabela")
    table.setAttribute("class","table")
    table.append(thead)
    thead.append(tr)

    thv.setAttribute("scope","col")
    thv.setAttribute("id","tvalor")
    thv.append(document.createTextNode("Valor"))
    tr.append(thv)

    thl.setAttribute("scope","col")
    thl.setAttribute("id","tlocal")
    thl.append(document.createTextNode("Local"))
    tr.append(thl)

    thp.setAttribute("scope","col")
    thp.setAttribute("id","tpago")
    thp.append(document.createTextNode("Pago"))
    tr.append(thp)

    document.getElementById("corpo").append(table)
}

function criarLinhaTabela(valor, local, pago, posicao) {
    var tabela = document.getElementById("tabela");
    var linhas = tabela.rows.length;
    var colunas = tabela.rows[linhas-1].cells.length;
    var novaLinha = tabela.insertRow(linhas);

    novaLinha.setAttribute("style", "background-color:#FF6A6A")
    novaLinha.setAttribute("id", posicao)

    for (var j = 0; j < colunas; j++) {
        novaCelula = novaLinha.insertCell(j);
        if (j == 0){
            novaCelula.appendChild(valor)
        }else if (j == 1){
            novaCelula.appendChild(local)
        }else if (j == 2){  
            novaCelula.appendChild(pago)
        }
    }
}