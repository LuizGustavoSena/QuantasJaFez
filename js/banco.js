function abreConexao(){
    this.bdSql = openDatabase('Quantasjafez', '1.0', 'BD Quantasjafez', 2*1024*1024 )
    console.log(this.bdSql)
}

abreConexao.prototype.listahistorico = function(){
    this.bdSql.transaction(function(tx){
        tx.executeSql('create table if not exists entregas(id INTEGER AUTO_INCREMENT NOT NULL, valor number NOT NULL, descricao TEXT', [[]], function(tx, msg){
            console.log("sucesso" + msg)
        }, function(err){
            console.log("Erro " + err)
        })
    })
}