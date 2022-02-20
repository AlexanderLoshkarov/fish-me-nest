import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { getIsAuthenticated } from "../redux/auth/authSelectors";

/* - Если маршрут ограниченный и юзер залогинен, рендерит редирект на redirectTo
 * - В противном случае рендерит компонент */

export default function PublicRoute({
  children,
  restricted = false,
  redirectTo = "/",
  ...routeProps
}) {
  const isAuthenticated = useSelector(getIsAuthenticated);
  const shouldRedirect = isAuthenticated && restricted;
  return (
    <Route {...routeProps}>
      {shouldRedirect ? <Redirect to={redirectTo} /> : children}
    </Route>
  );
}
