/**
 * Created by ALedic on 17/03/2017.
 */
export default function validateDatetimeInputs(datetimeToValidate) {

    let myDateTimeRegExp = /^(\d{4})-(\d{1,2})-(\d{1,2})T?(\d{1,2})?:(\d{1,2})?$/g;

    return (
        myDateTimeRegExp.test(datetimeToValidate)
    );
}