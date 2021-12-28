import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { IUser } from '../d';
import { RootState } from '../store';
import * as contributionsActions from './../store/contributions';

type urlParams = {
    pageNumber:string
}

export default function Contributions() {
    const dispatch = useDispatch();
    const { pageNumber } = useParams<urlParams>();
    const sessionUser:IUser = useSelector((state: RootState) => state.session);

    useEffect(() => {
        dispatch(contributionsActions.getContributions(sessionUser.user.id, pageNumber))
    }, [dispatch])
  return (
    <div>Contribute Page Comp</div>
  );
}