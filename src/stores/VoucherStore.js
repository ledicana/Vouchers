/**
 * Created by ALedic on 08/03/2017.
 */
import alt from '../alt';
import {fromJS, List} from 'immutable';
import {createStore} from 'alt-utils/lib/decorators';
import VoucherAction from '../actions/VoucherAction';
import {handleFetch} from '../utils/fetchHandler';
import validationFlags from '../utils/validationFlags';

@createStore(alt)
class VoucherStore {

    static displayName = 'VoucherStore';

    constructor() {
        this.bindActions(VoucherAction);

        this.state = {
            vouchers: List([]),

            voucher: fromJS({
                locationId: '',
                branchId: '',
                code: '',
                name: '',
                discount: '',
                discountType: 0,
                isCombinable: false,
                remainingUses: '',
                creationTime: new Date(),
                expirationTime: '',
                prefixForCodes: '',
                numberOfCodes: ''
            }),

            randomCodeSelected: false

        };
    }

    onInputChange({field, value}) {
        this.setState({
            voucher: this.state.voucher.set(field, value)
        });
    }

    swapRandomCodeSelected(flag) {
        this.setState({
            randomCodeSelected: !flag
        });
        if(!validationFlags.isCodeLength) {
            validationFlags.isCodeLength = !validationFlags.isCodeLength;
        }
    }


    getVoucherData() {
        let fetchUrl='http://localhost:2475/api/Values/get';

        fetch(fetchUrl, {
            method: 'GET'
        }).then(handleFetch).then(data => {
            this.setState({
                vouchers: fromJS(data)
            });
        }).catch(error => {
                console.log(error);
        });
    }

    saveNewVoucher(voucher) {

        let arrayOfCodes = [];
        let serverPostSuccess = true;
        if (voucher.get('code') === '') {
            let newCode = this.generateRandomCodes(1, '');
            voucher = voucher.set('code', newCode[0]);
        }

        if (this.state.randomCodeSelected === true) {
            arrayOfCodes = this.generateRandomCodes(this.state.voucher.get('numberOfCodes'), this.state.voucher.get('prefixForCodes'));
        } else {
            arrayOfCodes.push(voucher.get('code'));
        }

        for (let i in arrayOfCodes) {
            const fetchData = JSON.stringify({
                locationId: voucher.get('locationId'),
                branchId: voucher.get('branchId'),
                code: arrayOfCodes[i],
                name: voucher.get('name'),
                discount: voucher.get('discount'),
                discountType: voucher.get('discountType'),
                isCombinable: voucher.get('isCombinable'),
                remainingUses: voucher.get('remainingUses'),
                creationTime: voucher.get('creationTime'),
                expirationTime: voucher.get('expirationTime'),
            });

            fetch('http://localhost:2475/api/Values/Post', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: fetchData
            }).then(data => {
                console.log(data, data.status);
                serverPostSuccess = (data.status === 200) ? true : false;
                VoucherAction.getVoucherData();
            }).catch(::console.error);
        }

            if (serverPostSuccess === true) {
                console.log('serverpostsucces',serverPostSuccess);
                chayns.dialog.alert(null, 'Inserting new voucher suceeded!');
            } else {
                console.log('serverpostsucces',serverPostSuccess);
                chayns.dialog.alert(null, 'Inserting new voucher failed. Please review your data.');
            }

    }

    generateRandomCodes (numberOfCodes, prefix) {
        let voucher_codes = require('voucher-code-generator');

        return (voucher_codes.generate({
                length: 10 - prefix.length,
                count: numberOfCodes,
                prefix: prefix
            })
        );
    }
}
export default VoucherStore;