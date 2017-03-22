/**
 * Created by ALedic on 21/03/2017.
 */
import validationFlags from '../utils/validationFlags';

export default function validateInputForm () {

  let formValidFlag;

    for (let key in validationFlags) {
        if(validationFlags.hasOwnProperty(key)) {

            formValidFlag =(validationFlags[key] === false) ? false : true;
        }
    }

    return (formValidFlag) ? true : false;
}