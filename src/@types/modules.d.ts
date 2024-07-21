declare module '*.module.scss' {
    const classes:
        {
            [key: string]: string
        };
    export default classes;
}
// Declara que todos os arquivos com extensão .module.scss exportam um objeto com nomes de classe como chaves e strings como valores
