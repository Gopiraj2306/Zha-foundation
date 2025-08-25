// function isSuperAdmin(req, res, next) {
//   if (req.user?.roles?.includes('Super Admin')) {
//     return next();
//   }
//   return res.status(403).json({ error: 'Access denied: Super Admin only' });
// }

// module.exports = { isSuperAdmin };



exports.isSuperAdmin = (req, res, next) => {
  if (req.user?.roles?.includes('Super Admin')) {
    next();
  } else {
    res.status(403).json({ error: 'Access denied: Super Admin only' });
  }
};
