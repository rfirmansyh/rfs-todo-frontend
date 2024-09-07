import { useEffect, useState } from 'react';
import { Progress } from '@/components/atoms/progress';
import { cn } from '@/libs/utils/style.util-lib';

type TLoaderAppProps = {
  isLoading: boolean;
}
const LoaderApp = ({
  isLoading
}: TLoaderAppProps) => {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  // effect: handle progress value
  useEffect(() => {
    let interval: any = null;

    interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (!isLoading) {
          return 100;
        }
        if (prevProgress < 100) {
          return prevProgress + 10; // Increase progress
        }
        
        clearInterval(interval);
        return 100;
      });
    }, 300);


    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLoading]);
  // effect: remove visible when progress === 100
  useEffect(() => {
    let timer: any = null;

    if (progress === 100) {
      timer = setTimeout(() => setVisible(false), 1000); // Delay to match the fade-out duration
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [progress]);

  if (!visible) {
    return null;
  }
  return (
    <div 
      className={cn(
        'fixed inset-0 flex h-screen w-screen items-center justify-center bg-white/95 z-50 transition-opacity duration-500',
        progress === 100 ? 'opacity-0' : 'opacity-100'
      )}
    >
      <div className="w-[350px] text-center">
        <h1 className="mb-3 font-bold">RFS-TODO</h1>
        <Progress value={progress} />
      </div>
    </div>
  );
};

export default LoaderApp;