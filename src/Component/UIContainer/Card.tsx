import React from 'react'
import { ProductState } from '../../store/ProductStore';
import { Text, Card, Button, Icon } from '@rneui/themed';
import { TouchableOpacity, View } from 'react-native';
import { useAppDispatch } from '../../store/hooks';
import { SetFavorite } from '../../store/FavoriteStore';
type PropType = {
  item: ProductState,
  onFavorite: (item: ProductState) => void,
  addToCart: (value: number) => void,
  onImagePress: (value: number) => void
}
function CardComponent(props: PropType) {
  const { item, onFavorite, addToCart, onImagePress } = props;
  return (
    <Card>
      <View>
        <Card.Image
          style={{ padding: 0 }}
          source={{ uri: item.image }}
          onPress={() => { onImagePress(item.id) }}
        />
        <TouchableOpacity
          style={{ position: 'absolute', right: 4, top: 6 }}
          onPress={() => {
            onFavorite(item)
          }}
        >
          <Icon name={'star'} color={item.isFavorite ? '#FFB800' : 'gray'} />
        </TouchableOpacity>
      </View>
      <Text style={{ marginBottom: 10 }}>
        {item.price} ₺
      </Text>
      <Text style={{ marginBottom: 10 }}>
        {item.name}
      </Text>
      <Button
        buttonStyle={{
          borderRadius: 4,
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 0,
        }}
        onPress={() => { addToCart(item.id) }}
        title="Add to Cart"
      />
    </Card>
  )
}

export default CardComponent;