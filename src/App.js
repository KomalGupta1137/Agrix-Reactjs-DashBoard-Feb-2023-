import { HashRouter, Route, Routes } from "react-router-dom";
import ClusterEdit from "./views/cluster/ClusterEdit";
import ClusterList from "./views/cluster/ClusterList";
import ClusterRegister from "./views/cluster/ClusterRegister";
import ClusterView from "./views/cluster/ClusterView";
import Dashboard from "./views/dashboard/Dashboard";
import DeviceManagement from "./views/device/DeviceManagement";
import DriverEdit from "./views/driver/DriverEdit";
import DriverList from "./views/driver/DriverList";
import DriverRegister from "./views/driver/DriverRegister";
import DriverView from "./views/driver/DriverView";
import FarmerEdit from "./views/farmer/FarmerEdit";
import FarmerList from "./views/farmer/FarmerList";
import FarmerRegister from "./views/farmer/FarmerRegister";
import FarmerView from "./views/farmer/FarmerView";
import Login from "./views/login/Login";
import PlotEdit from "./views/plot/PlotEdit";
import PlotList from "./views/plot/PlotList";
import PlotRegister from "./views/plot/PlotRegister";
import PlotView from "./views/plot/PlotView";
import CropType from "./views/settings/CropType";
import Settings from "./views/settings/Settings";
import MachineList from "./views/machine/MachineList";
import MachineRegister from "./views/machine/MachineRegister";
import MachineView from "./views/machine/MachineView";
import MachineEdit from "./views/machine/MachineEdit";
import FarmersList from "./views/operationhistory/FarmersList"
import BingMap from "./views/bingmap/BingMap";

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/device-management" element={<DeviceManagement/>}/>

          {/* CLuster */}
          <Route path="/cluster" element={<ClusterList />} />
          <Route path="/cluster-register" element={<ClusterRegister />} />
          <Route path="/cluster-view/:clusterId" element={<ClusterView />} />
          <Route path="/cluster-edit/:clusterId" element={<ClusterEdit />} />

          {/* Farmer */}
          <Route path="/farmer" element={<FarmerList />} />
          <Route path="/farmer-register" element={<FarmerRegister />} />
          <Route path="/farmer-view/:farmerId" element={<FarmerView />} />
          <Route path="/farmer-edit/:farmerId" element={<FarmerEdit />} />


          {/* Plot */}
          <Route path="/plot/:farmerId" element={<PlotList />} />
          <Route path="/plot-register/:farmerId" element={<PlotRegister />} />
          <Route path="/plot-view/:plotId" element={<PlotView />} />
          <Route path="/plot-edit/:plotId" element={<PlotEdit />} />

          {/* Driver */}
          <Route path="/driver" element={<DriverList />} />
          <Route path="/driver-register" element={<DriverRegister />} />
          <Route path="/driver-view/:driverId" element={<DriverView />} />
          <Route path="/driver-edit/:driverId" element={<DriverEdit/>} />

            {/*Machine*/}
            <Route path="/machine" element={<MachineList/>}/>
            <Route path="/machine-register" element={<MachineRegister/>}/>
            <Route path="/machine-view/:machineId" element={<MachineView/>}/>
            <Route path="/machine-edit/:machineId" element={<MachineEdit/>}/>
          {/* CropType */}
          <Route path="/croptype" element={<CropType/>}/>
          
           {/*Settings*/}
           <Route path="/settings" element={<Settings/>}/>

           {/*Operation History*/}
           <Route path="/history" element={<FarmersList/>}/>

          <Route path="/bingmap" element={<BingMap/>}/>
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
