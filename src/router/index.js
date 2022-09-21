import Vue from "vue";
import Router from "vue-router";
import { store } from "@/store";
const Page404 = () => import("@/pages/Page404");
const Page500 = () => import("@/pages/Page500");

const Login = () => import("@/pages/Login");
const Register = () => import("@/pages/Register");
const Logout = () => import("@/pages/Logout");

const CompleteProfile = () => import("@/components/register/CompleteProfile");
const Home = () => import("@/pages/Home");
const Profile = () => import("@/pages/Profile");
const Assignments = () => import("@/pages/Assignment");
const Exams = () => import("@/pages/Exam");
const Notes = () => import("@/pages/Note");

Vue.use(Router);

let router = new Router({
  mode: "history",
  linkActiveClass: "active",
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes(),
});
router.beforeEach((to, from, next) => {
  store.dispatch("user/validate").then(() => {
    if (
      !["Login", "Register", "Logout", "meeting"].includes(to.name) &&
      !store.getters["user/userIsAuthenticated"]
    )
      next({ name: "Login", query: { redirect: to.fullPath } });
    else next();
  });
});

export default router;

function configRoutes() {
  return [
    // {
    //   path: "/meeting",
    //   name: "meeting",
    //   props: true,
    //   component: () => import("@/components/global/JitsiMeet"),
    // },
    {
      path: "/meeting/:roomName",
      name: "meeting",
      props: true,
      component: () => import("@/pages/Meeting"),
    },
    {
      path: "/manage-organization",
      name: "ManageOrganization",
      component: () => import("@/pages/ManageOrganization"),
      children: [
        {
          path: "/add-organization-users",
          name: "AddOrganizationUsers",
          component: () =>
            import(
              "@/components/organization/create/UploadOrganizationUsersRooms.vue"
            ),
        },
        {
          path: "/update-organization-details",
          name: "UpdateOrganizationUsers",
          component: () =>
            import(
              "@/components/organization/update/UpdateOrganizationDetails.vue"
            ),
        },
      ],
    },

    {
      path: "/organization-users",
      name: "OrganizationUsers",
      component: () => import("@/pages/OrganizationUsers"),
    },
    {
      path: "/payment",
      name: "payment",
      component: () => import("@/pages/Payment"),
      // meta: { requiresAdmin: true },
    },
    {
      path: "/rooms/:id/fees",
      name: "fees",
      component: () => import("@/pages/Fees"),
      // meta: { requiresAdmin: true },
    },

    {
      path: "/complete",
      name: "complete_profile",
      component: CompleteProfile,
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile,
    },
    {
      path: "/rooms/:id",
      name: "room",
      component: () => import("@/pages/Room"),
    },
    {
      path: "/exam/:id",
      name: "exams",
      component: Exams,
    },
    {
      path: "/assignments/:id",
      name: "assignments",
      component: Assignments,
    },
    {
      path: "/notes/:id",
      name: "notes",
      component: Notes,
    },
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/logout",
      name: "Logout",
      component: Logout,
    },
    {
      path: "/pages",
      redirect: "/pages/404",
      name: "Pages",
      component: {
        render(c) {
          return c("router-view");
        },
      },
      children: [
        {
          path: "404",
          name: "Page404",
          component: Page404,
        },
        {
          path: "500",
          name: "Page500",
          component: Page500,
        },
      ],
    },
    {
      path: "/",
      redirect: "/login",
      name: "Auth",
      component: {
        render(c) {
          return c("router-view");
        },
      },
      children: [
        {
          path: "login",
          name: "Login",
          component: Login,
        },
        {
          path: "register",
          name: "Register",
          component: Register,
        },
      ],
    },
    {
      path: "*",
      name: "404",
      component: Page404,
    },
  ];
}
