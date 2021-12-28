// packages
import express, {
    Application, 
    Request,
    Response, 
    NextFunction
} from 'express';

const { Op } = require("sequelize");

import { ExpError, IUser } from '../../../custom-types';
const asyncHandler = require('express-async-handler');
const { setTokenCookie, restoreUser, requireAuth } = require('../../../utils/auth');

const { Project, Category, SupportTier, UsersToSupportTier, Bookmark, HideList } = require('../../../db/models');

const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

router.post('/', restoreUser, asyncHandler( async (req: Request, res: Response) => {
    const { supportTierId, amountPledged, curr_url } = req.body;
    const user = req.user
    const supportTier = await SupportTier.findByPk(supportTierId);
    console.log('HIT BACK ROUTE', supportTierId, amountPledged, supportTier.minPledge)
    if (Number(amountPledged) >= supportTier.minPledge) {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: supportTier.name
                        },
                        unit_amount: amountPledged * 100
                    },
                    quantity: 1
                }
            ],
            mode: 'payment',
            success_url: `${process.env.DOMAIN}/contributions/page/1`,
            cancel_url: `${process.env.DOMAIN + curr_url}`
        })

        UsersToSupportTier.create({
            userId: user.id,
            supportTierId: supportTier.id,
            pledgeAmount: amountPledged
        })

        res.json({url: session.url}) 
        return
    }
    res.json({url: curr_url})
}))

module.exports = router;