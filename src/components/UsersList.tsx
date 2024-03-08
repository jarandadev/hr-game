import { MAX_PLAYERS } from "@/config/app"
import { UserCard } from "./UserCard"

interface Props {
  users: User[]
}

export const UsersList = ({ users }: Props) => {
  const emptySpaces = MAX_PLAYERS - users.length
  return (
    <div>
      <div className="grid grid-cols-2 gap-2">
        {users.map((user, i) => <UserCard user={user} key={i}/>)}
        {Array.from({ length: emptySpaces }).map((_, i) => <UserCard key={i}/>)}
      </div>
    </div>
  )
}
