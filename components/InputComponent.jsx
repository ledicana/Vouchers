import './InputComponent.scss';
import React from 'react';
import VoucherAction from '../actions/VoucherAction'
import classNames from 'classnames';
import Checkbox from '../components/ui/Checkbox';
import validateNumericInputs from '../utils/validateNumericInputs';
import validateDatetimeInputs from '../utils/validateDatetimeInputs';
import validateAmountOfDiscountFormat from '../utils/validateAmountOfDiscountFormat';
import validationFlags from '../utils/validationFlags';
import validateInputForm from '../utils/validateInputForm';
import validateFormFlag from '../utils/validateFormFlags';
import validateForEmptyField from '../utils/validateForEmptyField';
import {getTextString} from '../utils/textStrings';

export default class InputComponent extends React.Component {

    static propTypes = {
        voucher: React.PropTypes.object.isRequired,
        randomCodeSelected: React.PropTypes.bool.isRequired
    };

    swapRandomCodeSelected () {
        VoucherAction.swapRandomCodeSelected(this.props.randomCodeSelected);
    }

    handleInputChange(field, event) {
        VoucherAction.onInputChange({
            field: field,
            value: event.target.value
        });

    //    validateFormFlag.validationFired === true;
       // validateInputForm(voucher.toJS())
    }


    //validating integer inputs
      validateLocationId(field, event) {
       validationFlags.locationIdNumericInput = validateNumericInputs(event.target.value);

        this.handleInputChange(field,event);
    }
    validateBranchId(field, event) {
        validationFlags.branchIdNumericInput = validateNumericInputs(event.target.value);

        this.handleInputChange(field, event);
    }


    validateRemainingUses(field, event) {
        validationFlags.isRemainingUsesNumericInput = validateNumericInputs(event.target.value);

        this.handleInputChange(field, event);
    }

    validateNumberOfCodes(field, event) {
        validationFlags.isNumberOfVouchersNumericInput = validateNumericInputs(event.target.value);

        this.handleInputChange(field, event);
    }

    //validating code length
    validateCodeLength (field, event) {
        validationFlags.isCodeLength = (event.target.value.length <= 10 && event.target.value.length > 0);

        this.handleInputChange(field, event);
    }

    validateDiscount(field, event) {
        //validating decimal format
        validationFlags.isCorrectDecimalFormat = validateAmountOfDiscountFormat(event.target.value);
            //validating range
        validationFlags.isDecimalInRange = (event.target.value >= 0.0 && event.target.value <= 1.0) ? true : false;

        this.handleInputChange(field, event);
    }

        //validating datetime input
    validateDateTime(field, event) {
        validationFlags.isDateTimeFormat = (validateDatetimeInputs(event.target.value)) ? true : false;

        this.handleInputChange(field, event);
    }

        //validating prefix length
    validatePrefix(field, event) {
        validationFlags.isPrefixLength = (event.target.value.length <= 2) ? true : false;

        this.handleInputChange(field,event);
    }

    saveNewVoucher() {
        const {voucher} = this.props;

        validateFormFlag.saveButtonPressed = true;

        let fieldEmptyFlag = validateForEmptyField(voucher.toJS()) ? true : false;

        if(fieldEmptyFlag) {
            chayns.dialog.alert(null, getTextString('txt_vouchers_alert_if_empty'));
        } else {
            if((validateInputForm(voucher.toJS()) && validateFormFlag.saveButtonPressed) === true) {
                VoucherAction.saveNewVoucher(voucher);
            } else {
                chayns.dialog.alert(null, getTextString('txt_vouchers_alert_invalid_input_form'));
            }
        }
    }

    render() {
        const {voucher, randomCodeSelected} = this.props;

        validateInputForm(voucher.toJS());

        const showAdditionalInputs= classNames('accordion_item', {
            'hidden' : randomCodeSelected === false
        }, {
            'input': randomCodeSelected === true
        });

        const disableInitialInputs = classNames({
            'hidden' : randomCodeSelected === true
        }, {
            'input-group' : randomCodeSelected === false
        });


        //validating numeric inputs
       const enableLocIdErrorMessage = classNames({
            'invalid': validationFlags.locationIdNumericInput === false
        });

        const enableBrIdErrorMessage = classNames({
            'invalid': validationFlags.branchIdNumericInput === false
        });

        const enableRemainingUsesErrorMessage = classNames({
            'invalid': validationFlags.isRemainingUsesNumericInput === false
        });

        const enableNumberOfVouchersErrorMessage = classNames({
            'invalid': validationFlags.isNumberOfVouchersNumericInput === false
        },{
            'hidden': randomCodeSelected === false
        });

        //validating code length
        const enableCodeLengthErrorMessage = classNames({
            'invalid': validationFlags.isCodeLength === false
        }, {
            'hidden': validationFlags.randomCodeSelected === true
        });

        //validating date and time format
        const enableDateTimeFormatErrorMessage = classNames({
            'invalid': validationFlags.isDateTimeFormat === false
        });

        //validating amount of discount
        const enableDiscountFormatErrorMessage = classNames({
            'invalid': validationFlags.isCorrectDecimalFormat === false || validationFlags.isDecimalInRange === false
        });

        //validating prefix length
        const enablePrefixLengthErrorMessage = classNames({
            'invalid': validationFlags.isPrefixLength === false
        }, {
            'hidden': randomCodeSelected === false
        });

        const disableSubmitButton = classNames ({
           'button--disabled' : validateForEmptyField(voucher.toJS()) === true || validateInputForm(voucher.toJS()) === false
        }, {
            'button' : validateForEmptyField(voucher.toJS()) === false && validateInputForm(voucher.toJS()) === true
        });

        return (

        <div className='accordion'>
            <div className='accordion__head'>{getTextString('txt_vouchers_new_voucher_headline')}</div>
            <div className='accordion__body'>
                <div className='accordion__intro'>{getTextString('txt_vouchers_new_voucher_intro')}</div>
                <div className='accordion__content'>
                    <div className="accordion_item">
                            <div className = 'input-group'>
                                <input className='input' type="text" name='locationId'
                                       value={voucher.get('locationId')}
                                       onChange={this.validateLocationId.bind(this, 'locationId')} required/>
                                <label className={enableLocIdErrorMessage}>Location Id</label>
                        </div>
                    </div>

                    <div className="accordion_item">
                        <div className = 'input-group'>
                            <input className='input' type="text" name='branchId'
                               value={voucher.get('branchId')}
                               onChange={this.validateBranchId.bind(this, 'branchId')} required/>
                            <label className={enableBrIdErrorMessage} name="branchIdNumberRequiredErrMsg">Branch Id</label>
                        </div>
                    </div>

                    <div className="accordion_item">
                        <div className = {disableInitialInputs}>
                            <input className='input' name='code' type="text"
                                   value={voucher.get('code')}
                                   onChange={this.validateCodeLength.bind(this, 'code')} required/>
                            <label className={enableCodeLengthErrorMessage} name="codeLengthErrMsg">Code</label>
                        </div>
                    </div>

                    <div className="accordion_item">
                        <div className = 'input-group'>
                            <input className='input' name='name' type="text"
                                   value={voucher.get('name')}
                                   onChange={this.handleInputChange.bind(this, 'name')} required/>
                            <label>Name</label>
                        </div>
                    </div>

                    <div className="accordion_item">
                        <div className = 'input-group'>
                            <input className='input' name='discount'
                                   value={voucher.get('discount')}
                                   onChange={this.validateDiscount.bind(this, 'discount')} required/>
                            <label className={enableDiscountFormatErrorMessage} name="discountNumberRequiredErrMsg"> Discount </label>
                        </div>
                    </div>

                    <div className="accordion_item">
                        <div className = 'input-group'>
                            <input className='input' name='remainingUses'
                                   value={voucher.get('remainingUses')}
                                   onChange={this.validateRemainingUses.bind(this, 'remainingUses')} required/>
                            <label className={enableRemainingUsesErrorMessage} name="remUsesNumberRequiredErrMsg">Remaining uses</label>
                        </div>
                    </div>


                    <div className="accordion_item">
                        <div className = 'input-group'>
                            <input className='input' name='expirationTime' type="text"
                                   value={voucher.get('expirationTime')}
                                   onChange={this.validateDateTime.bind(this, 'expirationTime')} required/>
                            <label className={enableDateTimeFormatErrorMessage} name="dateTimeFormatErrMsg">Expiration date and time (yyyy-mm-dd)T(hh:mm)</label>
                        </div>
                    </div>

                    <div className="accordion_item">
                        <Checkbox className='checkBox' id="checkRandomCodes" caption={getTextString('txt_vouchers_check_random_codes')}
                            checked={randomCodeSelected} onChange={::this.swapRandomCodeSelected} />
                    </div>

                    <div className='accordion_item'>
                        <div className = 'input-group'>
                            <input className={showAdditionalInputs} name='prefixForCodes' type="text"
                                   value={voucher.get('prefixForCodes')}
                                   onChange={this.validatePrefix.bind(this, 'prefixForCodes')} required/>
                            <label className={enablePrefixLengthErrorMessage} name="prefixLengthErrMsg">Prefix</label>
                        </div>
                    </div>

                    <div className="accordion_item">
                        <div className = 'input-group'>
                        <input className={showAdditionalInputs} name='numberOfCodes' type="text"
                               value={voucher.get('numberOfCodes')}
                               onChange={this.validateNumberOfCodes.bind(this, 'numberOfCodes')} required/>
                        <label className={enableNumberOfVouchersErrorMessage} name="remUsesNumberRequiredErrMsg">Number of vouchers</label>
                        </div>
                    </div>

                    <div className="accordion_item">
                        <div name="buttonDiv" style={ {textAlign: 'center'}}>
                            <button className={disableSubmitButton} onClick={ ::this.saveNewVoucher}>{getTextString('txt_vouchers_btn_submit_new_voucher')}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

