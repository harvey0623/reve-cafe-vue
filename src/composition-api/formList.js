import { reactive } from '@vue/composition-api'

export const formList = () => {
   let genderList = reactive([
      { id: 'M', title: '男' },
      { id: 'F', title: '女' },
      { id: 'S', title: '保密' },
   ]);

   let questionList = reactive([
      { id: 'sq01', title: '您畢業的國小' },
      { id: 'sq02', title: '您最愛的寵物名字' },
      { id: 'sq03', title: '您最愛的食物' },
      { id: 'sq04', title: '您最好朋友的名字' },
      { id: 'sq05', title: '您最愛的電影' },
      { id: 'sq06', title: '您的姓名' },
      { id: 'sq07', title: '您的生日' },
   ]);

   return { genderList, questionList };
}