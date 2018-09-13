export default{
  name: "Carousel",
  props: {
    data: {
      type: Array,
      default: []
    },
    interval: {
      type: Number,
      default: 1500
    },
  },
  data(){
    return {
      currentIndex: 0,
      activeArr: [],
      translateArr: [],
      timer: null,
    }
  },
  created(){

  },
  destroyed() {
    clearInterval(this.timer);
  },
  mounted(){
    const carouselWidth = this.$refs.carousel.offsetWidth;
    this.data.forEach((item, index)=>{
      if(index == this.currentIndex){
        this.activeArr[index] = true;
        this.translateArr[index] = 0;
      }else{
        this.activeArr[index] = false;
        if(index == this.data.length-1){
          this.translateArr[index] = -carouselWidth;
        }else{
          this.translateArr[index] = (index-this.currentIndex)*carouselWidth;
        }
      }
    })
    this.$nextTick(()=>{
      this.startTimer();
    })
  },
  methods: {
    startTimer(){
      this.timer = setInterval(()=>{
        this.activeArr.fill(false);
        this.$set(this.activeArr, this.currentIndex, true);
        this.calcTranslate();
        if(this.currentIndex < this.data.length-1){
          this.currentIndex++;
        }else{
          this.currentIndex = 0;
        }
      }, this.interval);
    },
    calcTranslate(){
      const carouselWidth = this.$refs.carousel.offsetWidth;
      this.translateArr.forEach((item, index)=>{
        if(index == this.currentIndex){
          this.$set(this.translateArr, index, 0);
        }else{
          if(Math.abs(index-this.currentIndex) == this.translateArr.length-1){
            if(index > this.currentIndex){
              this.$set(this.translateArr, index, -carouselWidth);
            }
            if(index < this.currentIndex){
              this.$set(this.translateArr, index, carouselWidth);
            }
          }else{
            this.$set(this.translateArr, index, (index-this.currentIndex)*carouselWidth);
          }
        }
      })
    },
    stopCarousel(){
      console.log("enter");
      clearInterval(this.timer);

    },
    startCarousel(){
      console.log("leave");
      this.startTimer();
    }
  }
}
