import store from '@/store'

export default function setSnackbar(snackbar){
    store.dispatch('snackbar/setSnackbar', snackbar)
}
