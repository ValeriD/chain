
export function convertToFormattedInteger(labelValue) {
    // 12 for Billions
    return new Intl.NumberFormat().format(Number.parseInt(labelValue));
}
export function convertToCurrency(number){
    return new Intl.NumberFormat().format(Number.parseFloat(number/ Math.pow(10, 12)).toFixed(4)) + " CGN";
}
export function makeFirstCaseUpper(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
}