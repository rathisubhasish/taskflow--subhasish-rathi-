import { useState, useEffect } from "react";
import Popover from "./ui/Popover";
import { useUsers } from "../hooks/useUsers";

type Props = {
  open: boolean;
  anchorRef: React.RefObject<HTMLElement>;
  onClose: () => void;
  onSelectUser?: (userId: string) => void;
};

const UserPopover: React.FC<Props> = ({
  open,
  anchorRef,
  onClose,
  onSelectUser,
}) => {
  const { users, loading, error } = useUsers();
  const [search, setSearch] = useState("");
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (open && anchorRef.current) {
      const rect = anchorRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }

    if (!open) {
      setSearch("");
    }
  }, [open, anchorRef]);

  const filteredUsers = users?.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Popover
      open={open}
      onClose={onClose}
      className="absolute w-[20rem] bg-white border border-gray-200 rounded-xl shadow-lg z-[9999]"
      style={{
        top: position.top,
        left: position.left,
      }}
    >
      <div className="p-2 flex flex-col gap-2">
        <input
          type="text"
          placeholder="Search user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-2 py-1 text-sm border rounded"
        />

        <div className="max-h-40 overflow-y-auto">
          {loading && <p className="text-xs">Loading...</p>}
          {error && <p className="text-xs text-red-500">Error loading users</p>}

          {!loading && filteredUsers?.length === 0 && (
            <p className="text-xs text-gray-400">No users found</p>
          )}

          {filteredUsers?.map((user) => (
            <div
              key={user.id}
              className="text-sm px-2 py-1 rounded hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onSelectUser?.(user.id);
                onClose();
              }}
            >
              <div className="flex gap-2 items-center">
                <div className="w-6 h-6 bg-blue-400 rounded-full" />
                <div>
                  <p>{user.name}</p>
                  <p className="text-xs">{user.email}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Popover>
  );
};

export default UserPopover;
