const base = "http://localhost:5000/api"
const baseD = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`
export const apiUrl = {
    client: `${base}/client`,
    project: `${base}/project`,
    ticket: `${base}/ticket`,
    task: `${base}/task`,
    user: `${base}/user`,
    login: `${baseD}/login`,
    currentUser: `${base}/current`,
    logout: `${base}/logout`,
    role: `${base}/role`,
    permission: `${base}/permission`,
    attendance: `${base}/attendance`,
    panel : `${base}/panels`,
    dashboard: `${base}/dashboard`,
    material :`${base}/material`,
    size :`${base}/sizes`,
    accessories :`${base}/accessories`,
    iconModular:`${base}/icon`,
    colorModular:`${base}/color`
}