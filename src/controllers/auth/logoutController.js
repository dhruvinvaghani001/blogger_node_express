const logoutController = (req, res) => {
  res.cookie("token", "");
  res.redirect("/login");
};

export { logoutController };
