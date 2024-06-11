import Dashboards, { Dashboard } from '@/models/Dashboard';
import connect from '@/lib/mongoose';
import Users, { User } from '@/models/User';
import { Types } from 'mongoose';
import bcrypt from 'bcrypt';
import {Marker} from '@/models/Marker';

const userProjection = {
  email: true,
  name: true,
  surname: true,
  address: true,
  birthdate: true,  
  dashboards: true,
};

const DashboardProjection = {
  description: true,
  dateCreation: true,
  signals: true,
  videos: true,
  markers: true,
};

export interface PostSessionResponse {
  dashboard: Dashboard | null;
}

export interface PostDashboard {
  userId: string;
  dashboard: Dashboard;
  // description: string;
  // dateCreation: Date;
  // signals: string[];
  // videos: string[];
  // markers: string[];
}

export async function postNewDashboard(
  userId: string,
  dashboard: PostDashboard
): Promise<PostSessionResponse | {}> {
  await connect();

  const user = await Users.findById(userId).populate('dashboards', DashboardProjection);

  const dashboardExist = await Dashboards.find({
    description: dashboard.dashboard.description,
    dateCreation: dashboard.dashboard.dateCreation,
    signals: dashboard.dashboard.signals,
    videos: dashboard.dashboard.videos,
    markers: dashboard.dashboard.markers,
  });

  console.log(dashboardExist);

  if (dashboardExist.length !== 0) {
    console.log('dashboard already exist');
    return {dashboard: null};
  }
  
  const dashboardCreated = await Dashboards.create(dashboard.dashboard);

  console.log(dashboardCreated);

  const updatedUser = await Users.findByIdAndUpdate(

    userId,
    {
      $push: { dashboards: dashboardCreated._id },
    },
    { new: true }
  );

  return {
    dashboard: dashboardCreated,
  };
}

export interface DashboardsResponse {
  dashboards: Dashboard[];
}

export async function getDashboards(): Promise<DashboardsResponse> {
  await connect();

  const dashboards = await Dashboards.find({}, DashboardProjection);

  return {
    dashboards: dashboards,
  };
}

export async function getUserDashboards(
  userId: string
): Promise<DashboardsResponse> {
  await connect();

  const User = await Users.findById(userId, userProjection).populate(
    'dashboards',
    DashboardProjection
  );

  const dashboards = await User.dashboards;

  return {
    dashboards: dashboards,
  };
}

export interface DashboardResponse {
  dashboard: Dashboard;
}


export async function getDashboard(
  dashboardId: string
): Promise<DashboardResponse> {
  await connect();

  const dashboard = await Dashboards.findById(dashboardId, DashboardProjection);

  console.log(dashboardId, dashboard);

  return {
    dashboard: dashboard,
  };
}


export async function getUserDashboard(
  userId: string,
  dashboardId: string
): Promise<DashboardResponse> {
  await connect();

  const user = await Users.findById(userId, userProjection).populate('dashboards', DashboardProjection);

  const dashboards = user.dashboards;

  const dashboard = dashboards.find((dashboard: Dashboard) => dashboard._id && dashboard._id.equals(dashboardId))

  console.log(dashboardId, dashboard);

  return {
    dashboard: dashboard,
  };
}

export async function deleteUserDashboard(
  userId: string,
  dashboardId: string
): Promise<DashboardsResponse | {}> {
  await connect();

  //const dashboards = await Dashboards.deleteMany({});

  const user = await Users.findById(userId, userProjection).populate('dashboards', DashboardProjection);

  const dashboards = user.dashboards;

  const dashboard = dashboards.find((dashboard: Dashboard)=> dashboard._id && dashboard._id.equals(dashboardId));

  if(!dashboard)
    return {};

  //const dashboardsDeleted = 
  
  dashboards.splice(dashboards.indexOf(dashboard), 1);

  user.dashboards = dashboards;
  await user.save();

  const result : DashboardsResponse | null = await Dashboards.findByIdAndDelete(dashboardId);

  if(result === null)
    return {};

  console.log(result);

  return {
    dashboards: dashboards,
  };
}

export async function updateUserDashboard(
  userId: string,
  dashboardId: string,
  markers: Marker[]
): Promise<DashboardsResponse | {}> {
  await connect();
  
  //const dashboards = await Dashboards.deleteMany({});

  const user = await Users.findById(userId, userProjection).populate('dashboards', DashboardProjection);
  const dashboards = user.dashboards;
  const dashboard = dashboards.find((dashboard: Dashboard)=> dashboard._id && dashboard._id.equals(dashboardId));

  if(!dashboard)
    return {};

  //const dashboardsDeleted = 
  
  console.log(markers);

  const updatedDashboard = await Dashboards.findByIdAndUpdate(

    dashboard._id,
    {
      $set: { markers: markers },
    },
    { new: true }
  );

  
  console.log({dashboard: updatedDashboard});

  return {
    dashboard: updatedDashboard,
  };
}

export interface CreateUserResponse {
  _id: Types.ObjectId | string;
}

export async function createUser(user: {
  email: string;
  password: string;
  name: string;
  surname: string;
  address?: string;
  birthdate?: string;
  dashboards?: Types.ObjectId[];
}): Promise<CreateUserResponse | null> {
  await connect();

  const prevUser = await Users.find({ email: user.email });

  console.log(prevUser);

  if (prevUser.length !== 0) {
    return null;
  }
  const hash = await bcrypt.hash(user.password, 10);

  console.log(user)

  const doc: User = {
    ...user,
    password: hash,
  };

  const newUser = await Users.create(doc);

  return {
    _id: newUser._id,
  };
}

export interface UserResponse {
  email: string;
  name: string;
  surname: string;
  address?: string;
  birthdate?: string;
  dashboards?: Dashboard[];
}

export async function getUser(userId: string): Promise<UserResponse | null> {
  await connect();

  const user = await Users.findById(userId, userProjection);

  console.log(user._id, user.email, user.name, user.surname, user.address, user.birthdate, user.dashboards)

  if (user === null) {
    return null;
  }

  return user;
}
