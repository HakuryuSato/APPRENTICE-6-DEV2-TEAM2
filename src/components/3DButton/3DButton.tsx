import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import styles from './3DButton.module.css';

interface ThreeDButtonProps {
  firstText: string; // 1回目のテキスト
  secondText: string; // 2回目以降のテキスト
  handleEnter: () => void; // 2回目のタップ時に発火する関数
  style?: React.CSSProperties; // スタイルプロパティ
  initialImage?: string; // 初期画像のURL
  afterClickImage?: string; // クリック後の画像のURL
}

export default function ThreeDButton({
  firstText,
  secondText,
  handleEnter,
  style,
  initialImage,
  afterClickImage,
}: ThreeDButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href="#"
      className={`${styles.btn} ${styles['btn-3d-flip']} ${styles['btn-3d-flip2']}`}
      onClick={handleEnter}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className={styles['btn-3d-flip-box2']}>
        <span
          className={`${styles['btn-3d-flip-box-face']} ${styles['btn-3d-flip-box-face--front2']}`}
          style={{
            ...style,
            backgroundColor: 'transparent',
            backgroundImage: initialImage ? `url(${initialImage})` : style?.backgroundImage,
          }}
        >
          {firstText}
          <FontAwesomeIcon
            icon={faAngleRight}
            className={styles['fa-position-right']}
          />
        </span>
        <span
          className={`${styles['btn-3d-flip-box-face']} ${styles['btn-3d-flip-box-face--back2']}`}
          style={{
            ...style,
            backgroundColor: 'transparent',
            backgroundImage: afterClickImage ? `url(${afterClickImage})` : style?.backgroundImage,
          }}
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
