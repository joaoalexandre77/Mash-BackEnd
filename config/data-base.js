import Connection from "./sequelize-config.js";

export async function authDB() {
    try {
        await Connection.authenticate();
        console.log("Conexão com o banco de dados realizada com sucesso");
    } catch (error) {
        console.error(`Ocorreu um erro ao tentar se conectar ao banco: ${error}`);
    }
}

export async function createDataBase() {
    try {
        await Connection.query("CREATE DATABASE IF NOT EXISTS mash");
        console.log("Banco mash criado com sucersso!");
    } catch (error) {
        console.error(`Ocorreu um erro ao tentar criar o banco: ${error}`)
    }
}