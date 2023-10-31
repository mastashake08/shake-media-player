const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    themeColor: "#130f40",
    msTileColor: "#130f40",
    name: "My app",
    manifestOptions: {
      icons: [
        {
          src: "./img/icons/maskable_icon_x192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "maskable"
        },
        {
          src: "./img/icons/maskable_icon_x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable"
        },
        {
          src: "./img/icons/maskable_icon.png",
          sizes: "1024x1024",
          type: "image/png",
          purpose: "maskable"
        }
      ],
    },
  },
})
