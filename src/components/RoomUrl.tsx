import { useState } from "react";
import { Input } from "./ui/Input";
import { Icon } from "./ui/Icon";

interface Props {
  roomUrl: string
}

export const RoomUrl = ({roomUrl }: Props) => {
  const [copied, setCopied] = useState(false);

  const copyRoomUrl = () => {
    if (!roomUrl) return;
    navigator.clipboard.writeText(roomUrl);
    setCopied(true);
  }

  return (
    <div className="relative">
      <Input value={roomUrl} className="border p-2 rounded-xl w-full" disabled />
      {!copied ? (
        <Icon.Clipboard className="absolute cursor-pointer right-2.5 top-2.5" onClick={copyRoomUrl} />
      ) : (
        <Icon.ClipboardCheck className="absolute cursor-pointer right-2.5 top-2.5" onClick={copyRoomUrl} />
      )}
    </div>
  )
}
