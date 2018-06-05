/**
 * Return the IP of the caller.
 * @method getIP
 * @param  {Object} req Contains the parameters needed to figure out caller's IP.
 * @return {String}     The caller's IP.
 */
function getIP(req) {
  return req.headers['x-forwarded-for'] ?
    req.headers['x-forwarded-for'].split(',')[0] :
    req.connection.remoteAddress;
}

module.exports = getIP;
