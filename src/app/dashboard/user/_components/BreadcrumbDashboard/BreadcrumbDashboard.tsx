'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator 
} from '@/components/atoms/breadcrumb';
import { getPathsWithoutParams } from '@/libs/utils/app.util-lib';

const BreadcrumbDashboard = () => {
  const pathName = usePathname();
  const params = useParams();
  const pathNames = getPathsWithoutParams(pathName, params).split('/').filter((path) => path);

  return (
    <Breadcrumb className="mb-8">
      <BreadcrumbList>
        {pathNames.map((route, idx) => {
          const href = `/${pathNames.slice(0, idx + 1).join('/')}`;
          const isLast = pathNames.length === idx + 1;

          return (
            <Fragment key={idx}>
              <BreadcrumbItem>
                {!isLast 
                  ? (
                    <BreadcrumbLink asChild>
                      <Link href={href}>{route}</Link>
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbLink asChild>
                      <BreadcrumbPage>{route}</BreadcrumbPage>
                    </BreadcrumbLink>
                  )
                }
                
              </BreadcrumbItem>
              {!isLast ? <BreadcrumbSeparator /> : null}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbDashboard;