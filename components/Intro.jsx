import React from 'react';
import {getTextString} from '../utils/textStrings';

//const HEADLINE = 'Vouchers',
 //   DESCRIPTION = 'Below you can insert new voucher, as well as see all available vouchers';

const Intro = () => {
    return (
        <div className="tapp_intro">
            <h1 className="headline">
                {getTextString('txt_vouchers_headline')}
            </h1>
            <p>
                {getTextString('txt_vouchers_intro')}
            </p>
        </div>
    );
};

export default Intro;