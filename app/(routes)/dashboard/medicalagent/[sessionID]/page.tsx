"use client"
import axios from 'axios';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { doctorAgent } from '../../_components/DoctorsAgentCard';
import { Circle } from 'lucide-react';
import Image from 'next/image';

type SessionDetails = {
  id: number,
  notes: string,
  sessionId: string,
  report: JSON,
  SelectedDoctor: doctorAgent,
  createdOn: string
}


function MedicalVoiceAgent() {
  const { sessionID } = useParams();
  const [sessionDetail, setSessionDetail] = useState<SessionDetails>();

  useEffect(() => {
    sessionID && GetSessionDetails();
  }, [sessionID])
  const GetSessionDetails = async () => {
    const result = await axios.get(`/api/session-chat?sessionId=${sessionID}`);
    console.log(result.data);
  }

  return (
    <div>
      <div className='flex justify-between items-center'>
        <h2 className='p-1 px-2 border rounded-md flex gap-2 items-center '> <Circle className='w-4 h-4'/> Not Connnected</h2>
        <h2 className='font-bold text-xl text-gray-400'> time </h2>
      </div>

      {sessionDetail && <div>
        <Image src ={sessionDetail?.SelectedDoctor?.image} alt={sessionDetail?.SelectedDoctor?.specialist??''}
         width={100} height={100} className='rounded-full mt-4' />
      </div>}
    </div>
  )
}

export default MedicalVoiceAgent