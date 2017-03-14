import React from 'react';

const HEADLINE = 'Vouchers',
    DESCRIPTION = 'Below you can insert new voucher, as well as see all available vouchers';

const Intro = () => {
    return (
        <div className="tapp_intro">
            <h1 className="headline">
                {HEADLINE}
            </h1>
            <p>
                {DESCRIPTION}
            </p>
        </div>
    );
};

export default Intro;