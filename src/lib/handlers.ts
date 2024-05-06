import SessionUsers, {SessionUser} from '@/models/Session';
import connect from '@/lib/mongoose';
import Users, { User } from '@/models/User';
import { ObjectId, Types } from 'mongoose';
import bcrypt from 'bcrypt';

export interface SessionsResponse {
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
  