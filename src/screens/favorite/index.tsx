import React, { useCallback, } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { FlatList, View } from 'react-native';
import { ProductState, SetFavoriteToProductStore } from '../../store/ProductStore';
import CardComponent from '../../Component/UIContainer/Card';
import { useAppDispatch } from '../../store/hooks';
import { SetFavorite } from '../../store/FavoriteStore';
import { AddToCart } from '../../store/CartStore';



const Favorite = () => {
  const dispatch = useAppDispatch()
  const favorite = useSelector((state: RootState) => state.favorite);


  const onImagePress = (id: number) => { console.log("onImagePress: ", id); }

  const renderItem = useCallback(({ item }: { item: ProductState }) => (
    <CardComponent
      item={item}
      onFavorite={(value) => {
        dispatch(SetFavorite(value))
        dispatch(SetFavoriteToProductStore(value))
      }}
      addToCart={() => { dispatch(AddToCart(item)) }}
      onImagePress={onImagePress}

    />
  ), [])
  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingBottom: 20 }}>

      <FlatList
        data={favorite}
        renderItem={renderItem}
      />

    </View>
  )
}

export default Favorite
