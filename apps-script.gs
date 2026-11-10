/**
 * Agiliza Saúde — recebe os registros dos testes e grava numa Planilha Google.
 * Como usar: veja o passo a passo no README.md (seção "Receber as respostas numa planilha").
 */
var COLUNAS = ['quando','sessao','evento','aparelho','servico','unidade','bairro','data','hora',
               'para_quem','duracao_s','voltas','nota','comentario','origem','fonte','contraste'];

function doPost(e) {
  var aba = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (aba.getLastRow() === 0) aba.appendRow(COLUNAS);
  var d = JSON.parse(e.postData.contents);
  aba.appendRow(COLUNAS.map(function (c) { return d[c] === undefined ? '' : d[c]; }));
  return ContentService.createTextOutput('ok');
}

function doGet() {
  return ContentService.createTextOutput('Agiliza Saúde: endpoint ativo.');
}
