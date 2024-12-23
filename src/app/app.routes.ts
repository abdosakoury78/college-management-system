import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { StudentsComponent } from './students/students.component';
import { TeachersComponent } from './teachers/teachers.component';
import { TimetableComponent } from './timetable/timetable.component';
import { CoursesComponent } from './courses/courses.component';
import { StudentComponent } from './student/student.component';
import { BatchComponent } from './batch/batch.component';
import { HelpPageComponent } from './help-page/help-page.component';
import { HelpStudentComponent } from './help-student/help-student.component';
// import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {
        path: "student",
        component: StudentComponent
    },
    {
        path: "dashboard",
        component: AdminDashboardComponent
    },
    {
        path: "students",
        component: StudentsComponent
    },
    {
        path: "teachers",
        component: TeachersComponent
    },
    {
        path: "courses",
        component: TimetableComponent
    },
    {
        path: "exams",
        component: CoursesComponent
    },
    {
        path: "batches",
        component: BatchComponent
    },
    {
        path: "help",
        component: HelpPageComponent
    },
    {
        path: "Help",
        component: HelpStudentComponent
    }
];
