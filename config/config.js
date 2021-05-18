const env = process.env.NODE_ENV || 'dev';

const config = () => {
    switch (env) {
        case 'dev' :
            return {
                dbString : 'mongodb+srv://fabiano:1705@cluster0.tb917.mongodb.net/chamados_db?retryWrites=true&w=majority',
                jwtPass : 'senha_para_o_token',
                jwtExpires : '3d'
            }
        case 'hml' :
            return {
                dbString : 'mongodb+srv://fabiano:1705@cluster0.pfru1.mongodb.net/chamados_db?retryWrites=true&w=majority',
                jwtPass : 'senha_para_o_token',
                jwtExpires : '3d'
            }
        case 'prod' :
            return {
                dbString : 'mongodb+srv://fabiano:1705@cluster0.pfru1.mongodb.net/chamados_db?retryWrites=true&w=majority',
                jwtPass : 'senha_para_o_token',
                jwtExpires : '3d'
            }
    }
};

console.log(`Iniciando a API em ambiente ${env.toUpperCase()}`);

module.exports = config();