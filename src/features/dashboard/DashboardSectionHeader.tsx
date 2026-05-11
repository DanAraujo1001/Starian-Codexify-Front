interface DashboardSectionHeaderProps {
  title: string;
  actionLabel?: string;
  onActionClick?: () => void;
}

const DashboardSectionHeader = ({
  title,
  actionLabel,
  onActionClick,
}: DashboardSectionHeaderProps) => {
  return (
    <div className="mb-4 flex flex-col gap-2 sm:mb-5 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-lg font-semibold text-text-primary sm:text-xl">
        {title}
      </h2>
      {actionLabel ? (
        <button
          type="button"
          onClick={onActionClick}
          className="self-start text-sm font-medium text-brand-primary transition-all duration-200 hover:text-brand-hover sm:self-auto"
        >
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
};

export default DashboardSectionHeader;
