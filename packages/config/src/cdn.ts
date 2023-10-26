/**
 * 用于主项目加载公共资源
 */
export const cdns = new Map<string, [string, string]>([
  ['https://unpkg.com/react@18.2.0/umd/react.production.min.js', ['react', 'React']],
  ['https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js', ['react-dom', 'ReactDOM']],
  ['https://unpkg.com/axios@1.5.1/dist/axios.min.js', ['axios', 'axios']],
  ['https://unpkg.com/i18next@23.6.0/i18next.min.js', ['i18next', 'i18next']],
])

export const externals = Array.from(cdns.values())
  .reduce((acc, curr) => {
    acc[curr[0]] = curr[1]
    return acc
  }, {} as Record<string, string>)

export default cdns