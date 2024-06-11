import { Session } from 'next-auth';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';
import { DashboardResponse, DashboardsResponse, deleteUserDashboard, getUserDashboard, updateUserDashboard } from '@/lib/handlers';
import { NextRequest, NextResponse } from 'next/server';
import { Types } from 'mongoose';
import { Marker } from '@/models/Marker';

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

  const dashboard = await getUserDashboard(session.user._id, params.dashboardId);

  return NextResponse.json(dashboard);
}

export async function DELETE(
  request: NextRequest,
  {
    params,
  }: {
    params: { userId:string, dashboardId: string };
  }
): Promise<NextResponse<DashboardsResponse> | {}> {
  
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

const dashboards = await deleteUserDashboard(session.user._id, params.dashboardId);

console.log(dashboards);
if( dashboards.dashboards === {} ||  dashboards.dashboards.length === 0  )
  return NextResponse.json({}, { status: 404 });




return NextResponse.json(dashboards, { status: 200 });
}

export async function PUT(
  request: NextRequest,
  {
    params,
  }: {
    params: { userId:string, dashboardId: string };
  }
): Promise<NextResponse<DashboardsResponse> | {}> {
  const body = await request.json();
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

console.log(body.markers);

const dashboard = await updateUserDashboard(session.user._id, params.dashboardId, body.markers);

console.log(dashboard);


if(  dashboard === null )
  return NextResponse.json({}, { status: 404 });


return NextResponse.json(dashboard, { status: 200 });
}