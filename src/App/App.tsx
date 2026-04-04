import {Outlet, useNavigate} from "react-router-dom";
import styles from './App.module.scss'
import Text from "@components/Text";
import logo from '@assets/icons/logo_github.png';
import avatar from '@assets/icons/user_avatar.png';
import classNames from "classnames";


function App() {
    const navigate = useNavigate();
    return (
        <div className={"app"}>
            <div className={classNames(styles['app__header'],styles['header'])}>
                <div className={styles['header__brand']} onClick={() => navigate('/repositories?page=1')}>
                    <div className={styles['header__logo']}
                        >
                        <img src={logo}/>
                    </div>
                    <div className={styles['header__name']}>
                        <Text view={'p-20'} color={'primary'} weight={'bold'}>GitHub Client</Text>
                    </div>
                </div>

                <div className={styles['header__user-avatar']}>
                    <img src={avatar}/>
                </div>
            </div>
            <Outlet/>
        </div>
    );
}

export default App;
