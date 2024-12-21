import Cookies from 'universal-cookie';

const CREDENTIAL_COOKIES_KEY = 'dasboard-user';
// const CSAT_COOKEY_KEY = 'csat';

// set userData in cookies
// export function setUserData(obj, objName) {
// 	const cookies = new Cookies();
// 	let secure = false;
// 	if (process.env.NODE_ENV === 'production') {
// 		secure = true;
// 	}
// 	cookies.set(objName, obj, { secure, path: '/' });
// }

// get userData in cookies
export function getUserData(objName: string) {
  const cookies = new Cookies();
  const userDataObj = cookies.get(objName);

  return userDataObj;
}

// delete userData in cookies
export function delUserData(objName: string) {
  const cookies = new Cookies();
  cookies.remove(objName);
}

export function getUserCredential() {
  return getUserData(CREDENTIAL_COOKIES_KEY);
}

export function removeUserCredential() {
  delUserData(CREDENTIAL_COOKIES_KEY);
}

// export function checkIsLoggedIn() {
// 	const userCredential = getUserCredential();
// 	return (userCredential && userCredential.authToken) || false;
// }

// export function setOnboardingDataCollectionDone(obj, objName) {
// 	const cookies = new Cookies();
// 	let secure = false;
// 	if (process.env.NODE_ENV === 'production') {
// 		secure = true;
// 	}
// 	cookies.set(objName, obj, { secure, path: '/' });
// }

// export function getOnboardingDataCollectionDone(objName) {
// 	const cookies = new Cookies();
// 	const userDataObj = cookies.get(objName) ? cookies.get(objName) : '1';
// 	return userDataObj;
// }

// export function getUserPermission() {
// 	const userCredential = getUserCredential();
// 	return userCredential && userCredential.userPermission
// 		? userCredential.userPermission
// 		: {
// 				canExport: 1,
// 				canManageAllEvents: 1,
// 				canManagePayout: 1,
// 				canManageTeamMembers: 1,
// 				isEventAdmin: 1,
// 				isSuperAdmin: 1,
// 				selectedEventSections: [],
// 		  };
// }

// export function setPremiumBoothsOrganiserId(objName, obj) {
// 	const cookies = new Cookies();
// 	const boothData = cookies.get(objName);
// 	cookies.set(objName, boothData ? [...boothData, obj] : [obj]);
// }

// export function getPremiumBoothOrganiserId(obj) {
// 	const cookies = new Cookies();
// 	const boothData = cookies.get(obj);
// 	return boothData;
// }

// export function setSurveyCookie(obj) {
// 	const cookies = new Cookies();
// 	let secure = false;
// 	if (process.env.NODE_ENV === 'production') {
// 		secure = true;
// 	}
// 	cookies.set(CSAT_COOKEY_KEY, obj, { secure, path: '/' });
// }

// export function getSurveyCookie() {
// 	const cookies = new Cookies();
// 	const userDataObj = cookies.get(CSAT_COOKEY_KEY);

// 	return userDataObj;
// }

// export function removeSurveyCookie() {
// 	const cookies = new Cookies();
// 	cookies.remove(CSAT_COOKEY_KEY);
// }
