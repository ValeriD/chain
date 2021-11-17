import Vue from 'vue'
import { convertToFormattedInteger, convertSpace, convertToCurrency, truncate } from '../scripts/functions'


Vue.filter('formatNumber', str => convertToFormattedInteger(str));

Vue.filter('formatSpace', str => convertSpace(str));

Vue.filter('formatCurrency', str => convertToCurrency(str))

Vue.filter('formatStringLength', (str, isMobile) => {
    return (isMobile)? truncate(str) : str;
})