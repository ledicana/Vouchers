import React from 'react';

import Voucher from '../components/Voucher';

export default class VoucherList extends React.Component {
    static propTypes = {
        vouchers: React.PropTypes.object.isRequired
    };

    render() {
        const {vouchers} = this.props;
        return (

        <div className='accordion'>
            <div className='accordion__head'>List of existing vouchers</div>
            <div className='accordion__body'>
                <div className='accordion__intro'>Below you can find list of available vouchers </div>
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