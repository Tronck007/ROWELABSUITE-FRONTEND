import appsAndPages from "./apps-and-pages";
import dashboard from "./dashboard";
import guestPages from "./guest-pages";

const userData = useCookie("userData").value;
const userRole = userData?.role;

let navigationRoutes = [];

if (userRole !== "Guest") {
  navigationRoutes = [...dashboard, ...appsAndPages];
} else {
  navigationRoutes = [...guestPages];
}

export default navigationRoutes;
