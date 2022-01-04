import React from 'react';
import { IReceipt } from '../d';

const ContTierTile = (props:{props:{supportTier:IReceipt}}) => {

    const {supportTier} = props.props;

    return (
        <div className='support-tier'>
            <div>
                <span className='pledge' >Pledged ${supportTier.amountPledged}</span>
            </div>
            <div>
                <span className='name-tier' >{supportTier.nameOfTier}</span>
            </div>
            <div>
                <span className='summary-tier' >{supportTier.summaryOfTier}</span>
            </div>
            <div>
                <div>
                    <span className='delivery-tier-title' >Estimated Delivery</span>
                </div>
                <div>
                    <span className='delivery-tier-data' >{supportTier.etaDelivery}</span>
                </div>
            </div>
            <div>
                <div>
                    <span className='ships-tier-title' >Ships To</span>
                </div>
                <div>
                    <span className='ships-tier-data' >{supportTier.shipsTo}</span>
                </div>
            </div>
        </div>
    );
  
};
  
  export default ContTierTile;