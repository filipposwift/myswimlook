<template>
  <div class="v-player">
    <video
      v-if="isValidUrl && urlType == 'video'"
      ref="videoRef"
      controls
      class="v-player__video"
      :autoplay="autoplay"
      :loop="loop"
      :muted="isMuted"
      :poster="poster"
      :preload="preload"
      name="media"
      @ended="onEnd"
      @timeupdate="onTimeUpdate"
    >
      <source :src="getVideoUrl(video)" />
    </video>
    <!-- <div class="controls">
      <button class="play-button control-button" @click="play">
        <svg
          v-if="!isPlay"
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
            clip-rule="evenodd"
          />
        </svg>
        <svg
          v-if="isPlay"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
      <input
        type="range"
        min="0"
        max="100"
        class="timeline"
        value="0"
        @change="onChange"
      />
      <button class="sound-button control-button">
        <svg
          v-if="!isMuted"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          @click="toggleMuted"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
          />
        </svg>
        <svg
          v-if="isMuted"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          @click="toggleMuted"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
            clip-rule="evenodd"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
          />
        </svg>
      </button>
      <button
        class="control-button fullscreen-button"
        @click="toggleFullScreen"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
          />
        </svg>
      </button>
    </div> -->
  </div>
</template>

<script>
export default {
  props: {
    story: {
      type: Object,
      required: true,
    },
    nodeType: {
      type: String,
      required: true,
    },

    autoplay: {
      required: false,
      type: Boolean,
      default: false,
    },
    loop: {
      required: false,
      type: Boolean,
      default: false,
    },
    muted: {
      required: false,
      type: Boolean,
      default: false,
    },
    poster: {
      required: false,
      type: String,
      default: null,
    },
    preload: {
      required: false,
      type: String,
      default: 'auto',
    },
  },

  data() {
    return {
      isValidUrl: true,
      urlType: 'video',
      isPlay: false,
      isFullScreen: false,
      isMuted: false,
    }
  },

  computed: {
    item() {
      const { fields, sys } = this.story.target
      const contentType = sys.contentType.sys.id
      return { fields, contentType }
    },
    video() {
      return encodeURI(this.item.fields.video[0].secure_url)
    },
  },

  methods: {
    getVideoUrl(url) {
      if (!url) return null
      return this.isValidVideoUrl(url)
    },

    isValidVideoUrl(url) {
      // let videoTypes = ['.mp4', '.avi', '.mov', 'mpg', '.wmv', '.flv', '.webm', '.mkv', '.ogv', '.3gp', '.3g2']
      const videoTypes = ['.mp4', '.ogg', '.webm']
      for (const i in videoTypes) {
        if (url.includes(videoTypes[i])) {
          this.urlType = 'video'
          return url
        }
      }
      this.isValidUrl = false
      return url
    },
    play() {
      if (this.$refs.videoRef.paused) {
        this.$refs.videoRef.play()
      } else {
        this.$refs.videoRef.pause()
      }
      this.isPlay = !this.isPlay
    },
    onEnd() {
      this.isPlay = false
    },
    onTimeUpdate() {
      const percentagePosition =
        (100 * this.$refs.videoRef.currentTime) / this.$refs.videoRef.duration
      console.log(
        (100 * this.$refs.videoRef.currentTime) / this.$refs.videoRef.duration
      )
      this.$el.style.backgroundSize = `${percentagePosition}% 100%`
      this.$el.value = percentagePosition
    },
    onChange() {
      const time = (this.$el.value * this.$refs.videoRef.duration) / 100
      this.$refs.videoRef.currentTime = time
    },
    toggleMuted() {
      this.isMuted = !this.isMuted
    },
    toggleFullScreen() {
      if (!this.isFullScreen) {
        if (this.$refs.videoRef.requestFullscreen) {
          this.$refs.videoRef.requestFullscreen()
        } else if (this.$refs.videoRef.webkitRequestFullscreen) {
          /* Safari */
          this.$refs.videoRef.webkitRequestFullscreen()
        } else if (this.$refs.videoRef.msRequestFullscreen) {
          /* IE11 */
          this.$refs.videoRef.msRequestFullscreen()
        }
      }
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.webkitExitFullscreen) {
        /* Safari */
        document.webkitExitFullscreen()
      } else if (document.msExitFullscreen) {
        /* IE11 */
        document.msExitFullscreen()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.v-player {
  width: 35%;
  position: relative;
  overflow: hidden;
  padding-top: 62.2%;
  background-color: transparent;
  border-radius: 5px;
  margin-top: 3.2rem;
  margin-bottom: 3.2rem;
  margin-right: auto;
  margin-left: auto;
  @include tablet {
    width: 40%;
    padding-top: 71.08%;
  }
  @include phone {
    width: 100%;
    padding-top: 177.7%;
  }
}

.v-player__video {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  border: none;
  outline: transparent;
  border-radius: 5px;
}

.controls {
  display: flex;
  position: absolute;
  width: 50%;
  left: 25%;
  bottom: 0;
  background: linear-gradient(to bottom, transparent, #133c55);
  align-items: center;
  transition: opacity 0.2s;
}

.video-player.playing .controls {
  opacity: 0;
}

.video-player:hover .controls {
  opacity: 1;
}

.control-button {
  border: none;
  background: transparent;
  cursor: pointer;
  opacity: 0.8;
  transition: all 0.2s;
}

.control-button:hover {
  opacity: 1;
}

.control-button svg {
  stroke: #fff;
  fill: transparent;
}

.control-button.play-button {
  height: 40px;
  width: 40px;
}

.control-button.sound-button {
  height: 40px;
  width: 40px;
}

.control-button.fullscreen-button {
  height: 35px;
  width: 35px;
}

.timeline {
  -webkit-appearance: none;
  width: calc(100% - 125px);
  height: 0.5em;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 5px;
  background-size: 0% 100%;
  background-image: linear-gradient(#fff, #fff);
  background-repeat: no-repeat;
}

.timeline::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0;
  transition: all 0.1s;
  background-color: rgba(255, 255, 255, 0.8);
}

.timeline::-moz-range-thumb {
  -webkit-appearance: none;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0;
  transition: all 0.1s;
  background-color: rgba(255, 255, 255, 0.8);
}

.timeline::-ms-thumb {
  -webkit-appearance: none;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0;
  transition: all 0.1s;
  background-color: rgba(255, 255, 255, 0.8);
}

.timeline::-webkit-slider-thumb:hover {
  background-color: #fff;
}

.timeline:hover::-webkit-slider-thumb {
  opacity: 1;
}

.timeline::-moz-range-thumb:hover {
  background-color: #fff;
}

.timeline:hover::-moz-range-thumb {
  opacity: 1;
}

.timeline::-ms-thumb:hover {
  background-color: #fff;
}

.timeline:hover::-ms-thumb {
  opacity: 1;
}

.timeline::-webkit-slider-runnable-track {
  -webkit-appearance: none;
  box-shadow: none;
  border: none;
  background: transparent;
}

.timeline::-moz-range-track {
  -webkit-appearance: none;
  box-shadow: none;
  border: none;
  background: transparent;
}

.timeline::-ms-track {
  -webkit-appearance: none;
  box-shadow: none;
  border: none;
  background: transparent;
}
video::-webkit-media-controls-panel {
  position: absolute;
  bottom: 0;
  width: 50%;
  left: 25%;
}
</style>
