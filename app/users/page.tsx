import EmptyState from "@/app/components/EmptyState";

const Users = () => {
  return (
    <div
      className="
        h-full
        hidden
        lg:block
        lg:pl-80
      "
    >
      <EmptyState />
    </div>
  );
};

export default Users;
