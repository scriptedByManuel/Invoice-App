import React from 'react'

const ShowDate = ({timestamp}) => {
    const date = new Date(timestamp);

    const formattedDate = date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });

    const formattedTime = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    });
  return (
      <>
          <p className="text-xs">{formattedDate}</p>
          <p className="text-xs uppercase">{formattedTime}</p> 
      </>
  )
}

export default ShowDate