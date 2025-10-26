import logoImage from '@/assets/sequestro-logo.png';

type IconProps = React.HTMLAttributes<HTMLImageElement>

export const Icons = {
  logo: (props: IconProps) => (
    <img src={logoImage} alt="Sequestro Logo" {...props} />
  ),
}
