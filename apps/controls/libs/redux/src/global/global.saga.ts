import { all, AllEffect, ForkEffect, takeLatest } from 'redux-saga/effects';
import { GlobalActions } from "./actionType";
import { cookieStorage } from "../../../utils/src/axios";


function* validateUserTokenSaga() {
  try {
    const accessToken = cookieStorage.get('_cc_tk');


    // const cookiesData = getUserCredential();
    // setAxiosBasicInfo(
    // 	'TOKEN',
    // 	`Bearer ${
    // 		(cookiesData?.authToken as string) || (process.env.NODE_ENV === 'development' ? projectConfig.authToken : '')
    // 	}`,
    // );
    // setAxiosBasicInfo(
    // 	'TEAM_MEMBER_ID',
    // 	((cookiesData?.teamMemberId || 0) as string) ||
    // 		(process.env.NODE_ENV === 'development' ? projectConfig.teamMemberId.toString() : ''),
    // );
    // const resp: NetworkResponseForDash<any> = yield call(sagaCancelRequestDashAuth, BaseAPIRoutes.USER_AUTH, {});

    // const resp: any;
    // if (resp?.status === 200) {
    // 	yield put(setUserInfo(resp.data));
    // } else if (resp?.status === 401) {
    // 	yield put(setAuthStatus('unauthorized'));
    // 	window.open(`/#/login`, '_self');
    // 	yield put(setToast(resp.message));
    // }
  } catch (err) {
    // yield put(setAuthStatus('unauthorized'));
    // window.open(`/#/login`, '_self');
    // yield put(setToast(err));
  }
}


function* globalSaga(): Generator<AllEffect<ForkEffect>> {
  yield all([takeLatest(GlobalActions.VALIDATE_USER_TOKEN, validateUserTokenSaga)]);
}

export default globalSaga;
