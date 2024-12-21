import feathers, { Application } from '@feathersjs/feathers';
import auth from '@feathersjs/authentication-client';
import { CookieStorage } from 'cookie-storage';
import rest from '@feathersjs/rest-client';
import Axios from 'axios';
import services from './services.json';
// import * as process from 'process';
import config from '@gc-broadcast-web/config/env';
export const authCookieName = config.authCookieName;

/**
 * CookieStorage
 * @type {CookieStorage}
 */
export const cookieStorage = new CookieStorage({
  domain: process.env.NODE_ENV === 'production' ? config.paths.cookieDomain : undefined,
});

export const apiPath = config.paths.baseApi;

const restClient = rest(apiPath);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const restApp: Application = feathers();

// declare module '@feathersjs/feathers/lib/declarations' {
// 	// eslint-disable-next-line @typescript-eslint/no-unused-vars
// 	interface Application<Services, Settings> {
// 		// eslint-disable-line
// 		io: any;
// 		rest?: any;
// 		// authentication: AuthenticationClient;
// 		authenticate: AuthenticationClient['authenticate'];
// 		reAuthenticate: AuthenticationClient['reAuthenticate'];
// 		logout: AuthenticationClient['logout'];
// 	}
// }

restApp.configure(restClient.axios(Axios));

restApp.configure(
  auth({
    path: services.authentication,
    // cookie: process.env.NEXT_COOKIE_NAME,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    cookie: authCookieName,
    // storageKey: process.env.NEXT_COOKIE_NAME,
    storageKey: authCookieName,
    storage: cookieStorage,
    domain: process.env.NODE_ENV === 'production' ? config.paths.cookieDomain : undefined,
  }),
);

// Function to get the authentication token from the cookie storage
const getTokenFromCookie = () => {
  const token = cookieStorage.getItem(authCookieName); // Get token from cookie storage
  return token ? `Bearer ${token}` : ''; // Return token with 'Bearer' prefix
};

// Configure Axios to include token in headers for all services
restApp.hooks({
  before: {
    all: [
      (context) => {
        // Add token to headers
        context.params.headers = {
          ...context.params.headers,
          Authorization: getTokenFromCookie(),
        };
        return context;
      },
    ],
  },
});

export const OrganizationService = restApp.service(services.organization);
export const UserService = restApp.service(services.users);
export const VendorService = restApp.service(services.vendors);
export const FormFieldSectionsService = restApp.service(services.formFieldSections);
export const FormFieldService = restApp.service(services.formFields);
export const ProfileService = restApp.service(services.profile);
export const BranchService = restApp.service(services.branch);
export const DepartmentService = restApp.service(services.department);
export const LeaveTypeService = restApp.service(services.leaveType);
export const AttendanceService = restApp.service(services.attendance);
export const AttendanceRegularizationService = restApp.service(services.attendanceRegularization);
export const LeaveService = restApp.service(services.leave);
export const GetFormService = restApp.service(services.getForm);
export const BranchUserService = restApp.service(services.branchUser);
export const FileUploadService = restApp.service(services.files);
export const ExportAttendanceLogService = restApp.service(services.exportAttendanceLog);
export const ExportAttendanceRegularizationLogService = restApp.service(services.exportAttendanceRegularizationLog);

export const FloorService = restApp.service(services.floors);
export const RoomService = restApp.service(services.rooms);
export const DashBoardService = restApp.service(services.dashboard);
export const TasksService = restApp.service(services.tasks);
export const ItemService = restApp.service(services.items);
export const PurchaseOrderService = restApp.service(services.purchaseorders);
export const PurchaseReceiveService = restApp.service(services.purchasereceive);
export const ItemLogService = restApp.service(services.itemlog);
export const ItemAdjustmentService = restApp.service(services.itemadjustment);
export const PurchaseOrderManageService = restApp.service(services.purchaseordermanage);
export const SalesOrderService = restApp.service(services.salesorder);








export default restApp;

// export const UsersService = restApp.service(services.users);
