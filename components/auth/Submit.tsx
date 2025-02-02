import { useFormStatus } from 'react-dom';
import { Button } from '../ui/button';

export function Submit({ children, ...others }: buttonProps) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} {...others}>
      {children}
    </Button>
  );
}
