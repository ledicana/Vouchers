import React from 'react';
import Voucher from '../components/Voucher';
import {getTextString} from '../utils/textStrings';

export default class VoucherList extends React.Component {
    static propTypes = {
        vouchers: React.PropTypes.object.isRequired
    };

    render() {
        const {vouchers} = this.props;
        return (

        <div className='accordion'>
            <div className='accordion__head'>{getTextString('txt_vouchers_list_of_existing_vouchers_head')}</div>
            <div className='accordion__body'>
                <div className='accordion__intro'>{getTextString('txt_vouchers_list_of_existing_vouchers_intro')}</div>
                <div className='accordion__content'>
                    {vouchers.map((voucherList, index) => (<Voucher name={voucherList.get('name')}
                                                                    code={voucherList.get('code')}
                                                                    remainingUses={voucherList.get('remainingUses')}
                                                                    creationTime={voucherList.get('creationTime')}
                                                                    expirationTime={voucherList.get('expirationTime')}
                                                                    key={index} />))}
                </div>
            </div>
        </div>

        );
    }
}