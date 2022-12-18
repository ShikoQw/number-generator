<template>
  <div>
    <h1 class="h1-white">Введите числа: сумму и слагаемые</h1>
    <div class="row-wrapper-center">
      <div class="column-wrapper">
        <input id="sum-input"
               placeholder="Сумма"
               v-mask="currencyMask"
               v-model="sum"
               @keyup.enter="add"
        >
      </div>
      <div class="column-wrapper">
        <input id="digit-input"
               placeholder="Слагаемое"
               v-mask="currencyMask"
               v-model="digit"
               @keyup.enter="add"
        >
      </div>
      <div class="column-wrapper">
        <input id="digits-input"
               placeholder="Слагаемые ч/запятую 1, 2, ..."
               v-model="digitsString"
               @keyup.enter="addDigits"
        >
      </div>
    </div>
    <div class="column-wrapper">
      <button type="button"
              class="button-30"
              @click="addBtn"
      >Добавить
      </button>
      <button type="button"
              class="button-30"
              @click="clear"
      >Сбросить
      </button>
      <button v-if="sum && (digits && digits.length >= 2)"
              type="button"
              class="button-30"
              @click="calculateCombinations"
      >Вычислить комбинации
      </button>
    </div>
    <div class="row-wrapper-center">
      <div v-if="digits && digits.length"
           class="column-wrapper border"
      >
        <h1 class="h1-black" >Набранные числа:</h1>
        <table>
          <tr v-for="(digit, idx) in digits" :key="'d' + idx">
            <th style="padding: 1rem">&#11088;</th>
            <th><h1 class="h1-black">{{ digit }}</h1></th>
            <th style="padding: 1rem">
              <button type="button"
                      class="button-remove"
                      @click="remove(idx)"
              >&#10134;
              </button>
            </th>
          </tr>
        </table>
      </div>
      <!--      <div v-if="result && result.length"-->
      <div v-if="calculateBtnPressed"
           class="column-wrapper border"
      >
        <h1 class="h1-black" v-if="result && !result.length">Для суммы {{ finalSum }} - не найдено комбинаций</h1>
        <h1 class="h1-black" v-else>Возможноные комбинации для суммы {{ finalSum }} :</h1>
        <div>
          <div v-for="(el, idx) in result" :key="'e' + idx">
            <h1 class="h1-black">{{el}}</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import createNumberMask from "text-mask-addons/dist/createNumberMask";

export default {
  name: 'MainComponent',

  data(){
    return {
      currencyMask: createNumberMask({
        prefix: "",
        includeThousandsSeparator: true,
        allowNegative: false,
        thousandsSeparatorSymbol: " ",
      }),

      sum: undefined,
      finalSum: undefined,
      digit: undefined,
      digitsString: undefined,
      digits: [],
      result: [],
      calculateBtnPressed: false
    }
  },

  methods:{
    addBtn(){
      if(this.digit) this.add()
      else if(this.digits) this.addDigits()
    },

    add(){
      if(this.digit && this.digit.replace(/\s/g, "") > 0) {
        this.digits.push(this.digit)
        this.digit = undefined
        this.digitsString = undefined
      }
    },

    addDigits(){
      if(!this.digitsString) return
      this.digits = []
      this.digits = this.digitsString.split(', ')
      this.digits = this.digits.filter((el) => !isNaN(el) && el !== '' && el !== ' ' && el !== '  ')
      this.digitsString = undefined
      this.digit = undefined
    },

    remove(idx) {
      this.digits.splice(idx, 1);
      if(!this.digits.length) this.clear();
    },

    async calculateCombinations() {
      this.finalSum = this.sum
      this.result = []
      let arr = []
      let digitsCopy = JSON.parse(JSON.stringify(this.digits))
      digitsCopy = digitsCopy.map(e => e.replace(/\s/g, ""))

      await this.calculate(digitsCopy, this.finalSum.replace(/\s/g, ""), arr , [], 0)

      for (const el in arr) {
        this.result.push(el.replaceAll(',', " + "))
      }
      this.calculateBtnPressed = true
    },

    async calculate(inputDigits, finalSum, outputDigits, arr, idx){
      for(
          finalSum ? 0 : outputDigits[arr.join()] = arr;
          idx < inputDigits.length;
      )
        await this.calculate(inputDigits,
            finalSum-inputDigits[idx]
            ,outputDigits
            ,[inputDigits[idx],...arr].sort()
            ,++idx)
    },

    clear(){
      this.sum = undefined
      this.finalSum = undefined
      this.digit = undefined
      this.digitsString = undefined
      this.digits = []
      this.result = []
      this.calculateBtnPressed = false
    },
  }
}
</script>


<style scoped>

.h1-white{
  color: white;
  text-shadow: 2px 2px 5px grey;
}

.h1-black{
  color: black;
}

input{
  width: 100%;
  padding: 12px 20px;
  margin: 8px 4px;
  box-sizing: border-box;
  box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px,#D6D6E7 0 -3px 0 inset;
}

.button-remove{
  border-width: 0;
  cursor: pointer;
  box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px,#D6D6E7 0 -3px 0 inset;
}

.button-30{
  align-items: center;
  appearance: none;
  background-color: #FCFCFD;
  border-radius: 4px;
  border-width: 0;
  box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px,#D6D6E7 0 -3px 0 inset;
  box-sizing: border-box;
  color: #36395A;
  cursor: pointer;
  display: inline-flex;
  font-family: "JetBrains Mono",monospace;
  height: 48px;
  justify-content: center;
  line-height: 1;
  list-style: none;
  overflow: hidden;
  padding-left: 16px;
  padding-right: 16px;
  position: relative;
  text-align: left;
  text-decoration: none;
  transition: box-shadow .15s,transform .15s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  will-change: box-shadow,transform;
  font-size: 18px;
  margin: 6px 6px;
}

.button-30:focus {
  box-shadow: #D6D6E7 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
}

.button-30:hover {
  box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
  transform: translateY(-2px);
}

.button-30:active {
  box-shadow: #D6D6E7 0 3px 7px inset;
  transform: translateY(2px);
}

/*.row-wrapper-start{*/
/*  display: flex;*/
/*  align-items: start;*/
/*  justify-content: start;*/
/*}*/

.row-wrapper-center{
  display: flex;
  align-items: start;
  justify-content: center;
}

.row-wrapper-start{
  display: flex;
  align-items: start;
  justify-content: start;
}

.column-wrapper{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5px;
}

.border{
  /*border: solid;*/
  /*border-color: #F5F5F5;*/
  padding: 20px;
  margin: 5px;
  background-color: white;
  box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px,#D6D6E7 0 -3px 0 inset;
}

</style>
