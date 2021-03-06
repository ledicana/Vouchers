import React from 'react';

import VoucherList from '../components/VoucherList';

export default class Voucher extends React.Component {
    static propTypes = {
            name : React.PropTypes.any.isRequired,
            code: React.PropTypes.any.isRequired,
            remainingUses: React.PropTypes.any.isRequired,
            creationTime: React.PropTypes.any.isRequired,
            expirationTime: React.PropTypes.any.isRequired
    };

    render() {
        const {name, code, remainingUses, creationTime, expirationTime} = this.props;

      return (

       <div className='accordion'>
           <div className='accordion__head'>{this.props.name}</div>
           <div className='accordion__body'>
               <div className='accordion accordion--wrapped'>
                   <div className='accordion__head'>Voucher code</div>
                   <div className='accordion__body'>
                       <div className='accordion__content'>{this.props.code}</div>
                   </div>
               </div>
               <div className='accordion accordion--wrapped'>
                   <div className='accordion__head'>Remaining uses</div>
                   <div className='accordion__body'>
                       <div className='accordion__content'>{this.props.remainingUses}</div>
                   </div>
               </div>
               <div className='accordion accordion--wrapped'>
                   <div className='accordion__head'>Creation Time</div>
                   <div className='accordion__body'>
                       <div className='accordion__content'>{this.props.creationTime}</div>
                   </div>
               </div>
               <div className='accordion accordion--wrapped'>
                   <div className='accordion__head'>Expiration time</div>
                   <div className='accordion__body'>
                       <div className='accordion__content'>{this.props.expirationTime}</div>
                   </div>
               </div>
           </div>
       </div>

        );
    }
}