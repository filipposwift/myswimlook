<template>
  <div class="price__visit__container">
    <div class="price">
      <p>USD {{ price }}</p>
    </div>
    <div v-if="designerSite" class="visit">
      <VisitSite :url="designerSite" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    price: {
      type: Number,
      default: 0,
    },
    designerSite: {
      type: String,
      default: null,
    },
  },
}
</script>

<style lang="scss" scoped>
.price__visit__container {
  display: flex;
  @include phone {
    flex-direction: column;
  }
}
.price,
.visit {
  width: 18rem;
  @include desktop {
    width: 22rem;
  }
  @include tablet {
    width: 26rem;
  }
  @include phone {
    width: 25vw;
  }
  // @include xs-phone {
  //   width: 25vw;
  // }

  @extend %center;

  p {
    @extend %paragraph-20-light;
    letter-spacing: 2px;
    text-transform: uppercase;
    text-align: center;
    display: block;
    color: get-color(secondary, normal);
    @include phone {
      font-size: 16px;
      padding: 0.8rem;
    }
    @include xs-phone {
      font-size: 14px;
      padding: 0.8rem;
      letter-spacing: 1px;
    }
  }
}

.price {
  background-color: get-color(primary, normal);
  border-right: 1px solid $b-color;
}
</style>
