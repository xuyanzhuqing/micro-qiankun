import { getRoutesApiSwr } from "apis/route";
import { Link } from "react-router-dom";
import { prefetchApps } from 'qiankun';

const App: React.FC = () => {
  const { data, isLoading } = getRoutesApiSwr()
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