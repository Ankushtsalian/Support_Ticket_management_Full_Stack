//@desc     Register a new user
//@route    /api/users
//@access   public
const registerUser = (req, res) => {
  const { name, email, password } = req.body;

  //validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please include all fields");
  }
  res.send(req.body);
};

//@desc     login a new user
//@route    /api/users/login
//@access   public
const loginUser = (req, res) => {
  console.log(req.body);

  res.send("Login Route");
};

module.exports = { registerUser, loginUser };
