import CountUp from "countup.js";
export default {
  name: 'CountTo',
  components: {},
  props: {
    startVal: {
      type: Number,
      default: 0
    },
    endVal: {
      type: Number,
      required: true
    },
    decimals: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number,
      default: 2
    },
    countId: {
      type: String,
      required: true
    },
    simplify: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      counter: 0,
      unit: [
        [3, 'K+'],
        [6, 'M+'],
        [9, 'B+']
      ]
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.counter = new CountUp(this.countId,
        this.startVal, this.endVal,
        this.decimal, this.duration, {});
      this.counter.start();
    });
  }
}
