export type CardItemProps = {
  imageSrc?: string;
  name?: string;
  role?: string;
  cardImageSrc?: string;
  cardTitle?: string;
  cardContent?: string;
};

export interface TextSectionProps {
  greeting?: string;
  subGreeting?: string;
  showEmoji?: boolean;
  description?: string;
  boldText?: string;
  logoSrc?: string;
  logoAlt?: string;
  className?: string;
  emojiAnimationDuration?: number;
}