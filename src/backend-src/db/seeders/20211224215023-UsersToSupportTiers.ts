'use strict';
import { QueryInterface } from "sequelize/types";
import { IUsersToTiersProject } from "../../types/d";
const { Project, User, SupportTier } = require('./../models')

module.exports = {
  
  up: async (queryInterface: QueryInterface,) => {

    const getRandomNumber = (min:number, max:number) => {
      return Math.random() * (max - min) + min;
    }

    const generateUsersToTiers = async (project:typeof Project) => {
      const usersToTiersProject:IUsersToTiersProject[] = []
      const percent = getRandomNumber(5, 70) / 100
      const amountOfGoalToHit = project.goal * percent
      let amountRaised = 0;
      let otherUserId = await User.getUserId('Other User')
      const supportTiers = await SupportTier.findAll({
        where: {
          projectId: project.id
        }
      }) 

      while (amountRaised < amountOfGoalToHit && supportTiers.length) {
        const percent = getRandomNumber(5, 25) / 100
        const currSupportTier = supportTiers.shift()
        const FractionOfAmountOfGoalToHit = amountOfGoalToHit * percent
        const pledgeAmount = currSupportTier.minPledge;
        let amountPledgesToCreate = 0
        if (FractionOfAmountOfGoalToHit / pledgeAmount > currSupportTier.amountAvailable) {
          amountPledgesToCreate = Math.floor(currSupportTier.amountAvailable * .3);
        } else {
          amountPledgesToCreate = Math.floor(FractionOfAmountOfGoalToHit / pledgeAmount);
        }
        let currAmount = 0;
        while (currAmount < amountPledgesToCreate) {
          usersToTiersProject.push({
            userId: otherUserId,
            supportTierId: currSupportTier.id,
            pledgeAmount,
          });
          ++currAmount;
        }
        amountRaised += FractionOfAmountOfGoalToHit;
      }
      
      return usersToTiersProject;
    }

    
    const projects = await Project.findAll();
    const usersToTiers:typeof Project[] = []
    
    for (let project of projects) {
      let projectUserToSupport = await generateUsersToTiers(project)
      usersToTiers.push(...projectUserToSupport)
    };

    return queryInterface.bulkInsert('UsersToSupportTiers', usersToTiers, {});
  },

  down: (queryInterface: QueryInterface,) => {
    return queryInterface.bulkDelete('UsersToSupportTiers', {}, {});
  }
};
