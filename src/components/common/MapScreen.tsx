import {KakaoMapView} from '@jiggag/react-native-kakao-maps';
import React from 'react';

const MapScreen = () => {
  return (
    <KakaoMapView
      markerImageName="customImageName" // 옵션1
      markerImageUrl="https://github.com/jiggag/react-native-kakao-maps/blob/develop/example/custom_image.png?raw=true" // 옵션2
      markerList={[
        {
          lat: 37.59523,
          lng: 127.086,
          markerName: 'marker',
        },
        {
          lat: 37.59523,
          lng: 127.08705,
          markerName: 'marker2',
        },
      ]}
      width={300}
      height={500}
      centerPoint={{
        lat: 37.59523,
        lng: 127.086,
      }}
    />
  );
};

export default MapScreen;
