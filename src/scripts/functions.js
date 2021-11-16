
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

export function convertSpace(space){
    if(space / Math.pow(2, 50) > 1){
        return Intl.NumberFormat().format(Number.parseFloat(space/ Math.pow(2, 50)).toFixed(2)) + ' PiB';
    }else if(space / Math.pow(2,40) > 1){
        return Intl.NumberFormat().format(Number.parseFloat(space/Math.pow(2,40)).toFixed(2)) + ' TiB';
    }else if(space / Math.pow(2,30) > 1){
        return Intl.NumberFormat().format(Number.parseFloat(space/Math.pow(2,30)).toFixed(2)) + ' GiB';
    }else if(space / Math.pow(2, 20) > 1){
        return Intl.NumberFormat().format(Number.parseFloat(space/Math.pow(2,20)).toFixed(2)) + ' MiB';
    }else{
        return Intl.NumberFormat().format(Number.parseFloat(space/Math.pow(2,10)).toFixed(2)) + ' B';
    }
}

export function truncate(string){
    let str_beg = string.substr(0,15);
    let str_end = string.substr(-10);

    return str_beg + "..." + str_end;
}