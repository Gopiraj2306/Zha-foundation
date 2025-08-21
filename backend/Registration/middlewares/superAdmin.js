function isSuperAdmin(req, res, next) {
  if (req.user?.roles?.includes('Super Admin')) {
    return next();
  }
  return res.status(403).json({ error: 'Access denied: Super Admin only' });
}

module.exports = { isSuperAdmin };
