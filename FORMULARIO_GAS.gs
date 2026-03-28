// ══════════════════════════════════════════════════════
// BOLD LIFE — Google Apps Script
// Salva cadastros de ativação no Google Sheets
// Cole este código em: script.google.com
// ══════════════════════════════════════════════════════

const SHEET_NAME = 'Ativações Bold Life';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    // Cria a aba se não existir
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      const headers = [
        'Data/Hora', 'Nome Completo', 'CPF', 'Nascimento', 'Gênero',
        'WhatsApp', 'Telefone 2', 'E-mail',
        'CEP', 'Estado', 'Cidade', 'Bairro', 'Rua', 'Número', 'Complemento',
        'Patrocinador', 'CPF Patrocinador', 'WhatsApp Patrocinador', 'Cargo Patrocinador',
        'Como Conheceu', 'Objetivo', 'Pagamento', 'Observações', 'Status'
      ];
      sheet.appendRow(headers);
      // Formatar cabeçalho
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground('#1a1f4b');
      headerRange.setFontColor('#ffffff');
      headerRange.setFontWeight('bold');
      headerRange.setFontSize(11);
      sheet.setFrozenRows(1);
      // Largura das colunas
      sheet.setColumnWidth(1, 150);
      sheet.setColumnWidth(2, 200);
      sheet.setColumnWidth(3, 140);
    }

    // Monta a linha
    const row = [
      data.dataHora || new Date().toLocaleString('pt-BR'),
      data.nome || '',
      data.cpf || '',
      data.nascimento || '',
      data.genero || '',
      data.whatsapp || '',
      data.tel2 || '',
      data.email || '',
      data.cep || '',
      data.estado || '',
      data.cidade || '',
      data.bairro || '',
      data.rua || '',
      data.numero || '',
      data.complemento || '',
      data.patrNome || '',
      data.patrCpf || '',
      data.patrTel || '',
      data.patrCargo || '',
      data.origem || '',
      data.objetivo || '',
      data.pagamento || '',
      data.observacoes || '',
      'Aguardando Ativação'
    ];

    sheet.appendRow(row);

    // Colorir linha nova alternada
    const lastRow = sheet.getLastRow();
    if (lastRow % 2 === 0) {
      sheet.getRange(lastRow, 1, 1, row.length).setBackground('#f0f4ff');
    }

    // Coluna Status com cor
    sheet.getRange(lastRow, row.length).setBackground('#fff3cd').setFontColor('#856404');

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, row: lastRow }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'Bold Life GAS ativo ✅' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Inicializar planilha manualmente
function inicializar() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.rename('Bold Life — Cadastros de Ativação');
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  const headers = [
    'Data/Hora', 'Nome Completo', 'CPF', 'Nascimento', 'Gênero',
    'WhatsApp', 'Telefone 2', 'E-mail',
    'CEP', 'Estado', 'Cidade', 'Bairro', 'Rua', 'Número', 'Complemento',
    'Patrocinador', 'CPF Patrocinador', 'WhatsApp Patrocinador', 'Cargo Patrocinador',
    'Como Conheceu', 'Objetivo', 'Pagamento', 'Observações', 'Status'
  ];
  sheet.clearContents();
  sheet.appendRow(headers);
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground('#1a1f4b');
  headerRange.setFontColor('#ffffff');
  headerRange.setFontWeight('bold');
  headerRange.setFontSize(11);
  sheet.setFrozenRows(1);
  SpreadsheetApp.getUi().alert('✅ Planilha inicializada! Agora publique o script como Web App.');
}
