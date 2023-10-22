/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { ProductState } from '../store/ProductStore';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../store/hooks';
import { Provider } from 'react-redux';
import { Colors, LoaderScreen } from 'react-native-ui-lib';

export interface ECommerceCtxModel {
  isReadyToLaunch: boolean;
  productData: ProductState[];
}

const AppData: ECommerceCtxModel = {
  isReadyToLaunch: false,
  productData: new Array<ProductState>()
}

const ECommerceCtx = React.createContext<ECommerceCtxModel>(AppData);


export const AppExecutor = ({ children }: { children: React.ReactNode }) => {
  const productData = useAppSelector((state) => state.product);
  const favorite = useAppSelector((state) => state.favorite);
  const [isDataLoaded, setIsDataLoaded] = useState(AppData.isReadyToLaunch);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'GetProduct', payload: favorite });
    setIsDataLoaded(true);
  }, [isDataLoaded]);

  AppData.isReadyToLaunch = isDataLoaded;
  AppData.productData = productData;
  return (
    <ECommerceCtx.Provider value={AppData}>
      {
        isDataLoaded ?
          (children)
          :
          (
            <LoaderScreen message={'Loading'} color={Colors.blue1} size="large" />
          )
      }
    </ECommerceCtx.Provider>
  );
};

export const useAppData = () => React.useContext(ECommerceCtx);
