"use client";

import { GlobalProvider } from "./GlobalContext";

function ThirdPartyProvider({ children }) {
  return <GlobalProvider>{children}</GlobalProvider>;
}

export default ThirdPartyProvider;
