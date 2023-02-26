import React, { memo, useEffect, useMemo, useState } from "react";
import {
  AzureMap,
  AzureMapDataSourceProvider,
  AzureMapFeature,
  AzureMapLayerProvider,
  AzureMapsProvider,
  IAzureMapOptions,
  AzureMapPopup,
  IAzureMapFeature
} from "react-azure-maps";
import {
  AuthenticationType,
  data,
  MapMouseEvent,
  PopupOptions
} from "azure-maps-control";
import { key } from "./Key";
import authHeader from "../../services/auth-header";
// import { carData } from "./Data";

export default function App() {
  return (
    <div >
      <Marker />
    </div>
  );
}

const renderPoint = (data) => {
  return (
     <AzureMapFeature
      key={data.location}
      id={data.location}
      type="Point"
      
      // coordinate={data}
      coordinate={[data.long, data.latitude]}
      properties={{
        id: data.location,
        popUpProp: data
      }}
    />
  );
};

const Marker = () => {
  const [mapData, setMapData] = useState([]);
  // const [mapData, setMapData] = useState([...points]);
  const [popupOptions, setPopupOptions] = useState({});
  const [popupProperties, setPopupProperties] = useState({});
  const BaseUrl=process.env.REACT_APP_SERVER_URL
  const farmerId='63086a9c8db30018f994d649'

    useEffect(() => {
    fetch(`${BaseUrl}/api/plot/${farmerId}`, {
      method: 'GET',
      headers: authHeader()
    }).then((plotData) => {
      plotData.json().then((data) => {
        setMapData(data);
      })
    })
  }, [])

 
  
  const option = useMemo(() => {
    return {
      authOptions: {
        authType: AuthenticationType.subscriptionKey,
        subscriptionKey: key
      },
      center: [7, 51],
      zoom: 5,
      view: "Auto"
    };
  }, []);

  const memoizedMarkerRender = useMemo(
    () => mapData.map((el) => renderPoint(el)),
    [mapData]
  );
  return (
    <>
      <AzureMapsProvider>
        <div style={{ height: "600px" }}>
          <AzureMap options={option}>
            <AzureMapDataSourceProvider
              id={"MultiplePoint AzureMapDataSourceProvider"}
            >
              <AzureMapLayerProvider
                id={"MultiplePoint AzureMapLayerProvider"}
                options={{
                  iconOptions: {
                    image: "pin-blue"
                  }
                }}
                events={{
                  mousemove: (e) => {
                    if (e.shapes && e.shapes.length > 0) {
                      const prop = e.shapes[0];

                      // Set popup options
                      setPopupOptions({
                        ...popupOptions,
                        position: new data.Position(
                          prop.data.geometry.coordinates[0],
                          prop.data.geometry.coordinates[1]
                        ),
                        pixelOffset: [0, -18]
                      });

                      if (prop.data.properties)
                        // Set popup properties from Feature Properties that are declared on create Feature
                        setPopupProperties({
                          ...prop.data.properties.popUpProp
                        });
                    }
                  }
                }}
                type="SymbolLayer"
              />
              {memoizedMarkerRender}
            </AzureMapDataSourceProvider>
            <AzureMapPopup
              isVisible={true}
              options={popupOptions}
              popupContent={
                <div style={{ padding: "32px 22px" }}>
                  <h3>{popupProperties.state}</h3>
                  <p>{popupProperties.location}</p>
                  <p> <h5>FarmerId:{popupProperties.farmerId}</h5></p>
                </div> // Inject your JSX
              }
            />
          </AzureMap>
        </div>
      </AzureMapsProvider>
    </>
  );
};

