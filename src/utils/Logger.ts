import chalk from 'chalk';

export default class Logger {
    public static log = (args: any) => this.info(args);
    public static info = (args: any) =>
        console.log(
            chalk.white.bgBlue.bold(`[${new Date().toLocaleString()}] [INFO]`),
            typeof args === 'string' ? chalk.blueBright(args) : args
        );
    public static warning = (args: any) =>
        console.log(
            chalk.white.bgYellow.bold(`[${new Date().toLocaleString()}] [WARN]`),
            typeof args === 'string' ? chalk.yellowBright(args) : args
        );
    public static error = (args: any) =>
        console.log(
            chalk.white.bgRed.bold(`[${new Date().toLocaleString()}] [ERROR]`),
            typeof args === 'string' ? chalk.redBright(args) : args
        );
}
