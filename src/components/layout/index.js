import React from "react";
import Header from "./header";
import Footer from "./footer";
import Main from "./main";

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <Header />
      <Main>{children}</Main>
      <Footer />
    </div>
  );
}

export default Layout;
