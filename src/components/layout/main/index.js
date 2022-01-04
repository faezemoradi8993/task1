import React from "react";

function Main({children}) {
  return (
    <main className="flex-1 pt-[80px] z-10 h-full flex">
      <div className="bg-blue-600 w-11/12 mx-auto p-5 md:max-w-[750px] flex-1">{children}</div>
    </main>
  );
}

export default Main;
