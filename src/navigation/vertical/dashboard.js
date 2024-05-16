const userData = useCookie('userData')

const userRole = userData.value?.role

const menuItems = [
  {
    group: 'Dashboards',
    title: 'Control lab Process',
    icon: { icon: 'tabler-smart-home' },
    to: 'dashboards-control-lab-board',
    badgeClass: 'bg-global-primary',
    roles: ['admin', 'General'], 
  },
  {
    group: 'Dashboards',
    title: 'Control lab Reservaciones',
    icon: { icon: 'tabler-smart-home' },
    to: 'dashboards-reservaciones-board',
    badgeClass: 'bg-global-primary',
    roles: ['admin'], 
  },
]

// Filtra los elementos del menú basado en el rol del usuario
const filteredMenuItems = menuItems.filter(item => item.roles.includes(userRole))


export default filteredMenuItems
