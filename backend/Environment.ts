// import { DatadogStatsdConfig } from './middlewares/DatadogStatsdMiddleware'

export class Environment {
    public static isLocal(): boolean {
        return Environment.getStage() === 'local';
    }

    public static isStaging(): boolean {
        return Environment.getStage() === 'staging';
    }

    public static isProd(): boolean {
        return Environment.getStage() === 'prod';
    }

    public static getStage(): string {
        return process.env.STAGE || 'local';
    }

    public static getAppHost(): string {
        return (process.env.APP_HOST) || '0.0.0.0';
    }

    public static getAppPort(): number {
        return (process.argv[2] ? parseInt(process.argv[2], 10) : false)
        || (process.env.APP_PORT ? parseInt(process.env.APP_PORT, 10) : false)
        || 8080;
    }

    public static getDBHost(): string {
        return (process.argv[3]) || '0.0.0.0';
    }

    public static getDBPort(): number {
        return (process.argv[4] ? parseInt(process.argv[4], 10) : false)
        || (process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : false)
        || 27017;
    }

    public static getDBName(): string {
        return (process.env.DB_NAME) || 'homework';
    }
}
