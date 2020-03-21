const addServicesToRequest = (services) => (req, res, next) => {
    req.services = services
    next()
}

module.exports = addServicesToRequest;