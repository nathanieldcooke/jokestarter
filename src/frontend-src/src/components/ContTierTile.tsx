import React, { useEffect, useState } from 'react';
import * as sessionActions from '../store/session';
import * as contributionsActions from '../store/contributions'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { RootState } from '../store';
import Button from '@material-ui/core/Button';
import '../compStyles/TierTile.css'
import { IReciept, ISupportTier, IUser } from '../d';
import CustomizedSnackbars from './SnackBar';

const ContTierTile = (props:{props:{supportTier:IReciept}}) => {

    const {supportTier} = props.props


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
  
}
  
  export default ContTierTile;