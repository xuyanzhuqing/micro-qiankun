import { getRoutesApiSwr } from "apis/route";
import { Link } from "react-router-dom";
import { prefetchApps } from 'qiankun';
import { Foo } from '@dnt/components'
import { useTranslation, Trans } from "react-i18next";
import { Calendar, theme } from 'antd';

const App: React.FC = () => {
  const { data, isLoading } = getRoutesApiSwr()
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div>loading</div>
    )
  }

  prefetchApps((data?.data.content || []).map(v => ({
    name: v.name,
    entry: v.entry
  })))

  return (
    <div>home
      <Link to="/system/sea">to sea</Link>
      <Foo title="Hello dumi!" />
      <h2>{t("Welcome to React")}</h2>
      <h1>{t('add', { ns: 'system' })}</h1>
      <h1>{t('role', { ns: 'user' })}</h1>
      <Trans i18nKey="welcome">trans</Trans>
      <Calendar fullscreen={false} />
      <table>
        <tbody>
          {
            (data?.data.content || []).map(data => {
              return <tr key={data.id}>
                <td>{data.name}</td>
                <td>{data.activeRule}</td>
                <td>{data.entry}</td>
              </tr>
            })
          }
        </tbody>
      </table>
    </div>
  )
};

export default App;