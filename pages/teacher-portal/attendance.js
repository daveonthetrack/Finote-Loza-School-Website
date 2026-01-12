import TeacherLayout from '@/components/TeacherLayout';
import TeacherGuard from '@/components/TeacherGuard';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';

export default function TeacherAttendance() {
  return (
    <TeacherGuard>
      <TeacherLayout>
        <div className="py-2">
          <Reveal>
            <SectionHeading
              title="Attendance"
              subtitle="Attendance tracking is coming soon"
            />
          </Reveal>
          <div className="card mt-4 p-6 text-center text-gray-600">
            This page is a placeholder so you can navigate the teacher portal without errors.
            Attendance features will be implemented here in the future.
          </div>
        </div>
      </TeacherLayout>
    </TeacherGuard>
  );
}


