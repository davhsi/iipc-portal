import { createRouter, createWebHistory } from 'vue-router';
import Login from '../pages/Login.vue';
import Dashboard from '../pages/Dashboard.vue';
import IndustryExpertDashboard from '../pages/IndustryExpertDashboard.vue';
import FacultyVisitDashboard from '../pages/FacultyVisitDashboard.vue';
import IndustryExpertInputForm from '../pages/IndustryExpertInputForm.vue';

const routes = [
  { path: '/', component: Login },
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
        props: true  // Pass route parameter `id` as a prop
      },
      
    ]
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
