import React from 'react'
import { ProductState } from '../../store/ProductStore';
import { Card } from '@rneui/themed';
import { Text, TouchableOpacity, View } from 'react-native';

type PropType = {
  item: ProductState,
  addProduct: () => void,
  removeProduct: () => void
}
function CardComponent(props: PropType) {
  const { item, removeProduct, addProduct } = props;
  return (
    <Card>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View>
          <Text style={{ color: "black", fontSize: 16, fontWeight: "500" }}>{item.brand} {item.model}</Text>
          <Text style={{ color: 'blue', fontWeight: "500" }}>{item.price}</Text>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "center", }}>

          <TouchableOpacity
            style={{
              backgroundColor: "rgba(0,0,0,0.2)",
              paddingHorizontal: 20,
              marginVertical: 1,
              justifyContent: "center",
              alignItems: "center",
              borderTopLeftRadius: 4,
              borderBottomLeftRadius: 4
            }}
            onPress={() => typeof removeProduct === 'function' ? removeProduct() : null}
          >
            <Text >-</Text>
          </TouchableOpacity>
          <Text
            style={{
              color: "white",
              backgroundColor: "blue",
              paddingVertical: 10,
              paddingHorizontal: 15
            }}
          >{item.cartCount}</Text>
          <TouchableOpacity
            style={{
              backgroundColor: "rgba(0,0,0,0.2)",
              paddingHorizontal: 20,
              marginVertical: 1,
              justifyContent: "center",
              alignItems: "center",
              borderTopRightRadius: 4,
              borderBottomRightRadius: 4
            }}
            onPress={() => typeof addProduct === 'function' ? addProduct() : null}
          >
            <Text>+</Text>
          </TouchableOpacity>
        </View>
      </View>

    </Card>
  )
}

export default CardComponent;