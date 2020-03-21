const noCache = (_, res, next) => {
    res.setHeader('Expires', '0')
    res.setHeader('Pragma', 'no-cache')
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
    next()
}
module.exports = noCache;