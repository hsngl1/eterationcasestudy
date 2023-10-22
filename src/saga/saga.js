import { EterationAPIService } from "../api/eterationcastudy";
import { put, takeLatest } from "redux-saga/effects";

export function* GetProducts(favorite) {

  try {
    const { data } = yield EterationAPIService.GetProducts();


    const productData = data.map((data) => {
      return {
        ...data,
        isFavorite: favorite?.payload?.find?.(e => e.id === data.id)?.isFavorite ?? false,
        cartCount: data?.cartCount === undefined ? 0 : data?.cartCount,
      };
    });
    yield put({ type: "product/SetProducts", payload: productData })
  } catch (error) {
    console.log(`error when getting products in saga: ${error}`)
  }
}

export function* watchGetProducts() {
  yield takeLatest('GetProduct', GetProducts);
}