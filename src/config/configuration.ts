export default () => ({
    port: parseInt(process.env.DB_PORT),
    host:process.env.HOST,
    username:process.env.USERNAME,
    passwrord:process.env.PASSWORD,
    database:process.env.DATABASE,
    secret:process.env.SECRET
    });