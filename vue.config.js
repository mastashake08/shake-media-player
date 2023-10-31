const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/shake-media-player/'
    : '/',
  pwa: {
    id: '/',
    themeColor: "#5853FF",
    msTileColor: "#5853FF",
    name: "Shake Media Player",
    short_name: "SMP",
    description: "Play local and remote media files with ease. Offline cache assets for offline playback",
    manifestOptions: {
      share_target: {
        action: "/",
        method: "POST",
        enctype: "multipart/form-data",
        params: {
          url: "link"
        }
      },
      display_override: ["window-controls-overlay"],
      icons: [
        {
          src: "./img/icons/icon.svg",
          sizes: "any",
          type: "image/svg"
        },
        {
          src: "./img/icons/icon-144.png",
          sizes: "144x144",
          type: "image/png"
        },
        {
          src: "./img/icons/icon-maskable.svg",
          sizes: "any",
          type: "image/svg",
          purpose: "maskable"
        }
      ],
      categories: ['multimedia', 'music', 'video', 'entertainment', 'social'],
      file_handlers: [
        {
          action: "/",
          accept: {
            "audio/*": [".mp3", ".m3u8", ".wav", ".flac", ".webm", ".mid", ".mp4", ".ogg"]
          }
        }
      ],
      orientation: 'any',
      shortcuts: [
        {
          name: 'Shuffle Play',
          url: '/shuffle',
          icons: [{
            src: "./img/icons/icon-96.png",
            sizes: "96x96",
            type: "image/png"
          }]
        }
      ]
    },
    iconPaths: {
      faviconSVG: 'img/icons/icon.svg',
      appleTouchIcon: 'img/icons/apple-touch-icon-152x152.png',
      maskIcon: 'img/icons/icon.svg'
    }
  },
})
