import {Outlet, useNavigate} from "react-router-dom";
import './App.css'
import Text from "@components/Text";
import logo from '@assets/icons/logo_github.png';
import avatar from '@assets/icons/user_avatar.png';
import classNames from "classnames";


function App() {
    const navigate = useNavigate();
    return (
        <div className={"app"}>
            <div className={classNames('app__header','header')}>
                <div className={'header__brand'} onClick={() => navigate('/repositories?page=1')}>
                    <div className={'header__logo'}
                        >
                        <img src={logo}/>
                    </div>
                    <div className={'header__name'}>
                        <Text view={'p-20'} color={'primary'} weight={'bold'}>GitHub Client</Text>
                    </div>
                </div>

                <div className={'header__user-avatar'}>
                    <img src={avatar}/>
                </div>
            </div>
            <Outlet/>
        </div>
    );
}

export default App;
