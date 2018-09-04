export default {
  name: "Messages",
  data(){
    return {
      selected: "cn"
    }
  },
  created(){
    console.log(this.$root.$i18n);
  },
  methods: {
    changeValue(value){
      console.log(value);
    }
  }
}
