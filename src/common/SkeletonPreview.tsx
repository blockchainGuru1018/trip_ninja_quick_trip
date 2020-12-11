
import React from 'react';
import { Skeleton } from "@material-ui/lab";

interface skeletonPreviewProps {
  segmentSelect: boolean
  orderByPnr: boolean
}

export default function SkeletonPreview(props: skeletonPreviewProps) {

  const rectSkeleton = <Skeleton animation="wave" variant="rect" width={'80%'} height={10} style={{ marginBottom: 6 }} />;

  return (
    <div className='row segment-container'>
      <div className='row col-md-12'>
        {!props.segmentSelect && !props.orderByPnr
          && <div className='col-md-1 skeleton-mini-circle-container'>
            <Skeleton animation="wave" variant="circle" width={20} height={20} />
          </div>
        }
        <div className={`row segment ${props.segmentSelect || props.orderByPnr ? 'col-md-12' : 'col-md-11'}`}>
          <div className='col-sm-2'>
            <Skeleton animation="wave" variant="circle" width={60} height={60} />
          </div>
          <div className='col-sm-2'>
            {rectSkeleton}
            {rectSkeleton}
          </div>
          <div className='col-sm-2'>
            {rectSkeleton}
            {rectSkeleton}
          </div>
          <div className='col-sm-2'>
            {rectSkeleton}
            {rectSkeleton}
          </div>
          <div className='col-sm-2'>
            {rectSkeleton}
            {rectSkeleton}
          </div>
          <div className='col-sm-2'>
            {rectSkeleton}
            {rectSkeleton}
          </div>
        </div>
      </div>
    </div>
  );
}