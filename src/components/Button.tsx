import { useMemo } from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  // Yes, bgColor is a string, but in our code, only specific strings are
  // useful. For the benefit of whoever is using this component, we can
  // document the possible values of bgColor.
  // bgColor?: string;

  bgColor?: 'red' | 'green' | 'blue';
};

/**
 * @example
 * ```tsx
 * import Button from './Button';
 *
 * const MyComponent = () => {
 *  return (
 *   <Button bgColor='blue'>Click me!</Button>
 * );
 * ```
 */
const Button = ({ bgColor, children, ...props }: ButtonProps) => {
  /**
   * `useMemo` is a hook that lets us memoize a value. This means that the
   * value will only be calculated when the dependencies change. In this case,
   * the value will only be calculated when `bgColor` changes. It could be
   * considered overkill to use `useMemo` here, but it is a good example of how
   * to use it.
   */
  const bgColorHex = useMemo(() => {
    switch (bgColor) {
      case 'red':
        return '#ff0000';
      case 'green':
        return '#00ff00';
      case 'blue':
        return '#0000ff';
      default:
        return '#fff';
    }
  }, [bgColor]);

  return (
    <button
      // We seldom want to use inline styles, but this is just an example.
      style={{
        backgroundColor: bgColorHex,
      }}
      type="button"
      /**
       * Props spreading. This is the equivalent of doing:
       * className={props.className}
       * onClick={props.onClick}
       * etc. for all the keys and values in the props object.
       */
      {...props}
      // Order matters, so we can override the className prop if we want.
      // There are better className utilities out there, but this is just an
      // example. Also, this doesn't matter much when using Emotion.
      className={[props.className, 'rounded py-2 px-4']
        .filter(Boolean)
        .join(' ')}
    >
      {/* It isn't strictly necessary to pull `children` from props, but
       * it just feels better in this specific case because we are spreading
       * the props object above, which would already include `children`. So this
       * feels like a more explicit way of saying "I want to use the children
       * prop here".
       */}
      {children}
    </button>
  );
};

/**
 * Default export syntax. Note: We are only allowed one default export per file.
 * By contrast, we can have as many named exports as we want.
 */
export default Button;
