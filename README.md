# 𖣂 tree-cli

CLI para converter um arquivo `.txt` com estrutura de árvore em pastas e arquivos reais.

Feito com Node.js e Commander.

- 📂 Cria estruturas reais de arquivos e pastas
- 📄 Suporte a árvores no estilo `tree`
- 🔍 Exibe a estrutura em JSON
- ⚙️ Configuração de espaçamento/indentação
- 🖥️ CLI simples e rápida

---

# 📦 Instalação

## Clone o projeto

```bash
git clone https://github.com/levileve/tree-cli
cd tree-cli
```

## Instale as dependências

```bash
npm install
```

## Registre a CLI globalmente

```bash
npm link
```

Agora o comando estará disponível globalmente:

```bash
tree-cli
```

---

# 🚀 Uso

## >_ Executando no terminal

```bash
tree-cli [input] [options]
```

## 📌 Argumento `[input]`

| Argumento | Descrição |
|---|---|
| `[input]` | Arquivo `.txt` de entrada |

## ⚙️ Opções `[options]`

| Opção | Descrição |
|---|---|
| `-o, --output <dir>` | Diretório de saída |
| `--spaces` | Quantidade de espaços por nível |
| `--space` | Alias de `--spaces` |
| `--indent` | Alias de `--spaces` |
| `--json` | Exibe o JSON da estrutura |
| `--only-json` | Exibe apenas o JSON |
| `--json-only` | Alias de `--only-json` |

---

# ⚠️ Estrutura do arquivo de entrada

- Diretórios devem terminar com `/`
- Arquivos devem possuir extensão, iniciar com letra maiúscula (ex: `Dockerfile`) ou iniciar com `.` (ex: `.env`, `.gitignore`)
- Para criar a estrutura do projeto, são aceitos:
  - indentação via tabulação
  - símbolos `├──`, `│` e `└──`

## 📝 Exemplo de estrutura do arquivo de entrada

```text
├── client/
│   ├── src/
│   │   ├── app.js
│   ├── build/
│
├── server/
│   ├── index.js
│
├── Dockerfile
├── docker-compose.yml
├── .gitignore
├── .env
```

---

# 💡 Exemplos de uso

## 📂 Criar estrutura real

```bash
tree-cli tree.txt
```

## 📁 Definir diretório de saída

```bash
tree-cli tree.txt --output ./meu-projeto
```

ou:

```bash
tree-cli tree.txt -o ./meu-projeto
```

## 🔍 Exibir o JSON da estrutura (criando os arquivos)

```bash
tree-cli tree.txt --json
```

## 📄 Exibir apenas o JSON (sem criar arquivos)

```bash
tree-cli tree.txt --only-json
```

Aliases suportados:

```bash
tree-cli tree.txt --json-only
```

### 📌 Exemplo de JSON gerado

```json
{
  "tree": {
    "client": {
      "src": {
        "app": "js"
      },
      "build": {}
    },
    "server": {
      "index": "js"
    },
    "Dockerfile": ".",
    "docker-compose": "yml",
    ".gitignore": ".",
    ".env": "."
  }
}
```

---

# ⚙️ Configurar indentação

Por padrão:

```text
4 espaços = 1 nível
```

Para alterar:

```bash
tree-cli tree.txt --spaces 2
```

Aliases suportados:

```bash
tree-cli tree.txt --space 2
tree-cli tree.txt --indent 2
```

---

# 👨🏻‍💻 Sobre o projeto

## 📂 Estrutura do projeto

```text
tree-cli/
├── bin/
│   └── cli.js
├── src/
│   ├── parser.js
│   ├── generator.js
│   └── utils.js
├── package.json
```

## 🧠 Como funciona

A CLI:

1. Lê o arquivo `.txt`
2. Interpreta os níveis da árvore
3. Converte a estrutura para um JSON interno
4. Cria arquivos e diretórios reais

## 🛠️ Desenvolvimento

### Rodar localmente

```bash
node index.js tree.txt
```

---

# 📄 Licença

MIT
