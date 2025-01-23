import { Button } from '../ui/button';

export function Submit({ children, ...others }: buttonProps) {
  return (
    <Button type="submit" {...others}>
      {children}
    </Button>
  );
}
