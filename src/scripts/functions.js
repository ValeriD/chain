
export function convertToFormattedInteger(labelValue) {
    // 12 for Billions
    return new Intl.NumberFormat().format(Number.parseInt(labelValue / Math.pow(10, 12)));
}
export function convertToCurrency(number){
    return Number.parseFloat(number/ Math.pow(10, 12)).toFixed(4) + " CGN";
}