import Layout from "../layouts/DefaultLayout.vue";
import ForgotPassword from "../views/authentication/ForgotPassword";
import ResetPassword from "../views/authentication/ResetPassword";
import ProfilePage from "../views/authentication/Profile.vue";


const authRoutes = [
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "profile",
        component: ProfilePage,
        name: "ProfilePage",
        meta: { requiresAuth: true },
      },
      {
        path: "forgot-password",
        component: ForgotPassword,
        name: "Forgot Password",
      },
      {
        path: "reset-password",
        component: ResetPassword,
        name: "Reset Password",
      },
    ],
  },
];

export default authRoutes;