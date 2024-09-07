import { useMemo } from 'react';
import Image from 'next/image';

const TodoBanner = ({
  banner_url
}: { banner_url?: string }) => {
  const renderImg = useMemo(() => {
    if (banner_url) {
      return <Image
        fill
        src={banner_url}
        alt="Todo Banner"
        style={{ objectFit: 'contain' }}
      />;
    }
  
    return <Image
      alt="Product image"
      className="aspect-square w-full rounded-md object-cover"
      height="180"
      src="/assets/illustrations/img-placeholder.svg"
      width="180"
    />;
  }, [banner_url]);

  return (
    <div className="relative flex h-[144px] items-center justify-center overflow-hidden rounded-sm bg-primary/10 object-cover text-primary/50">
      {renderImg}
    </div>
  );
};

export default TodoBanner;