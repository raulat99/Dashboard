import SessionUsers, {SessionUser} from '@/models/Session';
import connect from '@/lib/mongoose';
import Users, { User } from '@/models/User';
import { ObjectId, Types } from 'mongoose';
import bcrypt from 'bcrypt';

export interface PostSessionResponse {
  session: SessionUser;
}

export interface PostDashboard {
  userId: string;
  session: SessionUser;
  // description: string;
  // dateCreation: Date;
  // signals: string[];
  // videos: string[];
  // markers: string[];
}

export async function postNewDashboard(
  userId: string,
  session1: PostDashboard
): Promise<PostSessionResponse> {
  await connect();

  // const sessionProjection = {
  //   description: true,
  //   dateCreation: true,
  //   signals: true,
  //   videos: true,
  //   markers: true,
  // }
  // const sessions = await SessionUsers.find({}, sessionProjection);

  console.log(session1);

  const res1 = await SessionUsers.create(session1.session);
  
  return {
    session: res1,
  };
}


export interface SessionsResponse {
    _id: any;
    sessions: SessionUser[];
}

export async function getSessions(): Promise<SessionsResponse> {
  await connect();

  const sessionProjection = {
    description: true,
    dateCreation: true,
    signals: true,
    videos: true,
    markers: true,
  }
  const sessions = await SessionUsers.find({}, sessionProjection);
  
  return {
    sessions: sessions,
  };
}

export interface DashboardResponse {
  dashboard: SessionUser;
}

export async function getDashboard(dashboardId : string): Promise<DashboardResponse> {
await connect();

const dashboardProjection = {
  description: true,
  dateCreation: true,
  signals: true,
  videos: true,
  markers: true,
}
const dashboard = await SessionUsers.findById(dashboardId, dashboardProjection);

console.log(dashboardId, dashboard);

return {
  dashboard: dashboard,
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
  sessionUser?: Types.ObjectId;
}): Promise<CreateUserResponse | null> {
  await connect();

  const prevUser = await Users.find({ email: user.email });

  if (prevUser.length !== 0) {
    return null;
  }
  const hash = await bcrypt.hash(user.password, 10);

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
    sessionUser?: SessionUser;
  }
  
  export async function getUser(userId: string): Promise<UserResponse | null> {
    await connect();
  
    const userProjection = {
      email: true,
      name: true,
      surname: true,
      sessionUser: true,
    };
    const user = await Users.findById(userId, userProjection);

    

    if (user === null) {
      return null;
    }
  
    return user;
  }
  