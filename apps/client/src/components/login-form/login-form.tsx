import { useState } from "react";
import { useDispatch } from "react-redux";
import userService from "../../service/user/user.service";
import { AppDispatch } from "../../store";
import { globalActions } from "../../store/global";
import { fetchUser } from "../../store/user-actions";
import Input from "../UI/input/input";

export interface MyComponentProps {}

export default function LoginForm(props: MyComponentProps) {
  const dispatch: AppDispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const usernameChangeHandler = (event: any) => {
    setUsername(event.target.value);
  };
  const passwordChangeHandler = (event: any) => {
    setPassword(event.target.value);
  };

  const registerHandler = async () => {
    const response = await userService.create(username, password);
    console.log(response); //TODO
  };

  const signInHandler = async () => {
    const response = await userService.login(username, password);

    if (response) {
      window.localStorage.setItem("token", response.login.access_token);
      dispatch(fetchUser());
      dispatch(globalActions.setShowLoginSideOver(false));
    }
  };

  return (
    <>
      <div className="mb-6">
        <Input
          value={username}
          onChange={usernameChangeHandler}
          name="username"
          id="username"
          label="Username"
          placeholder="Username"
        />
        <Input
          value={password}
          onChange={passwordChangeHandler}
          name="password"
          id="password"
          label="Password"
          placeholder="Password"
        />
      </div>
      <div>
        <div className="mb-6">
          <button
            onClick={registerHandler}
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-900 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-900"
          >
            Register
          </button>
        </div>
        <div>
          <button
            onClick={signInHandler}
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign In
          </button>
        </div>
      </div>
    </>
  );
}
