import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import styles from './3DButton.module.css';

interface ThreeDButtonProps {
  firstText: string; // 1回目のテキスト
  secondText: string; // 2回目以降のテキスト
  handleEnter: () => void; // 2回目のタップ時に発火する関数
}

export default function ThreeDButton({
  firstText,
  secondText,
  handleEnter,
}: ThreeDButtonProps) {
  const [clickCount, setClickCount] = useState(0);

  const handleFirstClick = () => {
    setClickCount(1); // クリック回数を更新
  };

  const handleSecondClick = () => {
    handleEnter(); // props から受け取った関数を実行
    setClickCount((prev) => prev + 1); // クリック回数を更新
  };

  return (
    <a
      href="#"
      className={`${styles.btn} ${styles['btn-3d-flip']} ${styles['btn-3d-flip2']}`}
      onClick={clickCount === 0 ? handleFirstClick : handleSecondClick}
    >
      <span className={styles['btn-3d-flip-box2']}>
        <span
          className={`${styles['btn-3d-flip-box-face']} ${styles['btn-3d-flip-box-face--front2']}`}
        >
          {firstText}
          <FontAwesomeIcon
            icon={faAngleRight}
            className={styles['fa-position-right']}
          />
        </span>
        <span
          className={`${styles['btn-3d-flip-box-face']} ${styles['btn-3d-flip-box-face--back2']}`}
        >
          {secondText}
          <FontAwesomeIcon
            icon={faAngleRight}
            className={styles['fa-position-right']}
          />
        </span>
      </span>
    </a>
  );
}
