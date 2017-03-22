import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import VoucherAction from '../actions/VoucherAction';
import VoucherStore from '../stores/VoucherStore';
import VoucherList from '../components/VoucherList';
import InputComponent from '../components/InputComponent';

@connectToStores
class VoucherView extends React.Component {

    static propTypes = {
        vouchers: React.PropTypes.any,
        voucher: React.PropTypes.object,
        randomCodeSelected: React.PropTypes.bool
    };

    static getStores() {
        return [VoucherStore];
    };

    static getPropsFromStores() {
        return VoucherStore.getState();
    };

    componentDidMount() {
        VoucherAction.getVoucherData();
    };

    render() {
        const {vouchers, voucher, randomCodeSelected} = this.props;
        return (
                <div className="tapp__content content">
                    <VoucherList
                        vouchers={vouchers}
                    />
                    <InputComponent
                        voucher={voucher}
                        randomCodeSelected={randomCodeSelected}
                    />
                </div>

        );
    }
}

export default VoucherView;