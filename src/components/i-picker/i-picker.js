import BScroll from 'better-scroll';
import { dateData, dateAnchor, timeData } from '../../util/dateTime';
import { Icon } from 'vux';
export default {
  name: 'IPicker',
  components: { Icon },
  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    },
    type: {
      type: String,
      default: 'normal'
    },
    showSearch: {
      type: Boolean,
      default: false
    },
    anchor: {
      type: Array,
      default() {
        return [];
      }
    },
    textTitle: {
      type: String,
      default: ''
    },
    textConfirm: {
      type: String,
      default: '确定'
    },
    textCancel: {
      type: String,
      default: '取消'
    }
  },
  data() {
    return {
      display: false,
      dataChange: false,
      pickerData: this.dataGetter(),
      pickerAnchor: this.anchorGetter(),
      wheels: [],
      inputValue: '',
      showBtn: false
    };
  },
  watch: {
    data () {
      this.setPickerData();
    }
  },
  computed: {
    proxyData () {
      return this.dataGetter();
    },
    proxyAnchor () {
      return this.anchorGetter();
    },
    dataType () {
      return !Array.isArray(this.proxyData[0]) ? 'cascade' : 'normal';
    }
  },
  methods: {
    dataGetter() {
      let data = null;
      switch(this.type) {
        case 'date':
          data = dateData; break;
        case 'normal':
        default:
          data = this.data; break;
      }
      return [...data];
    },
    anchorGetter() {
      let anchor = [];
      if (this.anchor.length) {
        anchor = this.anchor;
      } else {
        switch (this.type) {
          case 'date':
            anchor = dateAnchor; break;
          default:
            anchor = this.anchor; break;
        }
      }
      anchor = anchor.map((item, i) => {
        let index = 0;
        if (item.index) {
          index = item.index;
        } else if (item.value) {
          index = this.pickerData && this.pickerData[i] && this.pickerData[i].indexOf(item.value) > -1
            ? this.pickerData[i].indexOf(item.value) : 0;
        } else {
          index = item;
        }
        return index;
      });
      return [...anchor];
    },
    createWheel(wheelWrapper, i) {
      if (!this.wheels[i]) {
      const wheel = this.wheels[i] = new BScroll(wheelWrapper.children[i], {
        wheel: {
          selectedIndex: 0,
          rotate: 0
        }
      });
      wheel.on('scrollEnd', () => {
        this.cascadePickerChange(i);
      });
      } else {
        this.wheels[i].refresh();
      }
      return this.wheels[i];
    },
    setPickerData() {
      this.pickerData = this.dataGetter();
      this.pickerAnchor = this.anchorGetter();
      if (this.display) {
        this.$nextTick(() => {
          const wheelWrapper = this.$refs.wheelWrapper;
          this.pickerData.forEach((item, i) => {
            this.createWheel(wheelWrapper, i);
          });
          this.wheelToAnchor(this.proxyAnchor);
          this.destroyExtraWheels();
        });
      } else {
        this.dataChange = true;
      }
    },
    cascadePickerChange(i) {
      if (this.dataType !== 'cascade') {
        return;
      }
      const newIndex = this.getCurrentValue()[i].index;
      if (newIndex !== this.pickerAnchor[i]) {
        this.pickerAnchor.splice(i, 1, newIndex);
        this.updatePickerData(i + 1);
      }
    },
    getCurrentValue() {
      let value = [];
      this.wheels.forEach((wheel, i) => {
        const j = wheel.getSelectedIndex();
        value.push({
          index: j,
          value: this.pickerData[i][j]
        });
      });
      return value;
    },
    formatValue(arr) {
      let result = [];
      arr.forEach((n, i) => {
        if ((this.type==='date' || this.type==='time')) {
          let temp = n.value.slice(0,-1);
          if (parseInt(temp) < 10) {
            temp = '0'+temp;
          }
          result.push(temp);
        } else {
          result.push(n);
        }
      });
      if (this.type==='date') {
        return result.join('-');
      } else if (this.type==='time') {
        return result.join(':');
      } else {
        return result.join('');
      }
    },
    updatePickerData(wheelIndex = 0) {
      let data = [...this.proxyData];
      let i = 0;
      while (data) {
        if (i >= wheelIndex) {
          let wheelData = [];
          data.forEach((item) => {
            wheelData.push(item.value);
          });
          this.pickerData[i] = wheelData;
          this.pickerAnchor[i] = wheelIndex === 0
            ? (this.pickerAnchor[i] < data.length ? this.pickerAnchor[i] || 0 : 0)
            : this.reloadWheel(i, wheelData);
        }
        data = data.length ? data[this.pickerAnchor[i]].children : null;
        i++;
      }
      this.pickerData = this.pickerData.slice(0, i);
    },
    show() {
      this.display = true;
      if (!this.wheels.length || this.dataChange) {
        this.dataType === 'cascade' && this.updatePickerData();
        this.$nextTick(() => {
          const wrapper = this.$refs.wrapper;
          this.pickerData.forEach((item, index) => {
            this.createWheel(wrapper, index).enable();
          });
          this.wheelToAnchor(this.proxyAnchor);

          this.dataChange && this.destroyExtraWheels();
          this.dataChange = false;
        });
      } else {
        this.wheels.forEach((wheel) => {
          wheel.enable();
        });
      }
    },
    reloadWheel(index, data) {
      const wheelWrapper = this.$refs.wrapper;
      console.log(wheelWrapper);
      let scroll = wheelWrapper.children[index].querySelector('.wheel-scroll');
      let wheel = this.wheels ? this.wheels[index] : false;
      let dist = 0;
      if (scroll && wheel) {
        this.$set(this.pickerData, index, data);
        this.pickerAnchor[index] = dist;
        this.$nextTick(() => {
          wheel = this.createWheel(wheelWrapper, index);
          wheel.wheelTo(dist);
        });
      }
      return dist;
    },
    wheelToAnchor(data) {
      this.wheels.forEach((wheel, i) => {
        wheel.wheelTo(data[i] || 0);
      });
    },
    destroyExtraWheels() {
      const dataLength = this.pickerData.length;
      if (dataLength < this.wheels.length) {
        const extraWheels = this.wheels.splice(dataLength);
        extraWheels.forEach((wheel) => {
          wheel.destroy();
        });
      }
    },
    hide() {
      this.wheels.forEach((wheel) => {
        wheel.disable();
      });
      this.display = false;
    },
    cancel() {
      this.display = false;
      this.$emit('cancel');
    },
    comfirm() {
      const isInTransition = this.wheels.some((wheel) => {
        return wheel.isInTransition;
      });
      if (isInTransition) {
        return;
      }
      console.log(this);
      const selectedValues = this.getCurrentValue();
      this.$emit('confirm', this.formatValue(selectedValues));
      this.hide();
    },
    focusInput() {
      this.inputValue = '';
      this.showBtn = true;
    },
    blurInput() {
      if (!this.inputValue) {
        this.showBtn = false;
      }
    },
    toSearch() {
      if (this.inputValue) {
        this.$emit('toSearch', this.inputValue);
      }
    }
  }
};
