import type { PackageStatusHistory } from "../../services/packageServices";
import { formatDate } from "../../utils/formatDate";

function StatusWithTimestamps({ data }: { data: PackageStatusHistory[] }) {
  return (
    <div className="flex flex-col gap-0 text-xs my-4">
      {data.map((item) => {
        const formattedTimestamp = formatDate(new Date(item.timestamp));

        return (
          <span key={item.id}>{`${item.status} - ${formattedTimestamp}`}</span>
        );
      })}
    </div>
  );
}

export default StatusWithTimestamps;
