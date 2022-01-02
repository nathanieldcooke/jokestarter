import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { IContribution, IUser } from '../d';
import { RootState } from '../store';
import * as contributionsActions from './../store/contributions';
import ContTierTile from './ContTierTile';
import ProjectTile from './ProjectTIle'
import { Pagination, Stack } from '@mui/material';
import '../compStyles/Contributions.css'

type urlParams = {
    pageNumber:string
}

export default function Contributions() {
    const history = useHistory();
    const dispatch = useDispatch();
    const { pageNumber } = useParams<urlParams>();
    const sessionUser:IUser = useSelector((state: RootState) => state.session);
    const contributions:IContribution[] = useSelector((state: RootState) => state.contributions);
    const pageNums = (contributions[0] && contributions[0].projectTile.id) ? contributions[0].projectTile.pageNums : 0;
    const pageNumberNum:number = Number(pageNumber)
    const [page, setPage] = useState(pageNumberNum);

    const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
      dispatch(contributionsActions.getContributions(sessionUser.user.id, `${value}`))
      setPage(value);
      history.push(`/contributions/page/${value}`)
    };

    useEffect(() => {
        dispatch(contributionsActions.getContributions(sessionUser.user.id, pageNumber))
    }, [dispatch])

  return (
    <>
        <div className='page-dial-container-top'>
          <Stack spacing={2}>
            <Pagination count={pageNums} page={page} onChange={handleChange} />
          </Stack>    
        </div>
        {
          (!contributions[0] || !contributions[0].projectTile.id)
          ?
          null
          :
        <div className='cont-tier-tile'>
            {contributions.map((contribution:IContribution) => {
                return (
                    <section className='sub-cont-tier-tile' key={`${contribution.projectTile.id}${Math.random()}`}>
                        <ProjectTile props={{project: contribution.projectTile}}/>
                        <ContTierTile props={{supportTier: contribution.receiptTile}}/>
                    </section>
                )
            })}
        </div>
        }
        <div className='page-dial-container-bottom'>
        <Stack spacing={2}>
          <Pagination count={pageNums} page={page} onChange={handleChange} />
        </Stack>
      </div>
    </>
  );
}