<template>
  <div class="picker-container">
    <textarea v-model="value"></textarea>
    <i-button btnText="多列" btnType="primary" @click.native="showPicker0"></i-button>
    <i-button btnText="日期" btnType="primary" @click.native="showPicker1"></i-button>
    <i-picker
      ref="picker0"
      :data="picker0.data"
      :textTitle="picker0.textTitle"
      :anchor="picker0.anchor"
      @confirm="handlePicker0Confirm">
    </i-picker>
    <i-picker
      ref="picker1"
      :type="picker1.type"
      :showSearch="true"
      :textTitle="picker1.textTitle"
      :anchor="picker1.anchor"
      @confirm="handlePicker1Confirm"
      @toSearch="toSearchByParams">
    </i-picker>
    <count-to countId="totalUsers" :endVal="1068" />
  </div>
</template>

<script type="text/javascript">
var pinyin = require("pinyin");
import IButton from '../components/i-button/i-button.vue';
import IPicker from '../components/i-picker/i-picker.vue';
import CountTo from '../components/count-to/count-to.vue';

const data1 = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const data2 = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
export default {
  name: 'picker',
  components: { IButton, IPicker, CountTo },
  data() {
    return {
      showPicker: false,
      value: null,
      picker0: {
        anchor: [],
        textTitle: '请选择类别',
        data: [data1, data2]
      },
      picker1: {
        anchor: [],
        textTitle: '请选择日期',
        type: 'date'
      }
    };
  },
  methods: {
    showPicker0() {
      this.$refs.picker0.show();
    },
    showPicker1() {
      this.$refs.picker1.show();
    },
    handlePicker0Confirm(value) {
      this.value = value ? JSON.stringify(value) : null;
    },
    handlePicker1Confirm(value) {
      this.value = value ? JSON.stringify(value) : null;
    },
    toSearchByParams(value) {
      console.log(value);
    },
    comparePinyin(a, b) {
      if (typeof a !== 'string') {
        a = a.toString();
      }
      if (typeof b !== 'string') {
        b = b.toString();
      }
      return a.localeCompare(b);
    },
    sortByChar(arr) {
      let pinyinArr = [];
      let charArr = [];
      arr.forEach(item => {
        let firstChar = item;
        if (typeof item !== 'string') {
          firstChar = item.toString();
        }
        if (/[a-z0-9]/i.test(firstChar.charAt())) {
          charArr.push(item);
        } else {
          pinyinArr.push(item);
        }
      });
      charArr = charArr.sort(this.comparePinyin);
      pinyinArr = pinyinArr.sort(this.comparePinyin);
      return [...charArr, ...pinyinArr];
    },
    compareData(a, b) {
      if (typeof a !== 'string') {
        a = a.toString();
      }
      if (typeof b !== 'string') {
        b = b.toString();
      }
      if (/[^a-z0-9]/i.test(a.charAt())) {
        a = pinyin(a, {
          style: pinyin.STYLE_NORMAL
        }).join('');
      }
      if (/[^a-z0-9]/i.test(b.charAt())) {
        b = pinyin(b, {
          style: pinyin.STYLE_NORMAL
        }).join('');
      }
      return a.localeCompare(b);
    }
  },
  created() {
    var arr = ['张三', '李四', 3, '王五', '赵六', 0, 'Jhon', 'Ann', 'Tom'];
    // const result = this.sortByChar(arr);
    const str = pinyin("中心", {
      style: pinyin.STYLE_NORMAL
    });
    const dist = arr.sort(pinyin.compare);
    console.log(dist);
  }
};
</script>

<style lang="less">
.picker-container{
  padding: 15px;
  textarea {
    height: 88px;
    width: 100%;
    margin-bottom: 12px;
    padding: 12px;
    border: 2px solid #35495d;
    border-radius: 4px;
    box-sizing: border-box;
    outline: none;
    color: #35495d;
    font-size: 14px;
    resize: none;
  }
}
</style>
