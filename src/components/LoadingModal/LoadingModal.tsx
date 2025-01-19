import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import styles from './LoadingModal.module.css';
import { GeneratedImage } from '../game/GeneratedImage';

type LoadingModalProps = {
  modalText: string;
  isOpen: boolean;
};

export const LoadingModal: React.FC<LoadingModalProps> = ({
  modalText,
  isOpen,
}) => {
  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{modalText}...</DialogTitle>
        </DialogHeader>
        {/* 画像とか入れるならここ */}
        <div className="flex justify-center items-center space-y-2">
          {/* ローディングインジケーター */}

          <div className={`${styles.loader}`}></div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
