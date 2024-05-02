import { NavBar } from "@/components/platform/NavBar/Navbar";
import { Sidebar } from "@/components/platform/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <main className="min-h-screen">
      <NavBar />
      <section className="flex justify-between">
        <Sidebar />
        <Outlet />
      </section>
      {/* <footer className="h-14 py-2 px-5 border-t flex justify-center items-center">
        <h1>Footer</h1>
      </footer> */}
    </main>
  );
}

export default AppLayout;
