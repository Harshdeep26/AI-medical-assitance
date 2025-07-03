"use client"
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useState } from 'react'
import AddNewSessionDialog from './AddNewSessionDialog';

function HistoryList() {
  const [historyList, setHistoryList] = useState([]);
  return (
    <div className='mt-10'>
      {historyList.length == 0 ?
        <div className='flex items-center flex-col justify-center p-7 border border-dashed rounded-2xl border-2'>
          <Image src={'/thumbnail.png'} alt='hello' width={150} height={150} />
          <h2 className='font-bond text-xl mt-5'>No Recent Consultation</h2>
          <p>Its looks like you haven't consulted with any doctor yet.</p>
          <AddNewSessionDialog/>
        </div>
        :<div>List</div>
      }
    </div>
  )
}

export default HistoryList