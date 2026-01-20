import React from 'react';
import Calendar from './component/Calendar';
import RecentSessions from './component/RecentSessions';

function UserDashboard() {
   return (
//  <div className='grid grid-rows-4 grid-cols-7 px-10 h-full'> 
//       {/* <div className='bg-red-500 col-span-4 row-span-1'>good morning</div>
//       <div className='col-span-1 row-span-4'></div>
//       <div className='col-span-2 h-80 row-span-2'>Calendar</div>
//       <div className='bg-amber-200 col-span-4 row-span-1'>upcoming session</div>
//       <div className='bg-gray-400 col-span-4 row-span-1'>alert</div> */ 
     
//       <>  <div className='col-start-6 col-span-3 row-start-1 row-span-2'>
//           <Calendar /></div>

//     <div className='col-start-6 col-span-3 row-start-2.1 row-span-3'>
//   <div className='h-80 overflow-y-auto'> {/* Fixed height with scroll */}
//     <RecentSessions />
//   </div>
// </div> </>
    
//       }
//     </div>
 <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Mobile: Stack, Desktop: Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 lg:gap-6">
          
          {/* Good Morning */}
          <div className="lg:col-span-4 bg-red-500 rounded-xl p-4 md:p-6">
            <h1 className="text-xl md:text-2xl font-bold text-white">
              Good Morning, Rajesh!
            </h1>
            <p className="text-white/90 mt-1 md:mt-2">
              Welcome to Safe Harbour
            </p>
          </div>
          
          {/* Empty column on desktop */}
          <div className="hidden lg:block lg:col-span-1"></div>
          
          {/* Calendar */}
          <div className="lg:col-span-2">
            <Calendar />
          </div>
          
          {/* Upcoming Session */}
          <div className="lg:col-span-4 bg-amber-200 rounded-xl p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-3">
              Upcoming Session
            </h2>
            <div className="text-gray-700">Next session in 2 days</div>
          </div>
          
          {/* Alert */}
          <div className="lg:col-span-4 bg-gray-400 rounded-xl p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-3">
              Alerts
            </h2>
            <div className="text-gray-700">No new alerts</div>
          </div>
          
          {/* Recent Sessions */}
          <div className="lg:col-start-6 lg:col-span-2">
            <RecentSessions />
          </div>
          
        </div>
      </div>
    </div>

  );
}

export default UserDashboard;
