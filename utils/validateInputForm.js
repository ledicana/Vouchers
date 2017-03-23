/**
 * Created by ALedic on 21/03/2017.
 */
import validateNumericInputs from '../utils/validateNumericInputs';
import validateAmountOfDiscountFormat from '../utils/validateAmountOfDiscountFormat';

export default function validateInputForm (objectToValidate) {

    let numericInput, isCodeLength, isCorrectDecimalFormat,isDateTimeFormat,isPrefixLength;

        let formValidFlag;

    for (let key in objectToValidate) {
            if(objectToValidate.hasOwnProperty(key)) {
                if(key === 'locationId' || 'branchId' || 'remainingUses' || 'numberOfCodes') {
                numericInput = (validateNumericInputs( objectToValidate[key])) ? true : false;
            } else if (key === 'code') {
                isCodeLength = (objectToValidate[key].length <= 10) ? true : false;
            } else if (key === 'discount') {
                isCorrectDecimalFormat = (validateAmountOfDiscountFormat(objectToValidate[key])) ? true : false;
            } else if (key === 'expirationTime') {
                isDateTimeFormat = (objectToValidate[key].length === 0 || objectToValidate[key].length <= 11) ? true : false;
            }else if (key === 'prefixForCodes') {
                isPrefixLength = (objectToValidate[key].length <= 2) ? true : false;
            }
        }
    }


    formValidFlag = numericInput || isCodeLength || isCorrectDecimalFormat ||  isDateTimeFormat ||isPrefixLength;
    return (formValidFlag) ? true : false;
}