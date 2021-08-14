/**
 *  GLECB - Gerador de Listas de Estados e Cidades Brasileiras
 *
 *  Autor: Thales Marcel Souza Silva
 *  Data: 14/08/2021
 *
 *  Gerador de listas de estados e cidades em formato JSON, a partir da API de
 * localidades do IBGE, sem o excesso de dados existente nos retornos da API.
 */

/*************************** Importação de Módulos ****************************/

/** manipulador de arquivos */
import * as fs from 'fs';
/** um módulo leve que traz o método "window.fetch" para Node.js */
import fetch from 'node-fetch';

/******************************************************************************/

/************************** Declaração de Variáveis ***************************/

/** URL do JSON a ser baixado */
let url;

/** Recebe os dados brutos obtidos pela função "fetch" */
let resposta;

/** Array de estados */
let estados;

/** Array temporário de cidades */
let _cidades;

/**
 *  Array de cidades, formado pela concatenação dos dados obtidos do array
 * "_cidades", nas iterações do bloco de laço
*/
let cidades = [];

/** Chaves do JSON original a serem copiadas para o JSON final */
let chaves;

/** Armazena dados em formato de string JSON */
let str_json;

/** Manipulador de arquivos */
let arquivo;

/******************************************************************************/

/****************** Importar os dados referentes aos estados ******************/

url = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome';
console.log('Obtendo a lista de estados do Brasil...');
resposta = await fetch(url);
estados = await resposta.json();
chaves = ['id', 'sigla', 'nome'];
str_json = JSON.stringify(estados, chaves);
console.log('Armazenando a lista de estados no arquivo "estados.json"...');
arquivo = fs.openSync('./json/estados.json', 'w+');
fs.writeFileSync(arquivo, str_json);
fs.closeSync(arquivo);

/******************************************************************************/

/****************** Importar os dados referentes às cidades *******************/

/* Formação do array "cidades" */
for (let i = 0; i < estados.length; i++) {
  console.log('Obtendo a lista de cidades do estado de ' + estados[i]['nome'] + '...');

  url = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/' + estados[i]['id'].toString() + '/municipios?orderBy=nome';

  resposta = await fetch(url);
  _cidades = await resposta.json();
  /* concatenação da lista de cidades do estado "i" no array "cidades" */
  cidades.push(_cidades);
}

/* Armazenamento do conteúdo relevante de "cidades" no arquivo "cidades.json" */
chaves = ['nome'];
str_json = JSON.stringify(cidades, chaves);
console.log('Armazenando a lista de cidades no arquivo "cidades.json"...');
arquivo = fs.openSync('./json/cidades.json', 'w+');
fs.writeFileSync(arquivo, str_json);
fs.closeSync(arquivo);
console.log('Armazenamento finalizado!!!');
