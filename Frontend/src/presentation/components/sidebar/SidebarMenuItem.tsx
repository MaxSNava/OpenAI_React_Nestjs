import { NavLink } from "react-router-dom";
import { CodeBracketSquareIcon } from '@heroicons/react/24/solid'

interface SidebarMenuItemProps {
  to: string;
  title: string;
  description: string;
}

export const SidebarMenuItem = ({option}: {option: SidebarMenuItemProps}) => {
  return (
    <NavLink 
      className={ ( {isActive} ) => 
        isActive 
          ?'flex flex-col justify-between items-start bg-gray-800 rounded-md p-2 transition-colors' 
          :'flex flex-col justify-between items-start hover:bg-gray-800 rounded-md p-2 transition-colors'}
      to={option.to} 
    >
      <div>
        <CodeBracketSquareIcon className="size-6 text-indigo-400" /> 
      </div>
      <div className="flex flex-col gap-x-3">
        <span className="text-base text-white font-semibold"> {option.title} </span>
        <span className="text-sm text-gray-400 "> {option.description} </span>
      </div>
    </NavLink>
  )
}
