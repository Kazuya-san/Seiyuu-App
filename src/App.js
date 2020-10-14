import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import JikanProvider from "./context/JikanContext"

//Layout
import Navigation from "./Components/Navigation"
import Landing from "./Components/Landing"
import Footer from "./Components/Footer"
//Routes
import Search from "./Components/Search";
import AiringAnime from "./Components/AiringAnime";

const App = () => {
  return (
    <JikanProvider>
      <BrowserRouter>
        <Navigation />
        <Switch>
          <Route path="/" component={Landing} exact />
          <Route path="/search" component={Search}/>
          <Route path="/airing" component={AiringAnime}/>
          <Route render={() => <Redirect to="/" />} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </JikanProvider>
  )
}

export default App;