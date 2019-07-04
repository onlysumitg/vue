module.exports = {
    chainWebpack: config => {
        config.module.rules.delete('eslint');
    }
}

// or vue.config.js
// const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
// module.exports = {
//     configureWebpack: {
//         plugins: [
//             new VuetifyLoaderPlugin()
//         ]
//     }
// }