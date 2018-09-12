export default{
  name: "Carousel",
  data(){
    return {
      isActive: true,
      carouselWidth: 0,
      currentIndex: 0,
      translate: 0,
      item: [],
      translateArr: [],
      timer: null,
    }
  },
  created(){
    this.item = [1, 2, 3, 4];
  },
  mounted(){
    this.carouselWidth = this.$refs.carousel.offsetWidth;
    this.item.forEach((item, index)=>{
      if(index < this.item.length-1){
        this.translateArr.push(index*this.carouselWidth);
      }else{
        this.translateArr.push(-this.carouselWidth);
      }
    })
    this.$nextTick(()=>{
      // this.startTimer();
    })
  },
  methods: {
    startTimer(){
      this.timer = setInterval(()=>{
        if(this.currentIndex < this.item){
          this.currentIndex++;
        }else{
          this.currentIndex = 0;
        }
        this.calcTranslate();
      }, 1500);
    },
    calcTranslate(){
      this.translateArr[this.currentIndex] = 0;
      this.translateArr[this.currentIndex+1] = this.carouselWidth;
      this.translateArr[this.currentIndex] = 0;
      this.translateArr[this.currentIndex] = 0;

      console.log(this.translateArr);
    }
  }
}
