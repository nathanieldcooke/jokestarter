import React, { useState } from 'react';
import * as sessionActions from '../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { RootState } from '../store';
import Button from '@material-ui/core/Button';
import '../compStyles/TierTile.css'
import { ISupportTier } from '../d';
const TierTile = (props:{props:{supportTier:ISupportTier}}) => {
const {supportTier} = props.props
    return (
        <div className='support-tier'>
            <div>
                <span className='pledge' >Pledge ${supportTier.amount} or more</span>
            </div>
            <div>
                <span className='name-tier' >{supportTier.name}</span>
            </div>
            <div>
                <span className='summary-tier' >{supportTier.summary}</span>
            </div>
            <div>
                <div>
                    <span className='delivery-tier-title' >Estimated Delivery</span>
                </div>
                <div>
                    <span className='delivery-tier-data' >{supportTier.estimatedDelivery}</span>
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
            <div className='tier-bottom'>
                <div>
                    <span className='amount-left-tier' >Amount Left: {supportTier.amountLeft}</span>
                </div>
                <div>
                    <span className='backers-tier' >Backers: {supportTier.backers}</span>
                </div>
            </div>
            <div className='select-reward-hidden'>Select Reward</div>
        </div>
    );
  
}
  
  export default TierTile;