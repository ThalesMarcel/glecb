# GLECB — Gerador de Listas de Estados e Cidades Brasileiras

O GLECB é uma ferramenta para **geração automática de arquivos JSON** contendo as listas de estados e cidades do Brasil.
Os dados são obtidos diretamente da **API de localidades do IBGE**, de forma otimizada, garantindo informações atualizadas e confiáveis.

## ✨ O que há de novo na versão 2.0

- **Zero-dependency:** não utiliza pacotes externos, utilizando a Fetch API nativa do Node.js.
- **Uso de JavaScript moderno:** código escrito seguindo os padrões modernos do JavaScript (ECMAScript), projetado para execução em Node.js versão 20.0.0 ou superior.

### ♻️ Principais mudanças realizadas

- **API Fetch Nativa:** substituição da dependência externa `node-fetch` pelo método `fetch` nativo do Node.js 20+, o que elimina a necessidade de um `yarn.lock` ou pasta `node_modules` para o funcionamento básico.

- **Sintaxe `import/export`:** migração do CommonJS para ECMAScript, que é o padrão atual da indústria.

- **Template Literals:** limpeza de código usando `${}` para concatenar strings, tornando a leitura mais fluida.

- **Tratamento de Erros:** adicionada verificação básica da resposta da API do IBGE (`if !respostaAPI.ok`) para capturar falhas de rede de forma mais robusta.

## ☑️ Requisitos

- [Node.js](https://nodejs.org/en) >= 20.0.0

> **Nota:** caso a aplicação seja feita em uma **versão do Node.js inferior à 20.0.0**, recomenda-se o uso da [versão 1 (Legacy) do GLECB](https://github.com/ThalesMarcel/glecb-legacy), que segue o padrão CommonJS e é compatível com versões do Node.js a partir da v10.12.0.

## 🚀 Como usar

Clone o repositório:

```bash
git clone https://github.com/ThalesMarcel/glecb.git
```

### Execução direta

Execute o script principal para gerar os arquivos JSON:

```bash
node index.js
```

### Execução como módulo

O GLECB também pode ser utilizado como dependência em outro projeto, por meio de importação local:

```javascript
import { gerarListas } from '../glecb/index.js';

await gerarListas();
```

> **Nota:** os arquivos `estados.json` e `cidades.json` serão gerados no diretório `./json`, localizado dentro do diretório do GLECB.

## 📜 Licença

Este projeto está licenciado sob a **MIT License**.
Consulte o arquivo [LICENSE](./LICENSE.md) para mais informações.
