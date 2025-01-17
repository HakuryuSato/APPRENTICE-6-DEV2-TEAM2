import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import styles from './3DButton.module.css';

interface ThreeDButtonProps {
  text: string; // ボタンのテキスト
  handleEnter: () => void; // クリック時に発火する関数
  initialImage?: string; // 初期画像のURL
  onHoverImage?: string; // ホバー時の画像のURL
}

export default function ThreeDButton({
  text,
  handleEnter,
  initialImage,
  onHoverImage,
}: ThreeDButtonProps) {
  const buttonStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };
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
            ...buttonStyle,
            backgroundColor: 'transparent',
            backgroundImage: initialImage ? `url(${initialImage})` : undefined,
          }}
        >
          {text}
          <FontAwesomeIcon
            icon={faAngleRight}
            className={styles['fa-position-right']}
          />
        </span>
        <span
          className={`${styles['btn-3d-flip-box-face']} ${styles['btn-3d-flip-box-face--back2']}`}
          style={{
            ...buttonStyle,
            backgroundColor: 'transparent',
            backgroundImage: onHoverImage ? `url(${onHoverImage})` : undefined,
          }}
        >
          {text}
          <FontAwesomeIcon
            icon={faAngleRight}
            className={styles['fa-position-right']}
          />
        </span>
      </span>
    </a>
  );
}
