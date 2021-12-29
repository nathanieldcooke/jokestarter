'use strict';
import { QueryInterface } from "sequelize/types";
import { ISupportTier1 } from "../../types/d";
const { Project, User } = require('./../models')

module.exports = {


  up: async (queryInterface: QueryInterface,) => {
      const getRandomNumber = (min:number, max:number) => {
        return Math.random() * (max - min) + min;
      }

      const randomDateGenerator = () => {
        let currDate = new Date();
        currDate.setDate(currDate.getDate() + getRandomNumber(55, 90));
        return currDate;
      }

      const generateSupportTiers = (project:typeof Project) => {
        const names = ["perspiciatis unde", "omnis iste natus", "error sit", "voluptatem", "accusantium doloremque", "laudantium", "totam rem aperiam"," eaque ipsa quae", "ab illo inventore", "veritatis et quasi", "architecto", "beatae vitae dicta"];
        const summary = 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur';
        const increaseBy = [5, 5, 5, 5, 5, 5, 5, 5,10, 10, 10, 10, 15, 15, 15, 25, 25, 25, 50, 75, 100]
        const supportTiers:ISupportTier1[] = [];
        let potentialAmountRaised = 0;
        let currMinPledge = 5;
        while(potentialAmountRaised < project.goal) {
          const percent = getRandomNumber(10, 20) / 100;
          const AmountTierMustRaise = project.goal * percent;
          currMinPledge = currMinPledge + increaseBy[Math.floor(getRandomNumber(0, 21))];
          const amountAvailable = AmountTierMustRaise / currMinPledge;

          supportTiers.push({
            projectId: project.id,
            name: names.pop(),
            summary: summary.slice(getRandomNumber(1, 10), getRandomNumber(90, 110)),
            estimatedDelivery: randomDateGenerator(),
            shipsTo: 'USA',
            amountAvailable,
            minPledge: currMinPledge,
          })
          potentialAmountRaised += AmountTierMustRaise;
        };
        return supportTiers;
      }

      const projects = await Project.findAll();

      const projectSupportTiers:typeof Project[] = []

      projects.forEach((project:typeof Project) => {
        projectSupportTiers.push(...generateSupportTiers(project))
      })

    return queryInterface.bulkInsert('SupportTiers', projectSupportTiers, {});
  },

  down: (queryInterface: QueryInterface,) => {
    return queryInterface.bulkDelete('SupportTiers', {}, {});
  }
};
