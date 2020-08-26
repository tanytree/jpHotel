
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import locale from 'element-ui/lib/locale';
import zh from '../assets/languages/zh.js'
import ri from '../assets/languages/ri.js'
import { getLanguage, setLanguage } from '@/utils/auth'
// import enLocale from 'element-ui/lib/locale/lang/en'
// import zhLocale from 'element-ui/lib/locale/lang/zh-CN'


Vue.use(VueI18n)

const messages = {
  ri: Object.assign(ri),
  zh: Object.assign(zh)
}

console.log(messages.zh)

const i18n = new VueI18n({
  locale: getLanguage() || 'ri',
  messages
})


// locale.i18n((key, value) => i18n.t(key, value)) //为了实现element插件的多语言切换

export default i18n
