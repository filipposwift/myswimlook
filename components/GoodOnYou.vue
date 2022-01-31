<template>
  <div class="rating__wrapper">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 36 36"
      :style="{ opacity: rating === 1 ? 1 : 0.3 }"
      width="36"
      height="36"
    >
      <g stroke-width="1.4px" fill="none" fill-rule="evenodd" stroke="#808080">
        <path
          d="M35.3 18A17.3 17.3 0 1 0 .7 18a17.3 17.3 0 0 0 34.6 0z"
          stroke="#808080"
          fill="none"
          stroke-width="1.4px"
        ></path>
        <path
          d="M9 26.12h18a9.02 9.02 0 0 0-18 0z"
          stroke="#808080"
          fill="none"
          stroke-width="1.4px"
        ></path>
      </g>
    </svg>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 36 36"
      :style="{ opacity: rating === 2 ? 1 : 0.3 }"
      width="36"
      height="36"
    >
      <g stroke-width="1.4px" fill="none" fill-rule="evenodd" stroke="#808080">
        <path
          d="M35.3 18A17.3 17.3 0 1 0 .7 18a17.3 17.3 0 0 0 34.6 0z"
          stroke="#808080"
          fill="none"
          stroke-width="1.4px"
        ></path>
        <path
          d="M7.88 25.28a12.15 12.15 0 0 1 20.24-.13"
          stroke="#808080"
          fill="none"
          stroke-width="1.4px"
        ></path>
      </g>
    </svg>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 36 36"
      :style="{ opacity: rating === 3 ? 1 : 0.3 }"
      width="36"
      height="36"
    >
      <g stroke-width="1.4px" fill="none" fill-rule="evenodd" stroke="#808080">
        <path
          d="M35.3 18A17.3 17.3 0 1 0 .7 18a17.3 17.3 0 0 0 34.6 0z"
          stroke="#808080"
          fill="none"
          stroke-width="1.4px"
        ></path>
        <path
          d="M8.28 23.4h19.44"
          stroke="#808080"
          fill="none"
          stroke-width="1.4px"
        ></path>
      </g>
    </svg>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 36 36"
      :style="{ opacity: rating === 4 ? 1 : 0.3 }"
      width="36"
      height="36"
    >
      <g stroke-width="1.4px" fill="none" fill-rule="evenodd" stroke="#000000">
        <path
          d="M35.3 18A17.3 17.3 0 1 0 .7 18a17.3 17.3 0 0 0 34.6 0z"
          stroke="#000000"
          fill="none"
          stroke-width="1.4px"
        ></path>
        <path
          d="M27.72 18.9a9.86 9.86 0 0 1-.2 1.96A9.72 9.72 0 0 1 8.28 18.9"
          stroke="#000000"
          fill="none"
          stroke-width="1.4px"
        ></path>
      </g>
    </svg>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 36 36"
      :style="{ opacity: rating === 5 ? 1 : 0.3 }"
      width="36"
      height="36"
    >
      <g stroke-width="1.4px" fill="none" fill-rule="evenodd" stroke="#808080">
        <path
          d="M35.3 18A17.3 17.3 0 1 0 .7 18a17.3 17.3 0 0 0 34.6 0z"
          stroke="#808080"
          fill="none"
          stroke-width="1.4px"
        ></path>
        <path
          d="M27 19.6H9a9.02 9.02 0 0 0 18 0z"
          stroke="#808080"
          fill="none"
          stroke-width="1.4px"
        ></path>
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  computed: {
    rating() {
      return true
    },
  },
}
</script>

<style lang="scss" scoped>
.rating__wrapper {
  display: flex;
  flex-direction: row;
  flex: 1 1 0%;
}
</style>
