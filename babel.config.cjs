module.exports = {
    // Define os presets que o Babel usará para compilar o código
    presets: [
        // Configura o Babel para transformar o código JavaScript de acordo com o padrão ES2015+,
        // garantindo compatibilidade com navegadores que suportam módulos ES (ESModules)
        ['@babel/preset-env', { targets: { esmodules: true } }],

        // Configura o Babel para transformar o código React, usando o runtime automático,
        // o que elimina a necessidade de importar React manualmente em arquivos JSX
        ['@babel/preset-react', { runtime: 'automatic' }],

        // Configura o Babel para transformar código TypeScript em JavaScript
        '@babel/preset-typescript',
    ]
}
