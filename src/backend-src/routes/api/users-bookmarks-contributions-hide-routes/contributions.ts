// packages
import express, {
    Request,
    Response, 
} from 'express';


const { formatContibutions } = require('../../../utils/routeDataAggregators');
const asyncHandler = require('express-async-handler');
const { restoreUser } = require('../../../utils/auth');

const { Project, SupportTier, UsersToSupportTier } = require('../../../db/models');

const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);



// uses posted information to initiate payment through stripe API
router.post('/', restoreUser, asyncHandler( async (req: Request, res: Response) => {

    const { supportTierId, amountPledged, curr_url } = req.body;
    const user = req.user;
    const supportTier = await SupportTier.findByPk(supportTierId);

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
        });

        UsersToSupportTier.create({
            userId: user.id,
            supportTierId: supportTier.id,
            pledgeAmount: amountPledged
        });

        res.json({url: session.url});
        return;
    };

    res.json({url: curr_url});
}))

router.get('/page/:pageNumber', restoreUser, asyncHandler( async (req: Request, res: Response) => {

    const {pageNumber} = req.params;
    const user = req.user;

    const data = await UsersToSupportTier.findAll({
        where: {
            userId: user.id
        },
        include: {
            model: SupportTier,
            include: {
                model: Project,
                include: {
                    model: SupportTier,
                    include: UsersToSupportTier
                }
            }
        },
        order: [['createdAt', 'DESC']]
    });

    const formattedData = await formatContibutions(data, pageNumber, user);
    
    res.json({contributions: formattedData});
}))

module.exports = router;