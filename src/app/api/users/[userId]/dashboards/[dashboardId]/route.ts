import { Session } from 'next-auth';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';
import { DashboardResponse, PostSessionResponse, UserResponse, getUserDashboard, getUser } from '@/lib/handlers';
import { NextRequest, NextResponse } from 'next/server';
import { Types } from 'mongoose';

export async function GET(
    request: NextRequest,
    {
      params,
    }: {
      params: { userId:string, dashboardId: string };
    }
): Promise<NextResponse<DashboardResponse> | {}> {
    
  const session: Session | null = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({}, { status: 401 });
  }

  if (!Types.ObjectId.isValid(params.userId)) {
    return NextResponse.json({}, { status: 400 });
  }
  if (session.user._id !== params.userId) {
    return NextResponse.json({}, { status: 403 });
  }

  const dashboard = await getUserDashboard(params.dashboardId);

  return NextResponse.json(dashboard);
}

