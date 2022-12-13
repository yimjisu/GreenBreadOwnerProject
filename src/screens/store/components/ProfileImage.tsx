import React, { useMemo } from 'react';
import { Image, ImageStyle, StyleSheet } from 'react-native';

const DEFAULT_PROFILE_IMAGE = require('../../../assets/images/default-profile.png');

type Props = {
  size?: number;
  uri?: string;
  style?: ImageStyle;
};

const ProfileImage: React.FC<Props> = ({size = 60, uri, style}) => {
  const source = useMemo(() => {
    console.log('typeof uri', typeof uri);

    if (uri) {
      if (typeof uri === 'number') {
        return {uri: Image.resolveAssetSource(uri).uri};
      } else {
        return {uri};
      }
    }

    return DEFAULT_PROFILE_IMAGE;
  }, [uri]);

  return (
    <Image
      source={source}
      style={[
        styles.profileImage,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  profileImage: {
    borderColor: '#ccc',
    borderWidth: 1,
  },
});

export default ProfileImage;
