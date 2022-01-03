/*
GLOSSARY:
    route: projects
    route: users
    route: users/bookmarks
    route: users/contributions
*/

/////////////////////route: projects

import { Op } from "sequelize";
import { IUser, IProjects, ISupportTier2, IReceipt } from "../types/d";

const { Project, Category, SupportTier, UsersToSupportTier, Bookmark, HideList, User } = require('../db/models');

const getOtherCategory = async (category:string, pageNumber:string, user:IUser) => {
    const zeroIndexPage = Number(pageNumber) - 1;
    
    const categoryId = await Category.getCategoryId(category);
    
    let bookmarkedProjects:typeof Project[]|number[] = [];
    let hideLists:typeof Project[]|number[] = [];
    
    if (user) {
        bookmarkedProjects = await Bookmark.findAll({
            where: {
                userId: user.id
            }
        });
    
        hideLists = await HideList.findAll({
            where: {
                userId: user.id
            }
        });
    
        bookmarkedProjects = bookmarkedProjects.map((bookmark:typeof Project) => bookmark.projectId)
        hideLists = hideLists.map((hide:typeof Project) => hide.projectId)
    };

    let bookmarkedProjectsSet = new Set(bookmarkedProjects);

    let projects = await Project.findAll({
        include: SupportTier,
        where: {
            categoryId: categoryId,
            id: {
                [Op.not]: hideLists
            }
        },
    });

    const projectsDict:IProjects[] = []
    for (let project of projects)  {
        let sum = 0;
        let percentFunded = 0;

        for (let supportTier of project.SupportTiers) {
            let usersToSupportTier = await UsersToSupportTier.findAll({
                where: {
                    supportTierId: supportTier.id
                }
            });

            usersToSupportTier.forEach((uToSTier: typeof UsersToSupportTier) => {
                sum += uToSTier.pledgeAmount;
            });

        }
        percentFunded = sum / project.goal;
        projectsDict.push({
            id: project.id,
            screenShot: project.screenShot,
            title: project.title,
            summary: project.summary,
            imgAlt: project.imgAlt,
            creatorName: project.creatorName,
            percentFunded,
            pageNums: Math.ceil(projects.length / 4),
            bookmarked: bookmarkedProjectsSet.has(project.id)
        });
    };

    return projectsDict.slice(zeroIndexPage * 4, zeroIndexPage * 4 + 4);

}
const getTop = async (pageNumber:string, user:IUser) => {
    const zeroIndexPage = Number(pageNumber) - 1;

    const categories = await Category.findAll({
        where: {
            name: {
                [Op.not]: ['Top', 'Bookmarks', 'Contributed']
            }
        }
    });

    const categoryIds = categories.map((category:typeof Category) => category.id);

    let bookmarkedProjects:typeof Project[]|number[] = [];
    let hideLists:typeof Project[]|number[] = [];
    
    if (user) {
        bookmarkedProjects = await Bookmark.findAll({
            where: {
                userId: user.id
            }
        });
    
        hideLists = await HideList.findAll({
            where: {
                userId: user.id
            }
        });
    
        bookmarkedProjects = bookmarkedProjects.map((bookmark:typeof Project) => bookmark.projectId);
        hideLists = hideLists.map((hide:typeof Project) => hide.projectId);
    };
    
    let bookmarkedProjectsSet = new Set(bookmarkedProjects);

    let projects = await Project.findAll({
        include: SupportTier,
        where: {
            categoryId: {
                [Op.or]: categoryIds
            },
            id: {
                [Op.not]: hideLists
            }
        },
    });

    const projectsDict:IProjects[] = []
    for (let project of projects)  {
        let sum = 0;
        let percentFunded = 0;

        for (let supportTier of project.SupportTiers) {
            let usersToSupportTier = await UsersToSupportTier.findAll({
                where: {
                    supportTierId: supportTier.id
                }
            });

            usersToSupportTier.forEach((uToSTier: typeof UsersToSupportTier) => {
                sum += uToSTier.pledgeAmount;
            });

        }
        percentFunded = sum / project.goal;
        projectsDict.push({
            id: project.id,
            screenShot: project.screenShot,
            title: project.title,
            summary: project.summary,
            imgAlt: project.imgAlt,
            creatorName: project.creatorName,
            percentFunded,
            pageNums: Math.ceil(projects.length / 4),
            bookmarked: bookmarkedProjectsSet.has(project.id)
        });
    };

    projectsDict.sort((a:IProjects, b:IProjects) => b.percentFunded - a.percentFunded);

    return projectsDict.slice(zeroIndexPage * 4, zeroIndexPage * 4 + 4);
}

const genDictSupportTier = (supportTier: typeof SupportTier, usersToSupportTier: typeof UsersToSupportTier) => {
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let backers = usersToSupportTier.length;
    let amountLeft = supportTier.amountAvailable - backers;
    let date = new Date(supportTier.estimatedDelivery);

    return {
        id: supportTier.id,
        amount: supportTier.minPledge,
        name: supportTier.name,
        summary: supportTier.summary,
        shipsTo: supportTier.shipsTo,
        backers,
        amountLeft,
        estimatedDelivery: `${months[date.getMonth()]} ${date.getFullYear()}`
    };
};

const getProjectDetails = async (projectId:string, user:IUser) => {


    let project = await Project.findByPk(projectId, {
        include: SupportTier
    });

    let sum = 0;
    let numOfBackers = 0;
    let percentFunded = 0;
    let supportTiers:ISupportTier2[] = [];

    let bookmarkedProjects = [];
    
    if (user) {
        bookmarkedProjects = await Bookmark.findAll({
            where: {
                userId: user.id
            }
        });
    
        bookmarkedProjects = bookmarkedProjects.map((bookmark: { projectId: number; }) => bookmark.projectId)
    };
    
    let bookmarkedProjectsSet = new Set(bookmarkedProjects);

    for (let supportTier of project.SupportTiers) {
        let usersToSupportTier = await UsersToSupportTier.findAll({
            where: {
                supportTierId: supportTier.id
            }
        });

        usersToSupportTier.forEach((uToSTier: typeof UsersToSupportTier) => {
            sum += uToSTier.pledgeAmount;
            numOfBackers += 1;
        });

        let dictSupportTier = genDictSupportTier(supportTier, usersToSupportTier);
        supportTiers.push(dictSupportTier);
    }

    percentFunded = sum / project.goal;

    let d1 = new Date();
    let d2 = new Date(project.endDate);

    let diffInTIme = d2.getTime() - d1.getTime();

    let diffInDays = diffInTIme / (1000 * 3600 * 24);

    return {
        id: project.id,
        goal: project.goal,
        screenShot: project.screenShot,
        videoSrc: project.video,
        title: project.title,
        summary: project.summary,
        creatorName: project.creatorName,
        fundsCollected: sum,
        percentFunded,
        numOfBackers,
        supportTiers,
        daysToGo: Math.floor(diffInDays),
        bookmarked: bookmarkedProjectsSet.has(project.id)
    };

};

/////////////////////route: users

const generateDemoUser = async () => {
    
    const getRandomInt = (max:number) => {
        return Math.floor(Math.random() * max);
    }

    const randomNum = `${getRandomInt(10)}${getRandomInt(10)}${getRandomInt(10)}`;
    const username = `Demo User-${randomNum}`;
    const email = `demo-user${randomNum}@demouser.com`;
    const password = `password${randomNum}!A`;
    const user = await User.signup({username, email, password });

    const projectId1 = await Project.getProjectId('Sexy Beasts');
    const projectId2 = await Project.getProjectId('Jalapeno Milk');
    const projectId3 = await Project.getProjectId('Playground For Seniors');
    
    await Bookmark.create({ userId: user.id, projectId: projectId1 });
    await Bookmark.create({ userId: user.id, projectId: projectId2 });
    await Bookmark.create({ userId: user.id, projectId: projectId3 });

    await Project.findOne({
        where: {
            title: 'Pregnancy Belly'
        },
        include: SupportTier
    })
    const project1 = await Project.findOne({
        where: {
            title: 'HomeSchooling'
        },
        include: SupportTier
    })
    const project2 = await Project.findOne({
        where: {
            title: 'Game, Set, Crack'
        },
        include: SupportTier
    })
    const project3 = await Project.findOne({
        where: {
            title: 'Pregnancy Belly'
        },
        include: SupportTier
    })

    const supportTier1 = project1.SupportTiers[0].id
    const supportTier1Pledge = project1.SupportTiers[0].minPledge
    const supportTier2 = project2.SupportTiers[3].id
    const supportTier2Pledge = project2.SupportTiers[0].minPledge
    const supportTier3 = project3.SupportTiers[2].id
    const supportTier3Pledge = project3.SupportTiers[0].minPledge

    await UsersToSupportTier.create({userId: user.id, supportTierId: supportTier1, pledgeAmount: supportTier1Pledge})
    await UsersToSupportTier.create({userId: user.id, supportTierId: supportTier2, pledgeAmount: supportTier2Pledge})
    await UsersToSupportTier.create({userId: user.id, supportTierId: supportTier3, pledgeAmount: supportTier3Pledge})

    return user;
}

/////////////////////route: users/bookmarks

const getBookmarks = async (pageNumber:string, user:IUser) => {
    
    const zeroIndexPage = Number(pageNumber) - 1;

    let userBookmarks = await Bookmark.findAll({
        where: {
            userId: user.id
        }
    });

    userBookmarks = userBookmarks.map((bookmark: typeof Bookmark) => bookmark.projectId);

    let projects = await Project.findAll({
        include: {
            model: SupportTier,
            include: UsersToSupportTier
        },
        where: {
            id: {
                [Op.in]: userBookmarks
            }
        }
    });

    const projectsDict:IProjects[] = projects.map((project: typeof Project) => {

        let sum = 0;
        let percentFunded = 0;

        project.SupportTiers.forEach((supportTier: typeof SupportTier) => {
            sum += supportTier.UsersToSupportTiers.length * supportTier.minPledge 
        });

        percentFunded = sum / project.goal * 100;

        return {
            id: project.id,
            screenShot: project.screenShot,
            title: project.title,
            summary: project.summary,
            imgAlt: project.imgAlt,
            creatorName: project.creatorName,
            percentFunded,
            pageNums: Math.ceil(projects.length / 4),
            bookmarked: true
        };
    });

    return projectsDict.slice(zeroIndexPage * 4, zeroIndexPage * 4 + 4);
}

const addBookmark = async (projectId:string, user:IUser) => {
    await Bookmark.create({
        projectId,
        userId: user.id
    });
};

const removeBookmark = async (projectId:string, user:IUser) => {
    const bookmark = await Bookmark.findOne({
        where: {
            projectId,
            userId: user.id
        }
    });
    if (bookmark) {
        await bookmark.destroy()
    };
};

/////////////////////route: users/contributions

const formatContibutions = async (data:typeof UsersToSupportTier[], pageNumber:string, user:IUser) => {

    const zeroIndexPage = Number(pageNumber) - 1;
    let bookmarkedProjects = [];

    if (user) {
        bookmarkedProjects = await Bookmark.findAll({
            where: {
                userId: user.id
            }
        });
    
        bookmarkedProjects = bookmarkedProjects.map((bookmark:typeof Bookmark) => bookmark.projectId)
    };

    let bookmarkedProjectsSet = new Set(bookmarkedProjects);

    let receipts:{receiptTile:IReceipt,projectTile:IProjects}[] = data.map((dataPoint:typeof UsersToSupportTier) => {

        const supportTier = dataPoint.SupportTier;
        const project = supportTier.Project;
        const supportTiers = project.SupportTiers;
        
        let sum = 0;
        let percentFunded = 0;

        supportTiers.forEach((supportTier: typeof SupportTier) => {
            sum += supportTier.UsersToSupportTiers.length * supportTier.minPledge;
        })

        percentFunded = sum / project.goal * 100;

        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let date = new Date(supportTier.estimatedDelivery);

        return {
            receiptTile:{
                amountPledged: dataPoint.pledgeAmount,
                nameOfTier: supportTier.name,
                summaryOfTier: supportTier.summary,
                etaDelivery: `${months[date.getMonth()]} ${date.getFullYear()}`,
                shipsTo: supportTier.shipsTo
            },
            projectTile:{
                id: project.id,
                screenShot: project.screenShot,
                title: project.title,
                summary: project.summary,
                imgAlt: project.imgAlt,
                creatorName: project.creatorName,
                percentFunded,
                pageNums: Math.ceil(data.length / 2),
                bookmarked: bookmarkedProjectsSet.has(project.id)
            }
        };
    });

    return receipts.slice(zeroIndexPage * 2, zeroIndexPage * 2 + 2);
}


module.exports = {
    formatContibutions, 
    removeBookmark,
    addBookmark,
    getBookmarks,
    getProjectDetails,
    getOtherCategory,
    getTop,
    genDictSupportTier,
    generateDemoUser
};