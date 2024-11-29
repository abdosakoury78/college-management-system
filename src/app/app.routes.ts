import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { StudentsComponent } from './students/students.component';
import { TeachersComponent } from './teachers/teachers.component';
import { TimetableComponent } from './timetable/timetable.component';

export const routes: Routes = [
    {
        path: "admin-dashboard",
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
        path: "timetable",
        component: TimetableComponent
    }
];
