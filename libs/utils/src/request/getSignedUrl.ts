// import { TFileCallBack, TS3UploadOption, TSignInReq, TUrlItem, updatedUploadS3 } from '@dashboard/base/utils/lsHelper';

// export const updatedSignInRequest = async (payloadData?: TSignInReq): Promise<TUrlItem[]> => {
//   let returnData: TUrlItem[] = [];
//   const payload = {
//     payload: {
//       data: { ...payloadData },
//     },
//   };
//   // const resp = await ApiAxiosCommunity.post('/get-signed-url', {
//   //   ...payload,
//   // });
//   // const { status, success } = resp.data;
//   // if (status) returnData = success?.data?.urlLists || [];
//   return returnData;
// };

// export const uploadS3Promise = (valueFile: File, uploadOption: TS3UploadOption) => {
//   return new Promise<void>((resolve, reject) => {
//     updatedUploadS3(valueFile, uploadOption, (data: string | TFileCallBack) => {
//       if (!data || data === 'FAIL') {
//         // failed
//         reject();
//       } else {
//         // success
//         resolve();
//       }
//     });
//   });
// };
