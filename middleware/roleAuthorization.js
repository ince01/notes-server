// TODO: Check roles defined on each route
const roleAuthorization = roles => (req, res, next) => {
  console.log(roles);
  return next();
};

export default roleAuthorization;
