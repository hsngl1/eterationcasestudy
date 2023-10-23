import React, { useCallback, useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native';
import { Card, Icon } from '@rneui/themed';
import { useDispatch } from 'react-redux';
import { AddToCart } from '../../store/CartStore';



const Detail = ({ route }) => {
  const { product } = route?.params;
  const dispatch = useDispatch();
  const [incomingProduct, setIncomingProduct] = useState(product);

  return (
    <View style={{ backgroundColor: "white", flex: 1, }}>
      <View style={{ flex: 1, backgroundColor: 'white', paddingBottom: 20, paddingHorizontal: 10, paddingTop: 16 }}>
        <View>
          <Card.Image
            style={{ padding: 0, marginBottom: 16 }}
            source={{ uri: incomingProduct?.image }}
          />
          <Icon
            name={'star'}
            color={incomingProduct?.isFavorite ? '#FFB800' : 'gray'}
            style={{ position: 'absolute', right: 4, top: 6 }}
          />
        </View>
        <View>
          <Text
            style={{
              fontWeight: "700",
              fontSize: 30,
              color: "black",
              marginBottom: 10
            }}>
            {incomingProduct?.name} {incomingProduct?.brand} {incomingProduct?.model}
          </Text>
        </View>
        <View>
          <Text style={{
            fontWeight: "400",
            fontSize: 14,
            color: "black",
            marginBottom: 10,
            textAlign: "left"
          }}>
            {incomingProduct?.description}
          </Text>
        </View>
      </View>
      <View style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: "white"
      }}>
        <View>
          <Text style={{ color: 'blue', fontSize: 14, fontWeight: "400" }}>Total: </Text>
          <Text style={{ color: 'black', fontSize: 16, fontWeight: "600" }}>{incomingProduct?.price} ₺</Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: "blue",
            paddingHorizontal: 30,
            paddingVertical: 15,
            borderRadius: 4
          }}
          onPress={() => {
            dispatch(AddToCart(incomingProduct))
          }}
        >
          <Text style={{ color: 'white', fontSize: 16, fontWeight: "500" }}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Detail
