export default {
  name: 'Ibutton',
  props: {
    btnType: {
      type: String,
      default: 'default',
      required: true
    },
    btnText: {
      type: String,
      default: ''
    }
  },
  data() {
    return {

    };
  },
  computed: {
    typeClass() {
      const type = this.$props.btnType;
      let className = '';
      if (type === '') {
        className = 'i-btn-default';
      } else {
        className = 'i-btn-'+type;
      }
      return className;
    }
  },
  methods: {
    popup() {
      console.log(111);
    }
  },
  created() {

  }
};
