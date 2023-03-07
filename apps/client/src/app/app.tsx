import Header from "../components/layout/header/header";
import Footer from "../components/layout/footer/footer";
import Main from "../components/layout/main/main";
import { AppDispatch } from "../store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUser } from "../store/user-actions";

export function App() {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const token = window.localStorage.getItem("token");

    if (token) {
      dispatch(fetchUser());
    }
  }, [dispatch]);
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}

export default App;
