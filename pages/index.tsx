import Head from "next/head";
import LoginAndSignUpForm from "@/components/sections/LoginAndSignUpForm";
import HomeDescription from "@/components/sections/HomeDescription";

export default function Home() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Head>
        <title>Cat & Pillows</title>
        <link rel="icon" href="/images/logo/favicon.png" />
      </Head>

      <HomeDescription />

      <aside
        style={{ width: "400px", display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
        <LoginAndSignUpForm />
      </aside>
    </div>
  );
}
