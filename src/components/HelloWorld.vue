<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="image-upload">
      <label for="file-input">
        <img class="icon" src="../assets/open-file.svg">
      </label>

      <input id="file-input" type="file" accept="audio/* video/*" @change="getFileInput"/>
      <img id="speaker-selections" class="icon" src="../assets/speaker.svg" @click="setAudioOutput">
      <img id="url-input" class="icon" src="../assets/radio.svg" @click="getURLInput">
    </div>
    <div class="meta">
      <img class="artwork" :src="this.tags.picture" v-if="this.tags.picture"/>
      <!-- <label class="title">{{ tags.title }} - {{ tags.artist }}</label> -->
    </div>
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
    async getURLInput () {
      const url = prompt('Enter URL of audio!')
      this.audio.src = url
      this.audio.play()
    },

    async getFileInput(e) {
      const file = e.target.files[0]
      this.setFile(file)
    },
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
      this.setFile(fileData) 
    },
    async setAudioOutput() {
      if (!navigator.mediaDevices.selectAudioOutput) {
        console.log("selectAudioOutput() not supported or not in secure context.");
        return;
      }

      // Display prompt to select device
      const audioDevice = await navigator.mediaDevices.selectAudioOutput();
      this.audio.setSinkId(audioDevice.deviceId);
    },
    setFile(fileData) {
      try {
        jsmediatags.read(fileData, {
        onSuccess: (tag) => {
          let kind = ''
          this.tags = tag.tags
          if(this.tags.picture) {
            const { data, format } = this.tags.picture;
            const imgData = new Uint8ClampedArray(data)
            const blob = new Blob( [ imgData ], { type: format} );
            this.tags.picture = URL.createObjectURL(blob)
            kind = format
            
          } else {
            this.tags.picture = window.location.href+"img/icons/icon-maskable.svg"
            kind = fileData.kind
          }

          const meta = {
            title: fileData.name,
            artist: this.tags.artist !== "" ? this.tags.artist : "Shake Media Player",
            album: this.tags.album !== "" ? this.tags.album :"Shake Media Player",
            artwork: [
              {
                src: this.tags.picture, 
                sizes: "96x96",
                type: kind,
              }
            ],
          }
          navigator.mediaSession.metadata = new MediaMetadata(meta);
          console.log(this.audio)
          this.audio.src = URL.createObjectURL(fileData)
      
          this.audio.play()
        },
        onError: () => {
          console.log(this.audio)
          this.audio.src = URL.createObjectURL(fileData)
      
          
          navigator.mediaSession.metadata = new MediaMetadata({
            title: fileData.name,
            artist: "Shake Media Player",
            album: "Shake Media Player",
            artwork: [
              {
                src: window.location.href+"img/icons/icon-maskable.svg",
                sizes: "96x96",
                type: "image/svg",
              }
            ],
          });
          this.audio.play()
        }
      });
      } catch {
        this.audio.src = URL.createObjectURL(fileData)
      
          
      navigator.mediaSession.metadata = new MediaMetadata({
        title: fileData.name,
        artist: "Shake Media Player",
        album: "Shake Media Player",
        artwork: [
          {
            src: window.location.href+"img/icons/icon-maskable.svg",
            sizes: "96x96",
            type: "image/svg",
          }
        ],
      });
      this.audio.play()
      }
      
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
    .image-upload>input {
      display: none;
    }
  .artwork {

    width: 250px;
    height: 250px;
    margin-top: 10px;
    border-radius: 25%;
    animation: fade 8s;
    animation-iteration-count: infinite;

  }

  @keyframes fade {
    0% {
      opacity: 1;
    }

    45% {
      opacity: 0.7;
    }

    60% {
      opacity: 0;
    }
    
    80% {
      opacity: .7;
    }

    100% {
      opacity: 1;
    }
  }
</style>
