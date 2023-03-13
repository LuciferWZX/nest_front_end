import { Outlet } from 'umi';
import styles from './index.less';
import useWebsocket from "@/layouts/useWebsocket";

export default function Layout() {
    const {websocket} = useWebsocket()
    return (
        <div className={styles.background}>
          <Outlet context={{client:websocket}} />
        </div>
    );
}
