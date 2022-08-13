const checkRoleAdmin = (role) => {
  if (role == 2) {
    return true;
  } else {
    return false;
  }
};

export default (req, res, next) => {
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    let hasAccess = false;
    if (req.user.id == req.params.id) {
      hasAccess = true;
    }

    if (
      (checkRoleAdmin(req.user.role) &&
        req.selectedUser.roleId == 2 &&
        !hasAccess) ||
      (!checkRoleAdmin(req.user.role) && !hasAccess)
    ) {
      return res.status(400).json({ message: "Access denied" });
    }
    next();
  } catch (e) {
    console.log(e);
  }
};
