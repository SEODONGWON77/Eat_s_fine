import React, { Suspense } from "react";
import { Link, Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
import Landing from "./views/landingPage/Landing.js";
import Login from "./views/loginPage/Login.js";
import Register from "./views/registerPage/Register.js";
import Header from "./views/common/Header.js";
import Footer from "./views/common/Footer.js";
import FileUpload from "./views/uploadPage/FileUpload";
import FileDetail from "./views/fileDetailPage/FileDetail";

function App() {
  return (
    <div>
      <Suspense fallback={(<div>Lodading...</div>)}>
        <Header />
        <Switch>
          <Route exact path="/" component={Auth(Landing, null)} />
          <Route exact path="/login" component={Auth(Login, false)} />
          <Route exact path="/register" component={Auth(Register, false)} />
          <Route exact path="/upload" component={Auth(FileUpload, true)} />
          <Route exact path="/video/:fileId" component={FileDetail} />
        </Switch>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
