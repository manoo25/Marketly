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
            <div className="row g-4">
                <div className="col-xl-8">
                    <TableSection/>
                </div>
                <div className='col-xl-4'>
                    <ActivityFeed/>
                </div>
            </div>
        </div>
      
     );
}

export default Charts;