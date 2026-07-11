import React from 'react'

function Home() {
  const {selectedUser} = useChatStore();
  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div  className="bg-base-100 rounded-lg shadow-xl max-w-6xl w-full h-[calc(100vh-8rem)]">
          {/*sidebar */}
          <div>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default  Home;
