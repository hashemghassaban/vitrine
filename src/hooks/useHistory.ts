import { useLocation, useNavigate } from 'react-router-dom'

export default () => {
  const navigate = useNavigate()
  const location = useLocation()

  const push = (to:string) => navigate(to)
  const replace = (to:string) => navigate(to, { replace: true })
  const goBack = (n = -1) => navigate(n)
  const reload = () => document.location.reload()

  return {
    location,
    push,
    replace,
    goBack,
    reload,
  }
}
