import React from 'react';
import VoucherAction from '../actions/VoucherAction'


export default class InputComponent extends React.Component {

    static propTypes = {
        voucher: React.PropTypes.object.isRequired
    };

    handleInputChange(field, event) {
        VoucherAction.onInputChange({
            field: field,
            value: event.target.value
        });
    }

    saveNewVoucher() {
        const {voucher} = this.props;

        VoucherAction.saveNewVoucher(voucher)
    }

    render() {
        const {voucher} = this.props;

        const inputStyle = {
            width: '100%',
            marginBottom: '5px'
        };

        console.log('render function in input');
        return (

        <div className='accordion'>
            <div className='accordion__head'>Enter new voucher</div>
            <div className='accordion__body'>
                <div className='accordion__intro'>Fill the data below to enter new voucher</div>
                <div className='accordion__content'>
                    <div className="accordion_item">
                        <input className='input' name='locationId'  type="number"  placeholder='Location ID'
                               value={voucher.get('locationId')}
                               onChange={::this.handleInputChange.bind(this, 'locationId')}
                               style={inputStyle} />
                    </div>

                    <div className="accordion_item">
                        <input className='input' name='branchId'  type="number"  placeholder='Branch ID'
                               value={voucher.get('branchId')}
                               onChange={this.handleInputChange.bind(this, 'branchId')}
                               style={inputStyle}  />
                    </div>

                    <div className="accordion_item">
                        <input className='input'  name='code' type="text"  placeholder='Voucher code' maxLength="10"
                               value={voucher.get('code')}
                               onChange={this.handleInputChange.bind(this, 'code')}
                               style={inputStyle}  />
                    </div>

                    <div className="accordion_item">
                        <input className='input' name='name' type="text"  placeholder='Voucher name'
                               value={voucher.get('name')}
                               onChange={this.handleInputChange.bind(this, 'name')}
                               style={inputStyle}  />
                    </div>

                    <div className="accordion_item">
                        <input className='input' name='discount'  type="number" placeholder='Amount of discount'
                               value={voucher.get('discount')}
                               onChange={this.handleInputChange.bind(this, 'discount')}
                               style={inputStyle}  />
                    </div>

                    <div className="accordion_item">
                        <input className='input' name='remainingUses' type="number"  placeholder='Remaining uses'
                               value={voucher.get('remainingUses')}
                               onChange={this.handleInputChange.bind(this, 'remainingUses')}
                               style={inputStyle}  />
                    </div>


                    <div className="accordion_item">
                        <input className='input' name='expirationTime' type="text"  placeholder='Expiration time (yyyy-mm-dd)' maxLength="10"
                               value={voucher.get('expirationTime')}
                               onChange={this.handleInputChange.bind(this, 'expirationTime')}
                               style={inputStyle}  />
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

