import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminGuard } from './authGuard/admin.guard';
import { NormalGuard } from './authGuard/normal.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { AuthGuard } from './authGuard/auth.guard';
import { UserlistComponent } from './pages/admin/userlist/userlist.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewQuizzesByCategoryComponent } from './pages/admin/view-quizzes-by-category/view-quizzes-by-category.component';
import { ViewQuestionsComponent } from './pages/admin/view-questions/view-questions.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { LoadQuizComponent } from './pages/user/load-quiz/load-quiz.component';
import { InstructionsComponent } from './pages/user/instructions/instructions.component';
import { StartComponent } from './pages/user/start/start.component';
import { CertificateComponent } from './pages/user/certificate/certificate.component';


const routes: Routes = [
  {
    path : "",
    component : HomeComponent,
    canActivate : [AuthGuard]
  },
  {
    path : 'register',
    component : SignupComponent,
  },
  {
    path : 'login',
    component : LoginComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'admin',
    component:AdminDashboardComponent,
    canActivate:[AdminGuard],
    children:[
      {
        path:'profile',
        component:ProfileComponent,
      },
      {
        path:'',
        component:WelcomeComponent,
        pathMatch:"full"
      },
      {
        path:'users',
        component:UserlistComponent,
      },
      {
        path:'categories',
        component:ViewCategoriesComponent
      },
      {
        path:'add-category',
        component:AddCategoryComponent
      },
      {
        path:'quizzes',
        component:ViewQuizzesComponent
      },
      {
        path:'add-quiz',
        component:AddQuizComponent
      },
      {
        path:'update-quiz/:quizId',
        component:UpdateQuizComponent
      },
      {
        path:'view-Quiz-by-category/:categoryId',
        component:ViewQuizzesByCategoryComponent
      },
      {
        path:'view-questions-by-quiz/:quizId',
        component:ViewQuestionsComponent
      },
      {
        path:'add-question/:quizId',
        component:AddQuestionComponent
      }
    ]
  },
  {
    path:'user',
    component:UserDashboardComponent,
    canActivate:[NormalGuard],
    children:[
      {
        path:'profile',
        component:ProfileComponent,
      },
      {
        path:'load-quiz/:categoryId',
        component:LoadQuizComponent
      },
      {
        path:'instructions/:quizId',
        component:InstructionsComponent
      },
    ]
  },
  {
    path:'start/:quizId',
    component:StartComponent
  },
  {
    path:'certificate/:quizId/:AttemptedQue/:CorrectAns/:percentage',
    component:CertificateComponent
  },
  {
    path: "**",
    redirectTo: "/user/load-quiz/0", 
    pathMatch: "full",
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
