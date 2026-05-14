#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { program } from 'commander';
import { parseTree } from '../src/parser.js';
import { createStructure, existsPath } from '../src/generator.js';
import { changePathExtension, isEmpty, isObject, valueOrFallback } from '../src/utils.js';
import { exitError, exitSuccess } from '../src/validators/index.js';

const DEFAULT_OUTPUT = './';

program
    .name('tree-cli')
    .description('Converte um arquivo .txt de árvore em estrutura real')
    .version('1.0.0');

program
    .argument('[input]', 'Arquivo de entrada (apenas .txt)', 'tree')
    .option('-o, --output <dir>', 'Diretório de saída', DEFAULT_OUTPUT)
    .option('--spaces, --space, --indent', 'Largura do espaçamento do arquivo de entrada', 4)
    .option('--json', 'Exibe o JSON da estrutura do projeto', false)
    .option('--only-json, --json-only', 'Apenas exibe o JSON da estrutura do projeto, sem criar arquivos ou pastas', false)
    .action((input, options) => {
        input = changePathExtension(input, 'txt');
        console.log('');

        if (!existsPath(input)) {
            exitError(`Arquivo de entrada não encontrado em: ${input}`);
        }

        const output = path.resolve(process.cwd(), valueOrFallback(options.output, DEFAULT_OUTPUT)).replace(/\\/g, '/');
        if (!existsPath(output)) {
            exitError(`Diretório de saída não encontrado em: ${output}`);
        }

        const text = fs.readFileSync(input, 'utf-8');
        if (isEmpty(text)) {
            exitError(`Estrutura de pastas e arquivos vazia em: ${input}`);
        }

        const tree = parseTree(text, options.spaces);
        if (!isObject(tree)) {
            exitError(`Estrutura de pastas e arquivos incorreta em: ${input}`);
        }

        const jsonOnly = options.jsonOnly;
        const showJson = jsonOnly || options.json;

        if (showJson) {
            console.log(JSON.stringify({ input, output, tree }, null, 2));
            console.log('');

            if (jsonOnly) {
                process.exit(0);
            }
        }

        createStructure(output, tree);

        exitSuccess(`Estrutura de pastas e arquivos criada em: ${output}`);
    });

program.parse();