import { Fragment } from "react";

import { AppContent, AppFooter, AppHeader } from "./components";

const App = () => {
  return (
    <Fragment>
      <AppHeader title='Simple MySQL Query Creation Tool' />
      <AppContent />
      <AppFooter />
    </Fragment>
  );
}

export default App;