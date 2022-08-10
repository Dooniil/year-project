class roleTools {
  checkRoleAdmin = (role) => {
    if (role == 2) {
      return true;
    } else {
      return false;
    }
  };

  roleNames = {
    0: "Student",
    1: "Teacher",
    2: "Admin",
  };
}

export default new roleTools();
