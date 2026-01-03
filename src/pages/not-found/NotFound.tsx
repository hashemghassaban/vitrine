import { Button } from "antd";
import "./NotFound.less";
import { AppHeader } from "../../components/AppHeader/AppHeader";
import { AppFooter } from "../../components/AppFooter/AppFooter";

import useNavigation from "../../hooks/useHistory";

const NotFound = () => {
const { push } = useNavigation();
  return (
    <>
    <AppHeader noBackground/>
       <div className="notfound-container">
      <div className="notfound-content">
        <div className="error-number">404</div>

        <div className="error-texts">
          <p className="fa-text">صفحه موردنظر یافت نشد</p>
          <p className="en-text">Not Found</p>
          <Button type="link"  onClick={() => push("/")} >بازگشت به خانه</Button>
        </div>
      </div>
    </div>
<AppFooter/>
    
    </>

  );
};

export default NotFound;
