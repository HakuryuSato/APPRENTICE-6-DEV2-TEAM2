import React from 'react';
import { SignUp } from './TopPage/SignUp';

// これをGlobalStateに置き換えてください！
const temporaryTopPageLayoutMode = 'sign-up';

export const TopPage: React.FC = () => {
  return (
    <div>
      {/* SignUpと同じように他のコンポーネントもここで条件付きレンダリングします！ */}
      {temporaryTopPageLayoutMode === 'sign-up' && <SignUp />}
    </div>
  );
};
