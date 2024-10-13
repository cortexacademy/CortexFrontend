import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { useTheme } from '@/hooks/useTheme';

interface SearchableListProps<T> {
  items: T[];
  searchKey: keyof T;
  renderItem: (item: T) => JSX.Element;
  noItemsText?: string;
}

export const SearchableList = <T extends { [key: string]: any }>({
  items,
  searchKey,
  renderItem,
  noItemsText = "No items found.",
}: SearchableListProps<T>) => {
  const { appTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredItems = Array.isArray(items) ? items.filter((item) =>
    item[searchKey].toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  const handleSearchInputChange = (text?: string) => setSearchQuery(text || '');

  return (
    <View className="flex-1" style={{ backgroundColor: appTheme.colors.grey, height: '100%' }}>
      <SearchBar
        placeholder="Search..."
        value={searchQuery}
        onChangeText={handleSearchInputChange}
        containerStyle={{
          backgroundColor: appTheme.colors.primary,
        }}
        inputContainerStyle={{
          backgroundColor: appTheme.colors.quaternary,
        }}
        inputStyle={{
          color: appTheme.colors.primary,
        }}
        placeholderTextColor={appTheme.colors.placeholder}
        searchIcon={{
          name: 'search',
          type: 'ionicon',
          size: 20,
          color: appTheme.colors.inputicon,
        }}
        clearIcon={
          {
            name: 'close-circle',
            type: 'ionicon',
            size: 20,
            color: appTheme.colors.inputicon,
            onPress: () => setSearchQuery(''),
          }
        }
        onBlur={() => { }}
        onFocus={() => { }}
        platform="default"
        loadingProps={{
          size: 'small',
          color: appTheme.colors.textSecondary,
        }}
        showLoading={false} onClear={() => { }} onCancel={() => { }} lightTheme={false} round={false} cancelButtonTitle={''} cancelButtonProps={{
          buttonStyle: { backgroundColor: appTheme.colors.secondaryBackground },
          buttonTextStyle: { color: appTheme.colors.text },
        }}
        showCancel={false}
      />

      <ScrollView>
        <View
          className="flex-1 pt-2 pb-2 pl-8 pr-8 mt-4"
          style={{ backgroundColor: appTheme.colors.grey }}
        >
          {filteredItems.length > 0 ? (
            filteredItems.map(renderItem)
          ) : (
            <View className="flex-1 justify-center items-center">
              <Text style={{ color: appTheme.colors.primary }}>{noItemsText}</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};