import { Link, Outlet } from 'umi';
import styles from './index.less';
import useWebsocket from "@/layouts/useWebsocket";

export default function Layout() {
    const {websocket} = useWebsocket()
    return (
        <div className={styles.navs}>
          <Outlet context={{client:websocket}} />
        </div>
    );
}
