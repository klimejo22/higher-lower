import { type RouteConfig, index } from "@react-router/dev/routes";

export default [
  index("routes/homepage.tsx"),
  { path: "signup", file: "routes/signup.tsx" },
  { path: "login", file: "routes/login.tsx" },
  { path: "game", file: "routes/game.tsx" },
];