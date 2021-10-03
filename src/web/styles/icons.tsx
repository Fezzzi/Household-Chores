import React from 'react'

// ----------------------------------
// Custom icons
// ----------------------------------

// trinalge
export const FullArrowLeftIcon = () => (
  <svg viewBox="0 0 5 10" fill="currentColor">
    <path d="M5 0l-5 5 5 5V7z" />
  </svg>
)

// trinalge
export const FullArrowRightIcon = () => (
  <svg viewBox="5 0 5 10" fill="currentColor">
    <path d="M5 10l5 -5 -5 -5v10z" />
  </svg>
)

// ----------------------------------
// Material-UI icon reexports
// ----------------------------------
export {
  Add as PlusIcon,
  AttachMoney as MoneyIcon,
  Announcement as DialogIcon,
  ArrowBack as ArrowBackIcon, // arrow
  Brightness6 as SunIcon,
  CalendarToday as CalendarIcon,
  Cancel as CancelIcon,
  Check as CheckIcon,
  ChevronRight as ChevronRightIcon, // v shaped
  Code as CodeIcon,
  Delete as DeleteIcon,
  DeleteForever as DeleteForeverIcon,
  Edit as EditIcon,
  ErrorOutline as NotificationIcon,
  ExitToApp as LogOutIcon,
  Grade as StartIcon,
  Group as ConnectionsIcon,
  HelpOutline as HelpIcon,
  HighlightOff as CloseIcon,
  Home as HomeIcon,
  HomeOutlined as HomeOutlinedIcon,
  House as HouseIcon,
  Info as InfoIcon,
  LockOpen as LockIcon,
  Message as MessageIcon,
  MoreVert as MoreVertIcon,
  MoreHoriz as MoreHorizIcon,
  MeetingRoom as DoorIcon,
  NotificationsActive as BellIcon,
  Person as PersonIcon,
  PersonAdd as PersonAddIcon,
  PersonAddDisabled as PersonAddDisabledIcon,
  PersonAddOutlined as PersonAddOutlinedIcon,
  Publish as UploadIcon,
  Save as SaveIcon,
  Search as SearchIcon,
  Settings as SettingsIcon,
  SortByAlpha as SortAlphaIcon,
  Remove as MinusIcon,
} from '@material-ui/icons'
