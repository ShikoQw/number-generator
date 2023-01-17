<template>
  <div class="view-wrapper align-center overflow-auto ">
    <div>
      <v-row class="no-gutters justify-center my-8" >
        <v-col cols="6" class="px-2" >
          <v-card class="mb-4 elevation-16">
            <v-card-title class="justify-center">
              Введите количество строк и диапозон слов
            </v-card-title>
            <v-divider/>
            <v-card-text>
              <v-row class="align-center">
                <v-col cols="3">
                  <v-text-field
                      v-model="rowNumber"
                      type="number"
                      hide-details
                      solo
                      label="Кол-во строк"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                      v-model="rangeNumberFrom"
                      type="number"
                      hide-details
                      solo
                      label="Диапазон слов от"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                      v-model="rangeNumberTill"
                      type="number"
                      hide-details
                      solo
                      label="Диапазон слов до"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-row class="justify-center no-gutters">
                    <v-btn @click="clearSettingsBtn"
                    >
                      Сбросить
                    </v-btn>
                  </v-row>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
          <v-card class="elevation-16">
            <v-card-title class="justify-center">
              Введите слова
            </v-card-title>
            <v-divider/>
            <v-card-text class="overflow-auto">
              <v-textarea
                  v-model="inputText"
                  label="Слова через запятую"
                  solo
                  hide-details
                  height="60vh"
                  @keyup.enter="okBtn"
              ></v-textarea>
            </v-card-text>
            <v-card-actions>
              <v-spacer/>
              <v-btn @click="clear"
              >
                Сбросить
              </v-btn>
              <v-btn :disabled="isOkBtnDisabled"
                     @click="okBtn"
              >
                Ok
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="6" class="px-2">
          <v-card  class="elevation-16" style="width: 100vh">
            <v-card-title>
              Перемешанные слова:
            </v-card-title>
            <v-divider/>
            <v-card-text>
              <v-list>
                <template v-for="(oText, index) in outputText">
                  <v-list-item :key="index" class="my-4">
                    {{ oText }}
                  </v-list-item>
                </template>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      rowNumber: undefined,
      rangeNumberFrom: undefined,
      rangeNumberTill: undefined,
      inputText: undefined,
      outputText: []
    }
  },

  computed:{
    isOkBtnDisabled(){
      return !this.inputText || !this.inputText.length
    },
  },

  methods:{
    okBtn(){
      this.$appUtils.setOverlay(true)
      this.outputText = []
      let iText = this.inputText.replace(/  +/g, '')
      iText = ' ' + iText
      iText = iText.split(",")
      iText = this.shuffle(iText)

      this.divideToRows(iText)

      this.$appUtils.setOverlay(false)
    },

    shuffle(array) {
      let currentIndex = array.length,  randomIndex;

      // While there remain elements to shuffle.
      while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex], array[currentIndex]];
      }

      return array;
    },

    divideToRows(iText){
      if(!this.rowNumber) {
        let oText = ''
        for (const textKey in iText) {
          if(textKey == 0) oText = iText[textKey]
          else oText += "," + iText[textKey]
        }
        this.outputText.push(oText)
      }else{
        if(!this.rangeNumberFrom || !this.rangeNumberTill){
          const range = Math.ceil(iText.length / this.rowNumber)
          let idxOuterCount = 0
          for (let i = 0; i < this.rowNumber; i++) {
            let oText = ''
            if( i != 0) idxOuterCount += range
            for (let j = 0; j < range; j++) {
              const idx = j + idxOuterCount
              if(iText[idx]){
                if(j == 0) oText = iText[idx]
                else oText += "," + iText[idx]
              }
            }
            this.outputText.push(oText)
          }
        } else{
          let idxOuterCount = 0
          for (let i = 0; i < this.rowNumber; i++) {
            let range = this.getRandomInt(this.rangeNumberFrom, this.rangeNumberTill)
            let oText = ''
            if( i != 0) idxOuterCount += range
            for (let j = 0; j < range; j++) {
              const idx = j + idxOuterCount
              if(iText[idx]){
                if(j == 0) oText = iText[idx]
                else oText += "," + iText[idx]
              }
            }
            this.outputText.push(oText)
          }
        }
      }
    },

    clear(){
      this.inputText = undefined
      this.outputText = undefined
    },

    clearSettingsBtn(){
      this.rowNumber = undefined
      this.rangeNumberFrom = undefined
      this.rangeNumberTill = undefined
    },

    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Number(max) + 1
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
    }
  }
}
</script>



