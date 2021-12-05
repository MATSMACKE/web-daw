const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    experiments: {
      asyncWebAssembly: true,
      syncWebAssembly: true,
      topLevelAwait: true
    }
  },
    pluginOptions: {
        electronBuilder: {
            builderOptions: {
                productName: "DAW",
                win: {
                    "target": [
                        "nsis"
                    ],
                    icon: 'public/icon.icns'
                },
                mac: {
                    icon: 'public/icon.icns'
                },
                "nsis": {
                    "installerIcon": "public/icon.icns",
                    "uninstallerIcon": "public/icon.icns",
                    "uninstallDisplayName": "CPU Monitor",
                    "license": "license.txt",
                    "oneClick": false,
                    "allowToChangeInstallationDirectory": true
                }
            },
        },
    },
})
