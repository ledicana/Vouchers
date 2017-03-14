/**
 * Created by ALedic on 08/03/2017.
 */
import alt from '../alt';
import {createActions} from 'alt-utils/lib/decorators';

@createActions(alt)
class VoucherAction {

    getVoucherData() {
        return {};
    }

    onInputChange({field, value}) {
        return {field, value};
    }

    saveNewVoucher(voucher) {
        return voucher;
    }

}

export default VoucherAction;