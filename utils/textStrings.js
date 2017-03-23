/**
 * Created by ALedic on 22/03/2017.
 */
export function initTextStrings() {
    chayns.utils.lang.init({
        libs: [{
            project: 'ChaynsVouchers',
            middle: 'LangRes'
        }]
    });
}

export function getTextString(str) {
    return chayns.utils.lang.get(str) || '';
}