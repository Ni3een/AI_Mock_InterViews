import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils';
enum CallStatus{
    INACTIVE='INACTIVE',
    CONNECTING='CONNECTING',
    ACTIVE='ACTIVE',
    FINISHED='FINISHED'
}
const Agent = ({userName}:AgentProps) => {
const isspeaking=true;
const messages=[
    'Whats you name?',
    'My name is vapi,nice to meet you!',
];
const lastMessage=messages[messages.length-1];
const callStatus=CallStatus.FINISHED;
  return (
    <>
    <div className="call-view">
        <div className='card-interviewer'>
            <div className='avatar'>
                <Image src="/ai-avatar.png" alt="vapi" width={36} height={36} className='object-cover'></Image>
                {isspeaking && <span className="animate-speak"></span>}
            </div>
            <h3>AI Interviewer</h3>
        </div>
        <div className='card-border'>
            <div className="card-content">
                <Image src="/user-avatar.png" alt="user avatar" width={60} height={60} className='rounded-full object-cover size-[120px]'></Image>
                <h3>{userName}</h3>
            </div>
        </div>
    </div>
    {messages.length>0 &&(
        <div className='transcript-border'>
            <div className='transcript'>
                <p key={lastMessage} className={cn('transition-opacity duration-500 opacity-0', 'animate-fadeIn opacity-100')}>
                    {lastMessage}
                </p>
            </div>
        </div>
    )}
    <div className='w-full flex justify-center'>
        {callStatus=='FINISHED'?(
            <button className='relative btn-call'>
                <span className={cn('absolute animate-ping rounded-full opacity-75',callStatus!='CONNECTING' && 'hidden')}></span>
                <span>
                    {callStatus==='FINISHED' || callStatus==='FINISHED' ? 'CALL' :'...'}
                </span>
            </button>
        ):(
            <button className='btn-disconnect'>
                END 
            </button>
        )}
    </div>
    </>
  )
}

export default Agent