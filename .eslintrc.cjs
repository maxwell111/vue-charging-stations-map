module.exports = {
  root: true,
  env: {
    browser: true,
  },
  extends: ["eslint:recommended", "plugin:vue/vue3-recommended", "prettier"],
  plugins: ["vue"],
  rules: {
    "vue/require-default-prop": "off",
    semi: [2, "always"],
    "generator-star-spacing": "off",
    // eslint-disable-next-line no-undef
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
  },
};
