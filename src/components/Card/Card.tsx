import React from 'react';
import Text from "../Text";
import classNames from "classnames";
import styles from './Card.module.scss';
export type CardProps = {
  /** Дополнительный classname */
  className?: string;
  /** URL изображения */
  image: string;
  /** Слот над заголовком */
  captionSlot?: React.ReactNode;
  /** Заголовок карточки */
  title: React.ReactNode;
  /** Описание карточки */
  subtitle: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  contentSlot?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
  /** Слот для действия */
  actionSlot?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({className,image,captionSlot, title, subtitle,contentSlot,onClick,actionSlot, ...restProps}) => {
  return(
      <div className={classNames(styles.card__row, className)} onClick={onClick} {...restProps}>

          <div className={styles.card__image}>
              <img  src={image} alt="Изображение"/>
          </div>

          <div className={styles.card__body}>
              <div className={styles.card__text}>
                  {
                      captionSlot &&
                      <Text className={styles['card__text-caption']} view={'p-14'} weight={'medium'} color={'secondary'}> {captionSlot} </Text>
                  }
                  <Text className={styles['card__text-title']} view={'p-20'} weight={'medium'} color={'primary'} maxLines={2}>
                      {title}
                  </Text>
                  <Text className={styles['card__text-subtitle']} view={'p-16'} color={'secondary'} maxLines={3}>
                      {subtitle}
                  </Text>

              </div>


              {
                  (contentSlot || actionSlot) &&
                  <div className={styles.card__footer}>
                  {
                      contentSlot && <div className={styles.card__content}>
                      <Text tag={'div'} view={'p-18'} weight={'bold'}>
                          {contentSlot}
                      </Text>
                  </div>
                  }

                  {actionSlot && <div className={styles.card__action}>
                      {actionSlot}
                  </div>}

                  </div>
              }

        </div>

      </div>
  );
};

export default Card;
