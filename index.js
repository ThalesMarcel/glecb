/**
 *  GLECB - Gerador de Listas de Estados e Cidades Brasileiras
 *
 *  Autor: Thales Marcel Souza Silva
 *  Data: 12/08/2021
 *
 *  Gerador de listas de estados e cidades em formato JSON, a partir da API de
 * localidades do IBGE, sem o excesso de dados existente nos retornos da API.
 */

/** manipulador de arquivos */
import * as fs from 'fs';
/** um módulo leve que traz o método "window.fetch" para Node.js */
import fetch from 'node-fetch';

/* Importar os dados referentes aos estados brasileiros */
var url = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome';
var resposta = await fetch(url);
var dados = await resposta.json();

/** chaves do JSON original a serem copiadas para o JSON final */
var chaves = ['id', 'sigla', 'nome'];
dados = JSON.stringify(dados, chaves, 2);

var arquivo = fs.openSync('./json/estados.json', 'w+');
fs.writeFileSync(arquivo, dados);
fs.closeSync(arquivo);
