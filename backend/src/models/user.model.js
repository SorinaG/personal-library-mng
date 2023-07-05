const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const roles = require("../enums/roles");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    min: 6,
    max: 100,
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: roles.User,
    enum: Object.values(roles),
  },
}, { timestamps: true });

userSchema.pre("save", async function save(next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }

    let salt = await bcrypt.genSalt(10);
    this.password = bcrypt.hashSync(this.password, salt);

    return next();
  } catch (error) {
    return next(error);
  }
});

userSchema.method({
  transform() {
    const transformed = {};
    const fields = ["username", "email", "createdAt"];
    fields.forEach((field) => (transformed[field] = this[field]));
    return transformed;
  },

  passwordMatches(password) {
    return bcrypt.compareSync(password, this.password);
  },
});

userSchema.statics = {
  roles,

  async findAndGenerateToken(payload) {
    const { email, password } = payload;
    if (!email) throw new Error("Email must be provided for login");

    const user = await this.findOne({ email }).exec();
    if (!user)
      throw new Error(
        `No user associated with ${email}`,
      );

    console.log(password)

    const passwordOK = await user.passwordMatches(password);

    if (!passwordOK)
      throw new Error(`Password mismatch`);

    return user;
  },
};

const User = mongoose.model("User", userSchema);

module.exports = User;
