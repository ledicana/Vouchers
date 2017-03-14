/**
 * Created by ALedic on 08/03/2017.
 */
import alt from '../alt';
import {fromJS, List} from 'immutable';
import {createStore} from 'alt-utils/lib/decorators';
import VoucherAction from '../actions/VoucherAction';
import {handleFetch} from '../utils/fetchHandler';

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
                expirationTime: ''
            })
        };
    }

    onInputChange({field, value}) {
        this.setState({
            voucher: this.state.voucher.set(field, value)
        });
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

        const fetchData = JSON.stringify( {
            locationId: voucher.get('locationId'),
            branchId: voucher.get('branchId'),
            code: voucher.get('code'),
            name: voucher.get('name'),
            discount: voucher.get('discount'),
            discountType: voucher.get('discountType'),
            isCombinable: voucher.get('isCombinable'),
            remainingUses: voucher.get('remainingUses'),
            creationTime: voucher.get('creationTime'),
            expirationTime: voucher.get('expirationTime')
        });

        fetch('http://localhost:2475/api/Values/Post', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
        body: fetchData
        }).then(data => {
            if(data.status=== 200) {
                chayns.dialog.alert(null, 'Inserting new voucher suceeded!');
                console.info('SavePersonAddress success', {res: data, req: fetchData});
                VoucherAction.getVoucherData();
            } else {
                chayns.dialog.alert(null, 'Inserting new voucher failed. Please review your data.');
                console.error('SavePersonAddress failed', {res: data, req: fetchData});
            }

        }).catch(::console.error);
    }
}
export default VoucherStore;