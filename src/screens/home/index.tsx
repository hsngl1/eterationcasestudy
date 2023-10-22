import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { FlatList, View } from 'react-native';
import { ProductState, SetFavoriteToProductStore } from '../../store/ProductStore';
import CardComponent from '../../Component/UIContainer/Card';
import Search from '../../Component/UIContainer/Search';
import { ListItem } from '@rneui/themed';
import { useAppDispatch } from '../../store/hooks';
import { SetFavorite } from '../../store/FavoriteStore';
import { AddToCart } from '../../store/CartStore';



const Home = () => {
  const dispatch = useAppDispatch()
  const storeProduct = useSelector((state: RootState) => state.product);
  const fab = useSelector((state: RootState) => state.favorite);
  const storeRef = React.useRef(storeProduct)
  const [products, setProducts] = useState(storeProduct);
  const [search, setSearch] = useState("");

  const updateSearch = (search: string) => {
    setSearch(search);
  };



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
      <Search
        search={search}
        updateSearch={updateSearch}
      />

      <FlatList
        data={storeProduct}
        renderItem={renderItem}
      />

    </View>
  )
}

export default Home
