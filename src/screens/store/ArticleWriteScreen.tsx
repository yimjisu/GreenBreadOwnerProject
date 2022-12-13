import React, { useState } from 'react';

import ScreenContainer from '../../components/layout/ScreenContainer';
import CustomTextInput from '../auth/components/CustomTextInput';

const ArticleWriteScreen = () => {
  const [content, setContent] = useState('');

  return (
    <ScreenContainer>
      <CustomTextInput />
    </ScreenContainer>
  );
};

export default ArticleWriteScreen;
