import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { FlatList, Modal, Text, View } from 'react-native';
import { ProductState, SetFavoriteToProductStore } from '../../store/ProductStore';
import CardComponent from '../../Component/UIContainer/Card';
import Search from '../../Component/UIContainer/Search';
import { useAppDispatch } from '../../store/hooks';
import { SetFavorite } from '../../store/FavoriteStore';
import { AddToCart } from '../../store/CartStore';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import Close from 'react-native-vector-icons/AntDesign';
import { CheckBox } from '@rneui/themed';

type KEY = { [key: string]: boolean }



const Home = () => {
  const dispatch = useAppDispatch();
  const nav = useNavigation();
  const storeProduct = useSelector((state: RootState) => state.product);
  const [products, setProducts] = useState(storeProduct);
  const [search, setSearch] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [checkedBrand, setCheckedBrand] = useState<KEY | null>(null);
  const [checkedModel, setCheckedModel] = useState<KEY | null>(null);
  const [radioSort, setRadioSort] = useState(['Old to new', 'New to old', 'Price high to low', 'Price low to high'])
  const [radioIndex, setRadioIndex] = useState<number | null>(null)
  const updateSearch = (search: string) => {
    setSearch(search);
  };


  useEffect(() => {
    if (search.length > 0) {
      const queriedProduct = ([...storeProduct].filter(
        (product) =>
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.name.toUpperCase().includes(search.toUpperCase()) ||
          product.brand.toLowerCase().includes(search.toLowerCase()) ||
          product.brand.toUpperCase().includes(search.toUpperCase()))
        || [])
      setProducts(queriedProduct)
    } else {
      setProducts([])
    }
  }, [search])

  useEffect(() => {
    if (checkedModel !== null) {
      const elements = Object.entries(checkedModel)
      const element = elements.filter(e => e[1] === true)
      if (element.length > 0) {
        for (const [key, value] of element) {
          console.log(key);
          const queriedProduct = ([...storeProduct].filter(
            (product) =>
              product.model.toLowerCase().includes(key.toLowerCase()) ||
              product.model.toUpperCase().includes(key.toUpperCase()))
            || [])
          setProducts(queriedProduct)
        }
      } else {
        setProducts([])
      }

    }

  }, [checkedModel])

  useEffect(() => {
    if (radioIndex !== null) {
      const value = radioSort[radioIndex]

      let sortedProd: ProductState[] = []

      if (value === 'Old to new') {
        sortedProd = ([...storeProduct]).sort((prev, next) => (prev.createdAt < next.createdAt ? -1 : 1))
      } else if (value === 'New to old') {
        sortedProd = ([...storeProduct]).sort((prev, next) => (prev.createdAt < next.createdAt ? 1 : -1))
      } else if (value === 'Price high to low') {
        sortedProd = ([...storeProduct]).sort((prev, next) => (prev.price < next.price ? 1 : -1));
      } else if (value === 'Price low to high') {
        sortedProd = ([...storeProduct]).sort((prev, next) => (prev.price < next.price ? -1 : 1));
      }
      setProducts(sortedProd)
    } else {
      setProducts([])
    }

  }, [radioIndex])

  useEffect(() => {
    if (checkedBrand !== null) {
      const elements = Object.entries(checkedBrand)
      const element = elements.filter(e => e[1] === true)
      if (element.length > 0) {
        for (const [key, value] of element) {
          console.log(key);
          const queriedProduct = ([...storeProduct].filter(
            (product) =>
              product.brand.toLowerCase().includes(key.toLowerCase()) ||
              product.brand.toUpperCase().includes(key.toUpperCase()))
            || [])
          setProducts(queriedProduct)
        }
      } else {
        setProducts([])
      }

    }

  }, [checkedBrand])

  const renderItem = useCallback(({ item }: { item: ProductState }) => (
    <CardComponent
      item={item}
      onFavorite={(value) => {
        dispatch(SetFavorite(value))
        dispatch(SetFavoriteToProductStore(value))
      }}
      addToCart={() => { dispatch(AddToCart(item)) }}
      onImagePress={() => {
        nav.navigate("DetailScreen", { product: item })
      }}

    />
  ), []);
  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingBottom: 20 }}>
      <Search
        search={search}
        updateSearch={updateSearch}
      />

      <View style={{ flexDirection: "row", paddingHorizontal: 15, justifyContent: "space-between" }}>
        <Text style={{
          color: 'black',
          fontSize: 18,
          fontWeight: "400",

        }}>
          Filters:
        </Text>
        <TouchableOpacity
          style={{
            paddingVertical: 5,
            paddingHorizontal: 15,
            backgroundColor: 'grey'
          }}
          onPress={() => { setIsModalVisible(true) }}
        >
          <Text
            style={{
              color: "white"
            }}
          >
            Select Filter
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={products.length > 0 ? products : storeProduct}
        renderItem={renderItem}
      />
      <Modal
        visible={isModalVisible}
        animationType='none'
        onRequestClose={() => { setIsModalVisible(false) }}
      >
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: "center", padding: 20 }}>
            <TouchableOpacity
              onPress={() => setIsModalVisible(false)}
            >
              <Close name={'close'} size={36} color={'black'} />
            </TouchableOpacity>
            <Text
              style={{
                textAlign: "center",
                flex: 1,
                fontSize: 18,
                color: 'black'
              }}
            >
              Filter
            </Text>
          </View>
          <View>
          </View>
          <View style={{ height: 1, backgroundColor: 'rgba(0,0,0,0.2)', width: "100%" }} />
          <View>
            <Text style={{ paddingLeft: 10, marginVertical: 10 }}>Sort By</Text>
            {radioSort.map((value, index) => (
              <>
                <CheckBox
                  key={index + index + "abc"}
                  checked={radioIndex === index}
                  onPress={() => {
                    if (radioIndex === index) {
                      setRadioIndex(null)
                    } else {
                      setRadioIndex(index)
                    }


                  }}
                  iconType="material-community"
                  checkedIcon="radiobox-marked"
                  uncheckedIcon="radiobox-blank"
                  title={value}
                />
              </>
            ))}
          </View>
          <View style={{ height: 1, backgroundColor: 'rgba(0,0,0,1)', marginLeft: 20, width: "90%" }} />
          <View style={{ flexBasis: 150, marginHorizontal: 20, marginVertical: 20 }}>
            <Text style={{ paddingLeft: 10 }}>Brand</Text>
            <Search
              search={search}
              updateSearch={updateSearch}
            />
            <FlatList
              data={[...new Set([...storeProduct].map((e) => e.brand))]}

              renderItem={({ item }) => (
                <View style={{ flexDirection: 'row' }}>
                  <CheckBox
                    center
                    title={item}
                    checked={checkedBrand?.[item] || false}
                    onPress={() => {
                      setCheckedBrand((prev) => ({
                        ...prev,
                        [item]: !checkedBrand?.[item] || false
                      }))
                    }}
                  />
                </View>
              )}
              keyExtractor={(key, index) => (key + index)}
            />
          </View>
          <View style={{ height: 1, backgroundColor: 'rgba(0,0,0,1)', marginLeft: 20, width: "90%" }} />
          <View style={{ flexBasis: 200, marginHorizontal: 20, marginTop: 15 }}>
            <Text style={{ paddingLeft: 10 }}>Model</Text>
            <Search
              search={search}
              updateSearch={updateSearch}
            />
            <FlatList
              data={[...new Set([...storeProduct].map((e) => e.model))]}
              renderItem={({ item }) => (
                <View style={{ flexDirection: 'row' }}>
                  <CheckBox
                    center
                    title={item}
                    checked={checkedModel?.[item] || false}
                    onPress={() => {
                      setCheckedModel((prev) => ({
                        ...prev,
                        [item]: !checkedModel?.[item] || false
                      }))
                    }}
                  />
                </View>
              )}
              keyExtractor={(key, index) => (key + index)}
            />
          </View>


        </View>
        <TouchableOpacity style={{
          backgroundColor: 'blue',
          marginVertical: 20,
          marginHorizontal: 20,
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 15,
          borderRadius: 4
        }}
          onPress={() => {
            setIsModalVisible(false);
          }}
        >
          <Text style={{ color: 'white', fontSize: 20, fontWeight: "600" }}>Primary</Text>
        </TouchableOpacity>
      </Modal>

    </View>
  )
}

export default Home
