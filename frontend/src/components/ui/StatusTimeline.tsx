import type { PackageStatusHistory } from "../../services/packageServices";
import { formatDate } from "../../utils/formatDate";
import { Chrono } from "react-chrono";

type StatusTimelineProps = {
  data: PackageStatusHistory[];
};

const StatusTimeline = ({ data }: StatusTimelineProps) => {
  const items = data.map((item) => ({
    cardTitle: item.status,
    cardSubtitle: formatDate(new Date(item.timestamp)),
  }));

  return (
    <div className="w-full, h-fit border-t-2 border-slate-600">
      <Chrono
        items={items}
        mode="VERTICAL"
        hideControls={true}
        cardHeight={40}
        cardWidth={140}
      />
    </div>
  );
};

export default StatusTimeline;
