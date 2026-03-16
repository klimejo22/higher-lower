import type { Route } from "./+types/home";
import { SignUp } from "../pages/signup";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sign Up" },
    { name: "description", content: "Create an account for Higher-Lower" },
  ];
}

export default function SignUpRoute() {
  return <SignUp />;
}