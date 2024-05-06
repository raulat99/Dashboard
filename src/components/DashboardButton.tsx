// 'use client'

import {SessionUser} from '@/models/Session';
import Link from 'next/link';


interface DashboardProps {
    dashboard: SessionUser ;
  }


export default function DashboardButton({dashboard}: DashboardProps)
{
    return (
        <Link href={'/dashboard/' + dashboard._id}>
            <button>{String(dashboard._id)}</button>
            <p>{dashboard.description}</p>
        </Link>
        
    );
}