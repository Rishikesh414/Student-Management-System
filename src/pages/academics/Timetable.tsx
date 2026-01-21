// import { useState } from 'react';
// import PageHeader from '@/components/layout/PageHeader';
// import SectionCard from '@/components/common/SectionCard';
// import { DAYS, PERIODS } from '@/utils/constants';
// import { Clock, MapPin, User } from 'lucide-react';
// import { cn } from '@/lib/utils';

// const timetableData: Record<string, Record<number, { subject: string; room: string; faculty: string } | null>> = {
//   Monday: {
//     1: { subject: 'Data Structures', room: 'CS-201', faculty: 'Dr. Sharma' },
//     2: { subject: 'Database Systems', room: 'CS-203', faculty: 'Prof. Patel' },
//     3: { subject: 'Operating Systems', room: 'CS-101', faculty: 'Dr. Kumar' },
//     4: null,
//     5: { subject: 'Lab - DS', room: 'Lab-1', faculty: 'Dr. Sharma' },
//     6: { subject: 'Lab - DS', room: 'Lab-1', faculty: 'Dr. Sharma' },
//     7: null,
//   },
//   Tuesday: {
//     1: { subject: 'Computer Networks', room: 'CS-204', faculty: 'Prof. Singh' },
//     2: { subject: 'Software Engineering', room: 'CS-205', faculty: 'Dr. Gupta' },
//     3: null,
//     4: { subject: 'Data Structures', room: 'CS-201', faculty: 'Dr. Sharma' },
//     5: { subject: 'Database Systems', room: 'CS-203', faculty: 'Prof. Patel' },
//     6: { subject: 'Operating Systems', room: 'CS-101', faculty: 'Dr. Kumar' },
//     7: null,
//   },
//   Wednesday: {
//     1: { subject: 'Software Engineering', room: 'CS-205', faculty: 'Dr. Gupta' },
//     2: { subject: 'Computer Networks', room: 'CS-204', faculty: 'Prof. Singh' },
//     3: { subject: 'Data Structures', room: 'CS-201', faculty: 'Dr. Sharma' },
//     4: null,
//     5: { subject: 'Lab - DBMS', room: 'Lab-2', faculty: 'Prof. Patel' },
//     6: { subject: 'Lab - DBMS', room: 'Lab-2', faculty: 'Prof. Patel' },
//     7: null,
//   },
//   Thursday: {
//     1: { subject: 'Database Systems', room: 'CS-203', faculty: 'Prof. Patel' },
//     2: { subject: 'Operating Systems', room: 'CS-101', faculty: 'Dr. Kumar' },
//     3: { subject: 'Computer Networks', room: 'CS-204', faculty: 'Prof. Singh' },
//     4: { subject: 'Software Engineering', room: 'CS-205', faculty: 'Dr. Gupta' },
//     5: null,
//     6: null,
//     7: { subject: 'Tutorial', room: 'CS-201', faculty: 'Dr. Sharma' },
//   },
//   Friday: {
//     1: { subject: 'Operating Systems', room: 'CS-101', faculty: 'Dr. Kumar' },
//     2: { subject: 'Data Structures', room: 'CS-201', faculty: 'Dr. Sharma' },
//     3: null,
//     4: { subject: 'Computer Networks', room: 'CS-204', faculty: 'Prof. Singh' },
//     5: { subject: 'Lab - OS', room: 'Lab-3', faculty: 'Dr. Kumar' },
//     6: { subject: 'Lab - OS', room: 'Lab-3', faculty: 'Dr. Kumar' },
//     7: null,
//   },
//   Saturday: {
//     1: { subject: 'Software Engineering', room: 'CS-205', faculty: 'Dr. Gupta' },
//     2: { subject: 'Database Systems', room: 'CS-203', faculty: 'Prof. Patel' },
//     3: null,
//     4: null,
//     5: null,
//     6: null,
//     7: null,
//   },
// };

// const subjectColors: Record<string, string> = {
//   'Data Structures': 'bg-blue-100 border-blue-300 text-blue-800',
//   'Database Systems': 'bg-green-100 border-green-300 text-green-800',
//   'Operating Systems': 'bg-purple-100 border-purple-300 text-purple-800',
//   'Computer Networks': 'bg-orange-100 border-orange-300 text-orange-800',
//   'Software Engineering': 'bg-pink-100 border-pink-300 text-pink-800',
//   'Lab - DS': 'bg-blue-50 border-blue-200 text-blue-700',
//   'Lab - DBMS': 'bg-green-50 border-green-200 text-green-700',
//   'Lab - OS': 'bg-purple-50 border-purple-200 text-purple-700',
//   'Tutorial': 'bg-gray-100 border-gray-300 text-gray-700',
// };

// export default function Timetable() {
//   const [selectedDay, setSelectedDay] = useState<string>('Monday');
//   const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

//   return (
//     <div className="animate-fade-in">
//       <PageHeader
//         title="Timetable"
//         subtitle="Your weekly class schedule"
//         breadcrumbs={[
//           { label: 'Academics', path: '/academics/timetable' },
//           { label: 'Timetable' },
//         ]}
//       />

//       {/* Day Tabs */}
//       <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
//         {DAYS.map((day) => (
//           <button
//             key={day}
//             onClick={() => setSelectedDay(day)}
//             className={cn(
//               'px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all',
//               selectedDay === day
//                 ? 'bg-primary text-primary-foreground shadow-md'
//                 : 'bg-card border border-border hover:bg-muted'
//             )}
//           >
//             {day}
//             {day === today && (
//               <span className="ml-2 w-2 h-2 rounded-full bg-success inline-block animate-pulse" />
//             )}
//           </button>
//         ))}
//       </div>

//       {/* Day Schedule */}
//       <SectionCard title={selectedDay} subtitle={selectedDay === today ? "Today's Schedule" : 'Class Schedule'}>
//         <div className="space-y-3">
//           {PERIODS.map((period) => {
//             const classData = timetableData[selectedDay]?.[period.id];
            
//             return (
//               <div
//                 key={period.id}
//                 className={cn(
//                   'p-4 rounded-lg border transition-all',
//                   classData ? subjectColors[classData.subject] || 'bg-muted' : 'bg-muted/30 border-dashed border-border'
//                 )}
//               >
//                 <div className="flex items-start justify-between">
//                   <div className="flex items-center gap-3">
//                     <div className="text-center">
//                       <span className="text-xs opacity-70">Period</span>
//                       <p className="text-lg font-bold">{period.id}</p>
//                     </div>
//                     <div className="h-12 w-px bg-current opacity-20" />
//                     <div>
//                       {classData ? (
//                         <>
//                           <p className="font-semibold">{classData.subject}</p>
//                           <div className="flex items-center gap-4 mt-1 text-sm opacity-80">
//                             <span className="flex items-center gap-1">
//                               <MapPin className="w-3 h-3" />
//                               {classData.room}
//                             </span>
//                             <span className="flex items-center gap-1">
//                               <User className="w-3 h-3" />
//                               {classData.faculty}
//                             </span>
//                           </div>
//                         </>
//                       ) : (
//                         <p className="text-muted-foreground">Free Period</p>
//                       )}
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-1 text-sm opacity-70">
//                     <Clock className="w-4 h-4" />
//                     {period.time}
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </SectionCard>

//       {/* Legend */}
//       <div className="mt-6 p-4 rounded-lg bg-muted/30">
//         <h4 className="text-sm font-medium mb-3">Subject Legend</h4>
//         <div className="flex flex-wrap gap-2">
//           {Object.entries(subjectColors).slice(0, 5).map(([subject, colorClass]) => (
//             <span key={subject} className={cn('px-3 py-1 rounded-full text-xs font-medium border', colorClass)}>
//               {subject}
//             </span>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
