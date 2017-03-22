/**
 * Created by ALedic on 21/03/2017.
 */

export default function validateForEmptyField(objectToValidate) {
    let emptylocationId, emptybranchId, emptycode, emptyname, emptydiscount, emptyremainingUses, emptyexpirationTime;

    let flagEmpty;

    for(let key in objectToValidate) {
        if(objectToValidate.hasOwnProperty(key)) {
           if(key === 'locationId') {
               emptylocationId = (objectToValidate[key].length === 0) ? true : false;
           } else if (key === 'branchId') {
               emptybranchId = (objectToValidate[key].length === 0) ? true : false;
           } else if (key === 'name') {
                emptyname = (objectToValidate[key].length === 0) ? true : false;
           } else if (key === 'discount') {
               emptydiscount = (objectToValidate[key].length === 0) ? true : false;
           } else if (key === 'remainingUses') {
               emptyremainingUses = (objectToValidate[key].length === 0) ? true : false;
           } else if (key === 'expirationTime') {
               emptyexpirationTime = (objectToValidate[key].length === 0 || objectToValidate[key].length <= 8) ? true : false;
           }
        }

    }

    flagEmpty = emptylocationId || emptybranchId || emptyname || emptydiscount || emptyremainingUses || emptyexpirationTime;
    console.log('flagEmpty', flagEmpty);

    return (flagEmpty ) ? true : false;
}