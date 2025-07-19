import ActivityFeed from "../Components/ChartsComponents/ActivityFeed";
import ChartSection from "../Components/ChartsComponents/ChartSection";
import StatsGrid from "../Components/ChartsComponents/StatsGrid";
import TableSection from "../Components/ChartsComponents/TableSection";
import Loading from "../Components/globalComonents/loading";

function Charts() {
    return ( 
        <div className="pt-3 d-flex flex-column gap-4">
            <StatsGrid />
            <ChartSection />
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2">
                    <TableSection/>
                </div>
                <div>
                    <ActivityFeed/>
                </div>
            </div>
        </div>
      
     );
}

export default Charts;