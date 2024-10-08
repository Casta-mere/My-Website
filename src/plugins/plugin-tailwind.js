function myPlugin(context, options) {
  return {
    name: "postcss-tailwindcss-loader",
    configurePostCss(postcssOptions) {
      postcssOptions.plugins.push(
        require("postcss-import"),
        require("tailwindcss"),
        require("postcss-nested"),
        require("autoprefixer")
      );
      return postcssOptions;
    },
  };
}

module.exports = myPlugin;
