import { createRouter, createWebHistory } from 'vue-router';
import Login from '../pages/Login.vue';
import Dashboard from '../pages/Dashboard.vue';
import IndustryExpertDashboard from '../pages/IndustryExpertDashboard.vue';
import FacultyVisitDashboard from '../pages/FacultyVisitDashboard.vue';
import IndustryExpertInputForm from '../pages/IndustryExpertInputForm.vue';
import FacultyVisitInputForm from '../pages/FacultyVisitInputForm.vue';

const routes = [
  { 
    path: '/', 
    component: Login 
  },
  { 
    path: '/dashboard', 
    component: Dashboard, 
    redirect: '/dashboard/industry-expert',
    children: [
      { 
        path: 'industry-expert', 
        component: IndustryExpertDashboard 
      },
      { 
        path: 'faculty-visit', 
        component: FacultyVisitDashboard 
      },
      { 
        path: 'industry-expert/new', 
        component: IndustryExpertInputForm 
      },
      { 
        path: 'industry-expert/edit/:id', 
        name: 'EditIndustryExpert',
        component: IndustryExpertInputForm,
        props: true  // Pass route parameters as props to the component
      },
      { 
        path: 'faculty-visit/new', 
        component: FacultyVisitInputForm 
      },
      { 
        path: 'faculty-visit/edit/:id', 
        name: 'EditFacultyVisit',
        component: FacultyVisitInputForm,
        props: true  // Pass route parameters as props to the component
      },
    ]
  },
];

// Create the router instance with the defined routes
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
