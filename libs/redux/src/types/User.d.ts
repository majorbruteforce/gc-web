import {UserRole} from "../constants/UserRole";
import {Organization} from "./Organization";
import {Profile} from "./Profile";
import {Branch} from "./Branch";

export interface User {
  _id?: string;
  avatar?: string;
  firstName: string;
  lastName: string;
  email: string;
  type: UserRole;
  profile?: Profile;
  employeeId: string;
  organization: Organization;
  designation: string;
  createdAt: Date;
  updatedAt: Date;
  gender: 'male' | 'female' | 'other';
  data?: Record<string, string>;
  branches?: {
    branch: Branch;
    profile: Profile;
  }[];
}
