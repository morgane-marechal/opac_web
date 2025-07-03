const { defineConfig } = require("cypress");
const webpackConfig = require("./webpack.config.js"); // ← on importe ta config Webpack

module.exports = defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
      webpackConfig, // ← on la passe à Cypress
    },
    port: 3002, // ← on change de port pour éviter le conflit avec 3000
  },

  e2e: {
    // setupNodeEvents(on, config) {
    //   // implement node event listeners here
    // },
    baseUrl: 'http://localhost:3000',  // L’URL de ton app React

  },
});


// const { defineConfig } = require('cypress');

// module.exports = defineConfig({
//   e2e: {
//     baseUrl: 'http://localhost:3000',  // L’URL de ton app React
//   },
// });
