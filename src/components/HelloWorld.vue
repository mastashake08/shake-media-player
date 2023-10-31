<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button class="btn" id="upload-btn" @click="getFile"> <img class="icon" src="../assets/open-file.svg"></button>
  </div>
</template>

<script>
import jsmediatags from 'jsmediatags/dist/jsmediatags.min.js'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      audio: new Audio(),
      tags: {}
    }
  },
  methods: {
    async getFile() {
      const pickerOpts = {
      types: [
        {
          description: "Pick a file",
          accept: {
            "audio/*": [".mp3", ".m3u8", ".wav", ".flac", ".webm", ".mid", ".mp4", ".ogg"]
          },
        },
      ],
      excludeAcceptAllOption: true,
      multiple: false,
      };

      // open file picker
      const [fileHandle] = await window.showOpenFilePicker(pickerOpts);
      // get file contents
      const fileData = await fileHandle.getFile();
      console.log(window.location.href+"img/icons/icon-96")
      jsmediatags.read(fileData, {
        onSuccess: (tag) => {
          console.log(tag);
          this.tags = tag
          navigator.mediaSession.metadata = new MediaMetadata({
            title: this.tags.title,
            artist: this.tags.artist !== "" ? this.tags.artist : "Shake Media Player",
            album: this.tags.album !== "" ? this.tags.album :"Shake Media Player",
            artwork: [
              {
                src: window.location.href+"img/icons/icon-96",
                sizes: "96x96",
                type: "image/png",
              }
            ],
          });
          this.audio.src = URL.createObjectURL(fileData)
      
      this.audio.play()
        },
        onError: function(error) {
          console.log(error);
          navigator.mediaSession.metadata = new MediaMetadata({
            title: fileData.name,
            artist: "Shake Media Player",
            album: "Shake Media Player",
            artwork: [
              {
                src: window.location.href+"img/icons/icon-96",
                sizes: "96x96",
                type: "image/png",
              }
            ],
          });
        }
      });
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
.icon{
			position: relative;
			height: 80px;
      width: 80px;
			margin-right:10px;
			top: 0px;
}

.icon:hover {
  /* Start the shake animation and make the animation last for 0.5 seconds */
  animation: shake 0.7s;

  /* When the animation is finished, start again */
  animation-iteration-count: infinite;
}

@keyframes shake {
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
}
		
		#upload-btn {
			color: transparent;
			font-weight: bold;
			background-color: transparent;
			padding:5px 10px;
			border-radius: 20px;
			border: none;
			height: 32px;

		}
</style>
