const EmptyState = () => {
  return (
    <div
      className="
        px-4
        py-8
        sm:px-6
        lg:px-8
        h-full
        bg-gray-200
        flex
        justify-center
        items-center
      "
    >
      <div
        className="
          text-center
          flex
          justify-center
          flex-col
        "
      >
        <h3 className="font-semibold">
          Select a chat or start a new conversation
        </h3>
      </div>
    </div>
  );
};

export default EmptyState;
