import { takeLatest, fork, retry, put } from "redux-saga/effects";
import { clientListFailure, clientListSuccess } from "redux/actions/Clients";
import { CLIENT_LIST_REQUEST } from "redux/constants/Clietns";

const baseUrl = "https://jsonplaceholder.typicode.com";

const getData = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(res.statusText);
  console.log(1);
  return await res.json();
};

function* handleGetClients() {
  try {
    const retryCount = 3;
    const retryDelay = 2000;
    const data = yield retry(
      retryCount,
      retryDelay,
      getData,
      `${baseUrl}/users`
    );
    yield put(clientListSuccess(data));
  } catch (e) {
    yield put(clientListFailure(e));
  }
}

function* watchClients() {
  yield takeLatest(CLIENT_LIST_REQUEST, handleGetClients);
}

export default function* rootSaga() {
  yield fork(watchClients);
}
