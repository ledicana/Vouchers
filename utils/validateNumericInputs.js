/**
 * Created by ALedic on 16/03/2017.
 */
export default function validateNumericInputs (dataToValidate) {

    let myNumericRegExp = /^\d+$/g;

    return myNumericRegExp.test(dataToValidate);
}
