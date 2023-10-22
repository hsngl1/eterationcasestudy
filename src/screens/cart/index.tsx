import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import CardComponent from '../../Component/UIContainer/Cart'
import { ProductState } from '../../store/ProductStore'
import { useAppSelector } from '../../store/hooks'
import { FlatList } from 'react-native'
import { useDispatch } from 'react-redux'
import { AddToCart, RemoveCartItem } from '../../store/CartStore'

const Cart = () => {
  const dispatch = useDispatch();
  const cartProducts = useAppSelector((state) => state.cart)
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={cartProducts.products}
        renderItem={
          ({ item }) => (
            <CardComponent
              item={item}
              addProduct={() => {
                dispatch(AddToCart(item))
              }}
              removeProduct={() => {
                dispatch(RemoveCartItem(item))
              }}
            />
          )
        }
      />
      <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10, marginBottom: 10 }}>
        <View>
          <Text style={{ color: 'blue', fontSize: 14, fontWeight: "400" }}>Total: </Text>
          <Text style={{ color: 'black', fontSize: 16, fontWeight: "600" }}>{cartProducts.totalPrice} ₺</Text>
        </View>
        <TouchableOpacity style={{
          backgroundColor: "blue",
          paddingHorizontal: 30,
          paddingVertical: 15,
          borderRadius: 4
        }}>
          <Text style={{ color: 'white', fontSize: 16, fontWeight: "500" }}>Complete</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Cart