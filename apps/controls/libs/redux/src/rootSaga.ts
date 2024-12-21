import globalSaga from './global/global.saga';

function* rootSaga() {
  yield globalSaga();
}

export default rootSaga;
