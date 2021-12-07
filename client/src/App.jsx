import { Cricket } from "./Cricket/ui/Cricket";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { catchUpOnRoom } from "./Cricket/domaine/actions";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(catchUpOnRoom());
  }, []);

  return (
    <div>
      <Cricket />
    </div>
  );
}

export default App;
