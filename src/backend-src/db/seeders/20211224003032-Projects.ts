'use strict';
import { QueryInterface } from "sequelize/types";
const { Category } = require('./../models')


module.exports = {
  up: async (queryInterface: QueryInterface,) => {

    const getRandomNumber = () => {
      return Math.random() * (45 - 10) + 10;
    }
    
    const randomDateGenerator = () => {
      let currDate = new Date()
      currDate.setDate(currDate.getDate() + getRandomNumber())
      return currDate
    }

    return queryInterface.bulkInsert('Projects', [
    // Toys
    {
      goal: 50000,
      endDate: randomDateGenerator(),
      title: 'Sexy Beasts',
      summary: 'Are you ready to gift your children some of the Hottest toys of the year? Look no further than our exclusive line of plush toys, with a fun twist',
      video: "https://www.youtube.com/embed/068zMec5Jg8?start=28&end=90",
      screenShot: "https://nathanielcookesairbnblite.s3.us-east-2.amazonaws.com/sexy-beasts.png",
      imgAlt: "stuffed animals wearing lengeria",
      creatorName: 'Joe Gatto',
      categoryId: await Category.getCategoryId('Toys')
    },
    {
      goal: 120000,
      endDate: randomDateGenerator(),
      title: 'Ampubear',
      summary: 'Children can find bears with arms extreamly terrrifying, our latest product aims to address this fact',
      video: "https://www.youtube.com/embed/lQAnh1qJPN4?start=20&end=58",
      screenShot: "https://nathanielcookesairbnblite.s3.us-east-2.amazonaws.com/joke-video-shots/ampu-bear.png",
      imgAlt: "a stuffed bear without two front arms",
      creatorName: 'Brian Quinn',
      categoryId: await Category.getCategoryId('Toys'),
    },
    {
      goal: 80000,
      endDate: randomDateGenerator(),
      title: 'Tiolet Soldiers',
      summary: 'We found that the bathroom of a home can be an otherwise unused place, except for mabey 1 or 2 reasons. Our newest toy changes all of that.',
      video: "https://www.youtube.com/embed/ia0tqws7b0E?start=18&end=118",
      screenShot: "https://nathanielcookesairbnblite.s3.us-east-2.amazonaws.com/joke-video-shots/toilet-soldiers.png",
      imgAlt: "a toilet decked out with soldier toys",
      creatorName: "Sal Vulcano",
      categoryId: await Category.getCategoryId('Toys'),
    },
    {
      goal: 130000,
      endDate: randomDateGenerator(),
      title: "Grandpa Whoopsie",
      summary: "Grandparents can often bring a fear element into thier grandchilrens lives, this product helps to normalize this fear.",
      video: "https://www.youtube.com/embed/aJf3Ra6W3Dw?start=16&end=107",
      screenShot: "https://nathanielcookesairbnblite.s3.us-east-2.amazonaws.com/joke-video-shots/grandpa-woopsie.png",
      imgAlt: "a stuffed elderly male doll, with a large canester to pressurize, to simulate peeing",
      creatorName: "James Murray",
      categoryId: await Category.getCategoryId('Toys'),
    },
    {
      goal: 25000,
      endDate: randomDateGenerator(),
      title: "Mr. Night Light",
      summary: "Children can often feel scared when left alone at night, this product aims to remedy those fears",
      video: "https://www.youtube.com/embed/aoBENdlyRso?start=2&end=44",
      screenShot: "https://nathanielcookesairbnblite.s3.us-east-2.amazonaws.com/joke-video-shots/mr-night-light.png",
      imgAlt: "a large black-cloaked human figure, with glowing red eyes",
      creatorName: "Sal Vulcano",
      categoryId: await Category.getCategoryId('Toys'),
    },
    {
      goal: 350000,
      endDate: randomDateGenerator(),
      title: "Pregnancy Belly",
      summary: "Looking for a product that can run wild with your child imagination, look not further than this latest hit inovation.",
      video: "https://www.youtube.com/embed/rtlFR5SYzYo?start=2263&end=2342",
      screenShot: "https://nathanielcookesairbnblite.s3.us-east-2.amazonaws.com/joke-video-shots/pregnancy-belly.jpeg",
      imgAlt: "a pregnant women",
      creatorName: "James Murray",
      categoryId: await Category.getCategoryId('Toys'),
    },
    {
      goal: 90000,
      endDate: randomDateGenerator(),
      title: "Sister Tracker",
      summary: "A new toy, to allow brothers to keep an eye on thier sisters.",
      video: "https://www.youtube.com/embed/rtlFR5SYzYo?start=3122&end=3190",
      screenShot: "https://nathanielcookesairbnblite.s3.us-east-2.amazonaws.com/joke-video-shots/sister-tracker.png",
      imgAlt: "an assortment of spy gear; listening device, shapmoo with hidden camera",
      creatorName: "Brian Quinn",
      categoryId: await Category.getCategoryId('Toys'),
    },



    // Food
    {
      goal: 170000,
      endDate: randomDateGenerator(),
      title: "Jalapeno Milk",
      summary: "Are you tired of having the same old basic cerial each morning, our product will help to spice your mornings up.",
      video: "https://www.youtube.com/embed/FypMhbbQsFU?start=3&end=82",
      screenShot: "https://nathanielcookesairbnblite.s3.us-east-2.amazonaws.com/joke-video-shots/jala-milk.png",
      imgAlt: "a milk carton with a label that has a jalapeno pepper",
      creatorName: 'Brian Quinn',
      categoryId: await Category.getCategoryId('Food'),
    },
    {
      goal: 70000,
      endDate: randomDateGenerator(),
      title: 'Toxic-O\'s',
      summary: "A new and fun food exculsively to help eliminate rat problems in the home, this is not for children",
      video: "https://www.youtube.com/embed/rtlFR5SYzYo?start=2010&end=2125",
      screenShot: "https://nathanielcookesairbnblite.s3.us-east-2.amazonaws.com/joke-video-shots/toxic-os.png",
      imgAlt: "a box of of seemingly childs cerial, that is actually rat poison",
      creatorName: "Sal Vulcano",
      categoryId: await Category.getCategoryId('Food'),
    },
    {
      goal: 47000,
      endDate: randomDateGenerator(),
      title: '47-Hour Energy Bar',
      summary: "Do you feel tired around the 46th hour?.. look no further than this new surper bar.",
      video: "https://www.youtube.com/embed/rtlFR5SYzYo?start=2544&end=2572",
      screenShot: "https://nathanielcookesairbnblite.s3.us-east-2.amazonaws.com/joke-video-shots/47-hour-energy.png",
      imgAlt: "an approximaitly 1ft x 1ft x 2in edible energy bar",
      creatorName: "Sal Vulcano",
      categoryId: await Category.getCategoryId('Food'),
    },



    // Services
    {
      goal: 19000,
      endDate: randomDateGenerator(),
      title: "Allen the ATM",
      summary: "Getting money from the ATM can feel robotic at times, out new product will fix this pressing issue",
      video: "https://www.youtube.com/embed/rtlFR5SYzYo?start=3445&end=3496",
      screenShot: "https://nathanielcookesairbnblite.s3.us-east-2.amazonaws.com/joke-video-shots/allen-the-atm.png",
      imgAlt: "a humnoid model in a suit with boldging eyes",
      creatorName: "Brian Quinn",
      categoryId: await Category.getCategoryId('Services'),
    },
    {
      goal: 2000000,
      endDate: randomDateGenerator(),
      title: "Playground For Seniors",
      summary: "Help support our revolutionary playgroud, that caters to a completely opposite age range",
      video: "https://www.youtube.com/embed/-N6sw-lZLTA?start=60&end=210",
      screenShot: "https://nathanielcookesairbnblite.s3.us-east-2.amazonaws.com/joke-video-shots/playground.jpeg",
      imgAlt: "an childs playground with slides and moneky-bars",
      creatorName: "Sal Vulcano",
      categoryId: await Category.getCategoryId('Services'),
    },
    {
      goal: 60000,
      endDate: randomDateGenerator(),
      title: "HomeSchooling",
      summary: "A new homeschooling platform, that makes your kids the best homees(home-E-Zs) aroud",
      video: "https://www.youtube.com/embed/8Mxk-FDlSZM?start=5&end=196",
      screenShot: "https://nathanielcookesairbnblite.s3.us-east-2.amazonaws.com/joke-video-shots/homeschooling.jpeg",
      imgAlt: "an image an adualt female, teaching two children",
      creatorName: "Sal Vulcano, Joe Gatto",
      categoryId: await Category.getCategoryId('Services'),
    },




    // Misc
    {
      goal: 60000,
      endDate: randomDateGenerator(),
      title: "Game, Set, Crack",
      summary: "Two drug dealers expand their lucrative trade, with a twist that ends with a crack-pipe in the queens hand",
      video: "https://www.youtube.com/embed/rtlFR5SYzYo?start=1545&end=1584",
      screenShot: "https://nathanielcookesairbnblite.s3.us-east-2.amazonaws.com/joke-video-shots/game-set-crack.jpeg",
      imgAlt: "a person smoking a crack pipe",
      creatorName: 'Joe Gatto',
      categoryId: await Category.getCategoryId('Misc'),
    },
    {
      goal: 5000,
      endDate: randomDateGenerator(),
      title: "Brick Flops",
      summary: "In our fast paced work, we can often forget to slow-down. This project will provide a gental reminder",
      video: "https://www.youtube.com/embed/rtlFR5SYzYo?start=1701&end=1728",
      screenShot: "https://nathanielcookesairbnblite.s3.us-east-2.amazonaws.com/joke-video-shots/brick-flops.png",
      imgAlt: "a pair of flip-flops, with large bricks attached to the soles",
      creatorName: 'Joe Gatto',
      categoryId: await Category.getCategoryId('Misc'),
    },
    {
      goal: 35000,
      endDate: randomDateGenerator(),
      title: "Murder Your Family",
      summary: "We present the newest game that allows children to blow off steam, while subconsously channeling their anger.",
      video: "https://www.youtube.com/embed/rtlFR5SYzYo?start=3610&end=3640",
      screenShot: "https://nathanielcookesairbnblite.s3.us-east-2.amazonaws.com/joke-video-shots/Murder-Your-Family.png",
      imgAlt: "a child looking up at 3 seemingly angry family members; father, mother, and daughter",
      creatorName: 'Joe Gatto',
      categoryId: await Category.getCategoryId('Misc'),
    },
    
  ], {});
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete('Projects', {}, {});
  }
};
