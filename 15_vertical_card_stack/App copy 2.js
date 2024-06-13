import React from 'react';
import { Text, Dimensions } from 'react-native';
import VerticalCardsDeck from 'react-native-vertical-cards-deck';

const App = () => {
  const dataList = [1, 2, 3, 4, 5, 6];

  const renderContent = (item, index) => (
    <Text>{index + 1}</Text>
  );

  return (
    <VerticalCardsDeck
      dataList={dataList}
      cardColor='#59d843'
      renderContent={renderContent}
      cardDistance={134}
      cardHeight={255}
      cardWidth={357}
      containerHeight={Dimensions.get('screen').height / 1.4}
    />
  );
};

export default App;