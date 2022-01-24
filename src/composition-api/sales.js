import { reactive } from '@vue/composition-api'

export const salesInfo = () => {
   let mappingLabel = reactive({
      1: { title: '紅', backgroundColor: '#FF0000' },
      2: { title: '綠', backgroundColor: '#04a978' }
   });

   return { mappingLabel }
}