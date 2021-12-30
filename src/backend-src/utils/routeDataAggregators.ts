/*
GLOSSARY:
    route: projects
    route: users/bookmarks
    route: projects
*/

/////////////////////route: projects

import { Op } from "sequelize";
import { IUser, IProjects, ISupportTier2, IReciept } from "../types/d";

const { Project, Category, SupportTier, UsersToSupportTier, Bookmark, HideList } = require('../db/models');

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
        include: {
            model: SupportTier,
            include: UsersToSupportTier
        },
        where: {
            categoryId: categoryId,
            id: {
                [Op.not]: hideLists
            }
        },
    });


    const projectsDict:IProjects[] = projects.map((project:typeof Project) => {
        let sum = 0;
        let percentFunded = 0;
        project.SupportTiers.forEach((supportTier:typeof SupportTier) => {
            sum += supportTier.UsersToSupportTiers.length * supportTier.minPledge;
        })
        percentFunded = sum / project.goal * 100

        return {
            id: project.id,
            screenShot: project.screenShot,
            title: project.title,
            summary: project.summary,
            creatorName: project.creatorName,
            percentFunded,
            pageNums: Math.ceil(projects.length / 4),
            bookmarked: bookmarkedProjectsSet.has(project.id)
        };
    });

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
        include: {
            model: SupportTier,
            include: UsersToSupportTier
        },
        where: {
            categoryId: {
                [Op.or]: categoryIds
            },
            id: {
                [Op.not]: hideLists
            }
        },
    });

    let projectsDict:IProjects[] = projects.map((project: typeof Project) => {

        let sum = 0;
        let percentFunded = 0;

        project.SupportTiers.forEach((supportTier:typeof SupportTier) => {
            sum += supportTier.UsersToSupportTiers.length * supportTier.minPledge;
        })

        percentFunded = sum / project.goal * 100;

        return {
            id: project.id,
            screenShot: project.screenShot,
            title: project.title,
            summary: project.summary,
            creatorName: project.creatorName,
            percentFunded,
            pageNums: Math.ceil(projects.length / 4),
            bookmarked: bookmarkedProjectsSet.has(project.id)
        };
    });

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

    let reciepts:{recieptTile:IReciept,projectTile:IProjects}[] = data.map((dataPoint:typeof UsersToSupportTier) => {

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
            recieptTile:{
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
                creatorName: project.creatorName,
                percentFunded,
                pageNums: Math.ceil(data.length / 2),
                bookmarked: bookmarkedProjectsSet.has(project.id)
            }
        };
    });

    return reciepts.slice(zeroIndexPage * 2, zeroIndexPage * 2 + 2);
}


module.exports = {
    formatContibutions, 
    removeBookmark,
    addBookmark,
    getBookmarks,
    getProjectDetails,
    getOtherCategory,
    getTop,
    genDictSupportTier
};