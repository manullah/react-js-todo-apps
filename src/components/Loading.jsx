import { Loader2 } from 'lucide-react';
import { cn } from '../libs/tailwindcss/utils';
import React from 'react';

const Loading = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div className={cn('flex justify-center items-center', className)} ref={ref} {...props}>
      <Loader2 className="mr-2 animate-spin" size={16} /> Loading...
    </div>
  );
});

Loading.displayName = 'Loading';

export { Loading };
