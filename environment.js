class Environment {
  static isLocal() {
    return Environment.getStage() === "local"
  }

  static isStaging() {
    return Environment.getStage() === "staging"
  }

  static isProd() {
    return Environment.getStage() === "prod"
  }

  static getStage() {
    return process.env.STAGE || "local"
  }

  static getAppHost() {
    return process.env.APP_HOST || "0.0.0.0"
  }

  static getAppPort() {
    return parseInt(process.argv[2]) || process.env.APP_PORT || 8080
  }

  static getDBHost() {
    return process.argv[3] || "0.0.0.0"
  }

  static getDBPort() {
    return parseInt(process.argv[4]) || process.env.DB_PORT || 27017
  }

  static getDBName() {
    return process.env.DB_NAME || "homework"
  }
}

module.exports = Environment
