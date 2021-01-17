function abreConexao(){
    this.bdSql = openDatabase('Quantasjafez', '1.0', 'BD Quantasjafez', 2*1024*1024 )
}

abreConexao.prototype.criarTabela = function(){
    this.bdSql.transaction(function(tx){
        tx.executeSql('CREATE TABLE if not exists entregas(id INTEGER NOT NULL, valor number NOT NULL, descricao TEXT, pago number)', [], function(tx, msg){
        }, function(tx, err){
            console.log("Erro criar tabela " + err)
        })
    })
}

abreConexao.prototype.inserir = function(id, valor, descricao, pago){
    this.bdSql.transaction(function(tx){
        tx.executeSql('INSERT INTO entregas(id, valor , descricao, pago ) values(?, ?, ?, ?)', [id, valor, descricao, pago], function(tx, msg){
        }, function(tx, err){
            console.log("erro inserir" + err)
        })
    })
}

abreConexao.prototype.atualizar = function(id, val, desc, pag){
    this.bdSql.transaction(function(tx){
        tx.executeSql('UPDATE entregas SET descricao = ?, valor = ?, pago = ? WHERE id = ?', [desc, val, pag, id], function(tx, msg){
            //console.log("Atualizado")
        }, function(tx, err){
            console.log("Erro atualizar " + err)
        })
    })
}

abreConexao.prototype.listar = function(callback){
    this.bdSql.transaction(function(tx){
        tx.executeSql('SELECT * FROM entregas', [], function(tx, msg){
            callback(msg)
           // console.log("Sucesso listagem")
        }, function(tx, err){
            console.log("Erro seleção" + err)
        })
    })
}
