<template>
  <div class="view-wrapper align-center overflow-auto">
    <div>
      <v-row class="no-gutters justify-center">
        <v-card class="my-8 elevation-16 px-16">
          <v-card-title class="justify-center">Введите числа: сумму и слагаемые</v-card-title>
          <v-card-text class="overflow-auto">
            <v-row class="justify-center align-center ma-0">
              <v-col>
                <v-text-field
                    v-model="sum"
                    label="Сумма"
                    solo
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                    v-model="digit"
                    label="Слагаемое"
                    solo
                    @keyup.enter="add"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                    v-model="digitsString"
                    label="Слагаемые ч/запятую 1, 2, ..."
                    solo
                    @keyup.enter="addDigits"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-divider/>
            <v-row class="justify-center align-center ma-0 pt-4">
              <v-btn class="ma-2"
                     @click="addBtn"
              >Добавить
              </v-btn>
            </v-row>
            <v-row class="justify-center align-center ma-0">
              <v-btn class="ma-2"
                     @click="clear"
              >Сбросить
              </v-btn></v-row>
            <v-row class="justify-center align-center ma-0">
              <v-btn :disabled="isCalculateBtnDisabled"
                     class="ma-2"
                     @click="calculateCombinations"
              >Вычислить комбинации
              </v-btn>
            </v-row>
          </v-card-text>
        </v-card>
        <v-col cols="6" class="px-2">
          <v-card class="elevation-16" >
            <v-card-title class="justify-center">
              Набранные числа:
            </v-card-title>
            <v-divider/>
            <v-card-text>
              <div v-for="(digit, idx) in digits" :key="'d' + idx">
                <v-row no-gutters class="align-center">
                  <v-col cols="2">&#11088;</v-col>
                  <v-col cols="7"><span>{{ digit }}</span></v-col>
                  <v-col cols="3">
                    <v-row no-gutters class="justify-center">
                      <v-btn @click="remove(idx)"
                             icon
                             class="align-center"
                      >
                        <v-icon>mdi-minus</v-icon>
                      </v-btn>
                    </v-row>
                  </v-col>
                </v-row>
                <v-divider class="my-4"></v-divider>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="6" class="px-2">
          <v-card  v-if="calculateBtnPressed"
                   class="elevation-16 ">
            <v-card-title v-if="result && !result.length"
                          class="justify-center"
            >
              Для суммы {{ finalSum }} - не найдено комбинаций
            </v-card-title>
            <v-card-title v-else>
              Возможноные комбинации для суммы {{ finalSum }} :
            </v-card-title>
            <v-divider/>
            <v-card-text>
              <div v-for="(el, idx) in result" :key="'e' + idx">
                <v-row no-gutters  class="align-center">
                  <span class="pt-2">{{el}}</span>
                </v-row>
                <v-divider class="my-5"></v-divider>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home-',

  data(){
    return {
      sum: undefined,
      finalSum: undefined,
      digit: undefined,
      digitsString: undefined,
      digits: [],
      result: [],
      calculateBtnPressed: false
    }
  },

  computed:{
    isCalculateBtnDisabled(){
      return !(this.sum && (this.digits && this.digits.length >= 2))
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
      this.digitsString = this.digitsString.replace(",00", "")
      this.digits = this.digitsString.split(/(\s+)/)
      this.digits = this.digits.filter((el) => !isNaN(el) && el !== '' && el !== ' ' && el !== '  ')
      this.digitsString = undefined
      this.digit = undefined
    },

    remove(idx) {
      this.digits.splice(idx, 1);
      if(!this.digits.length) this.clear();
    },

    async calculateCombinations() {
      this.$appUtils.setOverlay(true)

      this.finalSum = this.sum
      this.result = []
      let arr = []

      await this.calculate(this.digits, this.finalSum.replace(/\s/g, ""), arr , [], 0)

      for (const el in arr) {
        this.result.push(el.replaceAll(',', " + "))
      }
      this.calculateBtnPressed = true
      this.$appUtils.setOverlay(false)
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
