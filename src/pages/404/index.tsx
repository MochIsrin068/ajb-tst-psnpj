import { useHistory } from 'react-router-dom'
import { Result, Button } from "antd";

const ErrorPage = () => {
    const history = useHistory()
    return (
        <div className="errorPage">
            <Result
                status="404"
                title="404"
                subTitle={"Sorry, the page you visited does not exist."}
                extra={
                    <Button type="primary" onClick={() => history.push("/")}>
                        Back To Home
                    </Button>
                }
            />
        </div>
    );
};

export default ErrorPage;
