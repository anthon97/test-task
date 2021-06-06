module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/assets/sass/vars/vars.scss";
        `,
      },
    },
  },
}
