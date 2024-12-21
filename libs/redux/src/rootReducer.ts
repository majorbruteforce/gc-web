// import toastReducer from '@dashboard/base/containers/Toast/reducer';
import globalReducer from './global/global.reducer';
// import hvmReducer from '@hvm/containers/hvm/redux/hvm.reducer';
// import draftReducer from '@hvm/containers/draft/redux/draft.reducer';

const rootReducer = {
    // reducerLoader: reducerLoaderSlice.reducer,
    global: globalReducer,
    // toast: toastReducer,
    // hvm: hvmReducer,
    // draft: draftReducer,
};

export default rootReducer;
