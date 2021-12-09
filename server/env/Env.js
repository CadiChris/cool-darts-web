const Env = {
  estEnProd: () => process.env.NODE_ENV === "production",
};

module.exports = { Env };
