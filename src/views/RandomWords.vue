<template>
  <div class="view-wrapper align-center overflow-auto ">
    <div>
      <v-row class="no-gutters justify-center my-8" >
        <v-col cols="6" class="px-2" >
          <v-card class="elevation-16" style="width: 100vh">
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
              <v-textarea
                  v-model="outputText"
                  readonly
                  label="Перемешанные слова:"
              >
              </v-textarea>
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
      inputText: undefined,
      outputText: undefined
    }
  },

  computed:{
    isOkBtnDisabled(){
      return !this.inputText || !this.inputText.length
    }
  },

  methods:{
    okBtn(){
      this.$appUtils.setOverlay(true)
      let iText = this.inputText.replace(/  +/g, '')
      iText = iText.split(",")
      iText = this.shuffle(iText)
      let oText = ''
      for (const textKey in iText) {
        if(textKey == 0) oText = iText[textKey]
        else oText += ", " + iText[textKey]
      }
      this.outputText = oText
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

    clear(){
      this.inputText = undefined
      this.outputText = undefined
    },
  }
}
</script>



