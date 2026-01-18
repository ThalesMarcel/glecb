/**
 * GLECB — Gerador de Listas de Estados e Cidades Brasileiras
 *
 * Versão: 2.0.0
 * Autor: Thales Marcel Souza Silva
 *
 * Gera arquivos JSON contendo listas atualizadas dos estados e cidades do
 * Brasil a partir da API de localidades do IBGE, removendo dados
 * desnecessários presentes nos retornos padrão da API.
 *
 * Compatível com Node.js >= 20.0.0 (ECMAScript).
 */

/*************************** Importação de Módulos ****************************/

/** Manipulação de arquivos */
import { mkdir, writeFile } from 'node:fs/promises';

/** Módulo contendo a API Fetch */
import { fileURLToPath } from 'node:url';

export async function gerarListas() {
  try {
    /**
     * Verifica se o diretório "json" existe no diretório da aplicação.
     * Caso ainda não exista, ele é criado.
     */
    await mkdir('./json', { recursive: true });

    console.log('Obtendo a lista de estados brasileiros...');
    let respostaAPI = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome');

    if (!respostaAPI.ok) throw new Error(`Erro ao buscar a lista dos estados brasileiros: ${respostaAPI.statusText}`);

    const estados = await respostaAPI.json();

    await writeFile('./json/estados.json', JSON.stringify(estados, ['nome', 'sigla']));

    const matrizCidades = [];

    /**
     *  O laço faz com que cada "linha" de matrizCidades contenha as cidades de um
     * estado brasileiro.
    */
    for (const estado of estados) {
      console.log(`Obtendo cidades do estado: ${estado.nome}`);

      respostaAPI = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado.id}/municipios?orderBy=nome`);

      if (!respostaAPI.ok) throw new Error(`Erro ao buscar a lista das cidades do estado: ${estado.nome}`);

      const dadosCidades = await respostaAPI.json();

      matrizCidades.push(dadosCidades.map(cidade => cidade.nome));
    }

    await writeFile('./json/cidades.json', JSON.stringify(matrizCidades));

    console.log('\n🆗 Arquivos gerados com sucesso (v2.0 Modern)');
  } catch (err) {
    console.error('\n🆘 Erro fatal:', err.message);
  }
}

/** Verifica se o arquivo está sendo executado diretamente */
const nodePath = fileURLToPath(import.meta.url);
if (process.argv[1] === nodePath) {
  gerarListas();
}
