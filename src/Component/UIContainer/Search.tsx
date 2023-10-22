
import React from 'react'
import { Button, SearchBar } from '@rneui/themed';
type PropTye = {
  search: string,
  updateSearch: (value: string) => void
}

export default function Search(prop: PropTye) {
  const { search, updateSearch } = prop
  return (
    <SearchBar
      containerStyle={{ backgroundColor: "white", borderColor: 'white' }}
      inputContainerStyle={{ backgroundColor: '#FAFBFB' }}
      inputStyle={{ color: 'black' }}
      leftIconContainerStyle={{}}
      rightIconContainerStyle={{}}
      loadingProps={{}}
      onChangeText={newVal => updateSearch(newVal)}
      placeholder="Search"
      placeholderTextColor="#616b8a"
      cancelButtonTitle="Cancel"
      cancelButtonProps={{}}
      value={search}
    />
  )
}