import config from '../config';

function parseAuthHeader(hdrValue) {
  if (typeof hdrValue !== 'string') {
    return null;
  }
  const matches = hdrValue.match(/(\S+)\s+(\S+)/);
  return matches && { scheme: matches[1], value: matches[2] };
}

const extractToken = function (request, schema = config.AUTH_HEADER_PREFIX) {
  const authSchemeLower = schema.toLowerCase();

  let token = null;

  if (request.signedCookies.token) {
    const authParams = parseAuthHeader(request.signedCookies.token);

    if (authParams && authSchemeLower === authParams.scheme.toLowerCase()) {
      token = authParams.value;
    }
  }

  return token;
};

export default extractToken;
