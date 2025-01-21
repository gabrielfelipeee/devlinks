module.exports = {
    // Define o ambiente de teste como "jest-environment-jsdom",
    // que simula um DOM para testes de componentes e funcionalidades que dependem de elementos do navegador
    testEnvironment: "jest-environment-jsdom",

    // Especifica um arquivo que será executado após a configuração do ambiente de teste,
    // útil para configurações globais, mocks ou extensões de bibliotecas de testes
    setupFilesAfterEnv: ["<rootDir>/setup_tests.js"],

    // Define os arquivos que devem ser incluídos na coleta de cobertura de código,
    // permitindo especificar tipos de arquivos e localizações dentro do projeto
    collectCoverageFrom: ["<rootDir>/src/**/*.{js,ts,jsx,tsx}"],

    // Especifica como o Jest deve transformar os arquivos antes de executá-los,
    // configurando o Babel para processar arquivos TypeScript e JavaScript
    transform: {
        "^.+\\.[t|j]sx?$": "babel-jest",
    },

    // Mapeia extensões de arquivos para mocks ou configurações customizadas,
    // permitindo que o Jest lide com arquivos como estilos ou imagens
    moduleNameMapper: {
        "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Mapeia arquivos de estilo para um mock
        "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/src/_mocks_/fileMock.js", 
    },

    // Ignora a transformação de arquivos em determinadas pastas, como "node_modules",
    // para melhorar o desempenho dos testes
    transformIgnorePatterns: [
        "/node_modules/",
        "\\.pnp\\.[^\\/]+$",
    ],

    // Especifica quais diretórios e extensões o Jest deve reconhecer ao buscar módulos
    moduleFileExtensions: ["js", "jsx", "ts", "tsx"],

    // Configura o diretório de saída para relatórios de cobertura de código
    coverageDirectory: "<rootDir>/coverage",

    // Determina o local onde os testes devem ser executados
    roots: ["<rootDir>/src"],

    // Ativa relatórios de cobertura de código em vários formatos
    coverageReporters: ["json", "lcov", "text", "clover"],

    // Habilita a geração de relatórios em tempo real enquanto os testes estão em execução
    verbose: true,
};
