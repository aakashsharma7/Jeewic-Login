export function TableLegend(
  {
    statuses
  }: Readonly<{
    statuses: {
      name: string;
      color: string;
    }[];
  }>
) {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {statuses.map((status) => (
        <div key={status.name} className="flex items-center px-2 border-2 py-1 rounded-md">
          <span className={`inline-block w-3 h-3 rounded-full ${status.color} mr-2`}></span>
          <span className="text-sm text-gray-600">{status.name}</span>
        </div>
      ))}
    </div>
  );
}