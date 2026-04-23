import {Outlet, useNavigate} from "react-router-dom";
import styles from '@App/App.module.scss'
import Text from "@components/Text";
import logo from '@assets/icons/logo_github.png';
import avatar from '@assets/icons/user_avatar.png';
import {routes} from "@config/routes";



function App() {
    const navigate = useNavigate();
    return (
        <div className={styles["app"]}>
            <div className={styles['app__header']}>
                <div className={styles['header__brand']} onClick={() => navigate(routes.repositories.create())}>
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
