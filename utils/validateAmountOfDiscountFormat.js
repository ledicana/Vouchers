/**
 * Created by ALedic on 20/03/2017.
 */
/**
 * Created by ALedic on 17/03/2017.
 */
export default function validateAmountOfDiscountFormat (amountOfDiscount) {


    let decimalFormatRegExp = /^(0?((\.){1}[0-9]?)?)|(1(\.0+)?)$/;
    let doublePointOrCharRegExp = /(\.{2,})|((\.)\d*(\.))|([^0-9\.])$/; //check if there is only one decimal point; check if there are only numbers


    let decimalFormatFlag=decimalFormatRegExp.test(amountOfDiscount);
    let dotCharFlag = doublePointOrCharRegExp.test(amountOfDiscount);

    return ( decimalFormatFlag ===true && dotCharFlag === false)? true : false;


}