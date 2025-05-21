const checkRole = (roles) => {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).send({ error: 'Unauthorized' });
      }
      
      const hasRole = roles.includes(req.user.role);
      if (!hasRole) {
        return res.status(403).send({ error: 'Access forbidden' });
      }
      
      next();
    };
  };
  
  module.exports = { checkRole };
  