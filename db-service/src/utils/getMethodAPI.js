/**
 * Returns the type of method and api url being called.
 * @method getMethodAPI
 * @param  {Object} req        Contains the method and url parameters.
 * @param  {String} req.method HTTP request method.
 * @param  {String} req.url    api endpoint.
 * @return {String}            Concatenation of method and url.
 */
function getMethodAPI({ method, url }) {
  return `${method} ${url}`;
}

module.exports = getMethodAPI;
