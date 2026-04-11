import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./App";
import "./index.css";

import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ErrorFallbackUI";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ErrorBoundary
    FallbackComponent={ErrorFallback}
    onReset={() => window.location.reload()}
  >
    <Provider store={store}>
      <App />
    </Provider>
  </ErrorBoundary>,
);
