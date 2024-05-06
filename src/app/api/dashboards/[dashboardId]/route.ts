import { Session } from 'next-auth';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';
import { DashboardResponse, UserResponse, getDashboard, getUser } from '@/lib/handlers';
import { NextRequest, NextResponse } from 'next/server';
import { Types } from 'mongoose';

export async function GET(
    request: NextRequest,
    {
      params,
    }: {
      params: { dashboardId: string };
    }
): Promise<NextResponse<DashboardResponse>> {
    

  const dashboard = await getDashboard(params.dashboardId);

  return NextResponse.json(dashboard);
}