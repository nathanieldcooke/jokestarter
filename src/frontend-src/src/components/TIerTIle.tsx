import React, { useEffect, useState } from 'react';
import * as sessionActions from '../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { RootState } from '../store';
import Button from '@material-ui/core/Button';
import '../compStyles/TierTile.css'
import { ISupportTier, IUser } from '../d';
import CustomizedSnackbars from './SnackBar';

const TierTile = (props:{props:{supportTier:ISupportTier}}) => {
    const {supportTier} = props.props
    const sessionUser:IUser = useSelector((state: RootState) => state.session);

    const [focus, setFocus] = useState(false);
    const [tierAmount, setTierAmount] = useState(supportTier.amount)
    const [showSnackBar, setShowSnackBar] = useState(false)

    const handleFocus = () => {
        if (sessionUser.user.id) {
            setFocus(true);
        } else {
            setShowSnackBar(true);
        }
    }

    const handleBlur = () => {
        setFocus(false);
    }

    const handleAmountChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        let currAmount = Number(e.target.value)
        setTierAmount(currAmount);
    }



    return (
        <div className='support-tier'
            onMouseLeave={handleBlur}
        >
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

            {
                focus 
                ?
                <div>
                    <span id='pledge-amount-title'>Pledge Amount</span>
                    {tierAmount < supportTier.amount 
                    ? 
                    <span className='alert'>Amount must be atleast ${supportTier.amount}</span> 
                    : 
                    null}
                    <span id='enter-pledge-amount'><span>$</span><input 
                        onChange={handleAmountChange}
                        value={tierAmount}
                        type='number'></input></span>
                    <Button disabled={tierAmount < supportTier.amount} id='continue-pledge-amount'>Continue</Button>
                </div>
                :
            <>
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
            </>
            }
            {showSnackBar && <CustomizedSnackbars props={{showSnackBar,setShowSnackBar}}/>}
            <div className='select-reward-hidden' 
                onClick={handleFocus}
                style={{display: focus ? 'none' : ''}}>Select Reward</div>
            </div>
    );
  
}
  
  export default TierTile;