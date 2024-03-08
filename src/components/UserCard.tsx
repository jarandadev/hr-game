import { Icon } from "./ui/Icon";

interface Props {
  user?: User;
}

export const UserCard = ({ user }: Props) => {
  return (
<div className="border rounded-lg h-12 bg-white flex items-center p-3">
  {user && (
    <div className="flex gap-2">
      {user.isHost ?<Icon.Crown /> : <Icon.User />}
      <p>{user.name}</p>
    </div>
  )}
</div>
  )
}
