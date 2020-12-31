var i = -1
        var entregas = new Array()

        function inicializar(){
            adicionarLinha()
            totalGanho()
            qtdaPagas()
        }

        function adicionarLinha(){
            i++
            entregas[i] = definirMatriz(i)

            criarLinhaTabela(entregas[i][0], entregas[i][1], entregas[i][2], i)

            qtdaPagas()
            
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
            var cor = document.getElementById(id).style.backgroundColor
            if(entregas[id][2].checked){
                document.getElementById(id).style.background = '#00FF7F'
                entregas[id][0].readOnly = true;
                entregas[id][1].readOnly = true;
            }else{
                document.getElementById(id).style.background = 'rgb(255, 106, 106)'
                entregas[id][0].readOnly = false;
                entregas[id][1].readOnly = false;
            }
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

        function definirMatriz(posicao){
            var matriz = new Array();
            matriz[0] = document.createElement("input")
            matriz[1] = document.createElement("input")
            matriz[2] = document.createElement('input')

            matriz[0].setAttribute("type", "number")
            matriz[0].setAttribute("id", "valor") 
            matriz[0].setAttribute("class", "form-control")  
            matriz[0].setAttribute("placeholder", "R$ 0,00")   

            matriz[1].setAttribute("type", "text")
            matriz[1].setAttribute("id", "local")
            matriz[1].setAttribute("class", "form-control")
            matriz[1].setAttribute("placeholder", "Descrição do local de entrega")  

            matriz[2].setAttribute("type", "checkbox")
            matriz[2].setAttribute("id", "pago")
            matriz[2].setAttribute("onclick", "eventCheckbox(" + posicao + ")")

            return matriz;
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