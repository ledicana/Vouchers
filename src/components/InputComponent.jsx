import '../components/inputComponent.scss';
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
import validateForEmptyField from '../utils/validateForEmptyField'

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
        validateFormFlag.validFormFlag = validateInputForm();
    }


    //validating integer inputs
      validateLocationId(field, event) {
       validationFlags.locationIdNumericInput = validateNumericInputs(event.target.value);

        if(!validationFlags.locationIdNumericInput) {
           event.target.value = event.target.value.replace(/\D+$/g, '');
        }
        this.handleInputChange(field,event);
    }
    validateBranchId(field, event) {
        validationFlags.branchIdNumericInput = validateNumericInputs(event.target.value); //allows nulls

        if (!validationFlags.branchIdNumericInput) {
            event.target.value = event.target.value.replace(/\D+$/g, '');
        }
        this.handleInputChange(field, event);
    }


    validateRemainingUses(field, event) {
        validationFlags.isRemainingUsesNumericInput = validateNumericInputs(event.target.value);

        if(!validationFlags.isRemainingUsesNumericInput) {
            event.target.value = event.target.value.replace(/\D+$/g, '');
        }

        this.handleInputChange(field, event);
    }

    validateNumberOfCodes(field, event) {
        validationFlags.isNumberOfVouchersNumericInput = validateNumericInputs(event.target.value);

        if(!validationFlags.isNumberOfVouchersNumericInput) {
            event.target.value = event.target.value.replace(/\D+$/g, '');
        }

        this.handleInputChange(field, event);
    }

    //validating code length
    validateCodeLength (field, event) {
        validationFlags.isCodeLength = (event.target.value.length <= 10 && event.target.value.length > 0);

        if(validationFlags.isCodeLength === false) {
            event.target.value = event.target.value.replace(/.$/g, '');
        }

        this.handleInputChange(field, event);
    }

    validateDiscount(field, event) {
        //validating amount of discount
        //validating decimal format
        validationFlags.isCorrectDecimalFormat = validateAmountOfDiscountFormat(event.target.value);
            //validating range
        validationFlags.isDecimalInRange = (event.target.value >= 0.0 && event.target.value <= 1.0) ? true : false;
        if(validationFlags.isDecimalInRange === false || validationFlags.isCorrectDecimalFormat === false) {
            event.target.value = event.target.value.replace(/.$/, '');
        }

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
        if (validationFlags.isPrefixLength === false) {
            event.target.value = event.target.value.replace(/.$/, '');
        }

        this.handleInputChange(field,event);
    }

    saveNewVoucher() {
        const {voucher} = this.props;

        validateFormFlag.validFormFlag = validateInputForm();
        validateFormFlag.saveButtonPressed = true;

        let fieldEmptyFlag = validateForEmptyField(voucher.toJS()) ? true : false;

        if(fieldEmptyFlag) {
            chayns.dialog.alert(null, 'Please input data in all fields and try again.');
        } else {
            if((validateFormFlag.validFormFlag && validateFormFlag.saveButtonPressed) === true) {
                VoucherAction.saveNewVoucher(voucher);
            } else {
                chayns.dialog.alert(null, 'Inserted data is not in the correct format or range. Please review input data and try again.');
            }
        }
    }

    render() {
        const {voucher, randomCodeSelected} = this.props;

        const showAdditionalInputs= classNames('accordion_item', {
            'hidden' : randomCodeSelected === false
        }, {
            'input': randomCodeSelected === true
        });

        const disableInitialInputs = classNames('accordion_item', {
            'hidden' : randomCodeSelected === true
        }, {
            'input' : randomCodeSelected === false
        });


        //validating numeric inputs
        const enableLocIdErrorMessage = classNames('accordion_item', {
            'hidden' : validationFlags.locationIdNumericInput === true
        },{
            'numericInputError': validationFlags.locationIdNumericInput === false
        });

        const enableBrIdErrorMessage = classNames('accordion_item', {
            'hidden' : validationFlags.branchIdNumericInput === true
        },{
            'numericInputError': validationFlags.branchIdNumericInput === false
        });

        const enableRemainingUsesErrorMessage = classNames('accordion_item', {
            'hidden' : validationFlags.isRemainingUsesNumericInput === true
        },{
            'numericInputError': validationFlags.isRemainingUsesNumericInput === false
        });

        const enableNumberOfVouchersErrorMessage = classNames('accordion_item', {
            'hidden' : validationFlags.isNumberOfVouchersNumericInput === true
        },{
            'numericInputError': validationFlags.isNumberOfVouchersNumericInput === false
        });

        //validating code length
        const enableCodeLengthErrorMessage = classNames('accordion_item' , {
            'hidden' : validationFlags.isCodeLength === true
        },{
            'codeLengthError': validationFlags.isCodeLength === false
        });

        //validating date and time format
        const enableDateTimeFormatErrorMessage = classNames('accordion_item', {
            'hidden' : validationFlags.isDateTimeFormat === true
        }, {
            'dateTimeFormatError': validationFlags.isDateTimeFormat === false
        });

        //validating amount of discount
        const enableDiscountFormatErrorMessage = classNames('accordion_item', {
            'hidden' : validationFlags.isCorrectDecimalFormat === true
        }, {
            'decimalInputError': validationFlags.isCorrectDecimalFormat === false
        });

        const enableDiscountRangeErrorMessage = classNames('accordion_item', {
            'hidden': validationFlags.isDecimalInRange === true
        }, {
            'decimalRangeError': validationFlags.isDecimalInRange === false
        });

        //validating prefix length
        const enablePrefixLengthErrorMessage = classNames('accordion_item', {
            'hidden': validationFlags.isPrefixLength === true
        }, {
            'prefixLengthError': validationFlags.isPrefixLength === false
        });

        return (

        <div className='accordion'>
            <div className='accordion__head'>Enter new voucher</div>
            <div className='accordion__body'>
                <div className='accordion__intro'>Fill the data below to enter new voucher</div>
                <div className='accordion__content'>
                    <div className="accordion_item">
                        <input className='input' name='locationId' placeholder='Location ID'
                               value={voucher.get('locationId')}
                               onChange={::this.validateLocationId.bind(this, 'locationId')}/>
                        <label className={enableLocIdErrorMessage} name="locationIdNumberRequiredErrMsg"/>
                    </div>

                    <div className="accordion_item">
                        <input className='input' name='branchId' placeholder='Branch ID'
                               value={voucher.get('branchId')}
                               onChange={this.validateBranchId.bind(this, 'branchId')}/>
                        <div className={enableBrIdErrorMessage} name="branchIdNumberRequiredErrMsg"/>
                    </div>

                    <div className="accordion_item">
                        <input className={disableInitialInputs} name='code' type="text"  placeholder='Voucher code'
                               value={voucher.get('code')}
                               onChange={this.validateCodeLength.bind(this, 'code')} />
                        <label className={enableCodeLengthErrorMessage} name="codeLengthErrMsg" />
                    </div>

                    <div className="accordion_item">
                        <input className='input' name='name' type="text"  placeholder='Voucher name'
                               value={voucher.get('name')}
                               onChange={this.handleInputChange.bind(this, 'name')} />
                    </div>

                    <div className="accordion_item">
                        <input className='input' name='discount' placeholder='Amount of discount'
                               value={voucher.get('discount')}
                               onChange={this.validateDiscount.bind(this, 'discount')} />
                        <div className={enableDiscountFormatErrorMessage} name="discountNumberRequiredErrMsg"/>
                        <div className={enableDiscountRangeErrorMessage} name="discountRangeErrMsg"/>
                    </div>

                    <div className="accordion_item">
                        <input className='input' name='remainingUses' placeholder='Remaining uses'
                               value={voucher.get('remainingUses')}
                               onChange={this.validateRemainingUses.bind(this, 'remainingUses')} />
                        <div className={enableRemainingUsesErrorMessage} name="remUsesNumberRequiredErrMsg"/>
                    </div>


                    <div className="accordion_item">
                        <input className='input' name='expirationTime' type="datetime-local"  placeholder='Expiration date (yyyy-mm-dd)' maxLength="10"
                               value={voucher.get('expirationTime')}
                               onChange={this.validateDateTime.bind(this, 'expirationTime')} />
                        <div className={enableDateTimeFormatErrorMessage} name="dateTimeFormatErrMsg" />
                    </div>

                    <div className="accordion_item">
                        <Checkbox className='checkBox' id="checkRandomCodes" caption="Generate multiple vouchers with random codes"
                            checked={randomCodeSelected} onChange={::this.swapRandomCodeSelected} />
                    </div>

                    <div className='accordion_item'>
                        <input className={showAdditionalInputs} name='prefixForCodes' type="text" placeholder='Prefix for codes'
                               value={voucher.get('prefixForCodes')}
                               onChange={this.validatePrefix.bind(this, 'prefixForCodes')} />
                        <div className={enablePrefixLengthErrorMessage} name="prefixLengthErrMsg" />
                    </div>

                    <div className="accordion_item">
                        <input className={showAdditionalInputs} name='numberOfCodes' min={'0'} placeholder='Desired number of vouchers'
                               value={voucher.get('numberOfCodes')}
                               onChange={this.validateNumberOfCodes.bind(this, 'numberOfCodes')}/>
                        <div className={enableNumberOfVouchersErrorMessage} name="remUsesNumberRequiredErrMsg"/>
                    </div>

                    <div className="accordion_item">
                        <div style={ {textAlign: 'center'}}>
                            <button className='button' onClick={ ::this.saveNewVoucher}>Submit new voucher</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

