import React from 'react'

function ChatHeader() {
  return (
    <div className="flex items-center border-b border-white/10 p-4">
    {/* <Avatar className="h-10 w-10">
      <AvatarImage
        src={selectedContact.avatar}
        alt={selectedContact.name}
      />
      <AvatarFallback>{selectedContact.name[0]}</AvatarFallback>
    </Avatar> */}
    <div className="ml-4">
      {/* <h2 className="text-lg font-semibold text-gray-200">
        {selectedContact.name}
      </h2> */}
    </div>
  </div>
  )
}

export default ChatHeader
