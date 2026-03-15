import type { Route } from "./+types/home";
import { Login } from "../login/login";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login" },
    { name: "description", content: "Login to higher lower!" },
  ];
}

export default function Home() {
  return <Login/>;
}
