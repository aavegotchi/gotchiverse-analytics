

import React from "react";
import ToggleButton from "./ToggleButton";



const datas : dataObject[] = [
    {
    title: "Tiles Minted",
    dataField: "tilesMinted",
    },
    {
        title: "Installations Upgraded Total",
        dataField: "installationsUpgradedTotal",
    },
    {
        title: "Gltr Burned",
        dataField: "gltrSpendTotal"
    },
    {
        title: "Alchemica Events Channelled",
        dataField: "countChannelAlchemicaEvents"
    },
    {
        title: "Installation Types",
        dataField: "countInstallationTypes"
    },
    {
        title: "Parcel Installations",
        dataField: "countParcelInstallations"
    },
    {
        title: "Upgrades Initiated",
        dataField: "countUpgradesInitiated"
    },
    {
        title: "GLTR Spent on Crafts",
        dataField: "gltrSpendOnCrafts"
    },
    {
        title: "GLTR Spent Total",
        dataField: "gltrSpendTotal"
    }


];


interface dataObject {
    title: string;
    dataField : string;
}



type setPropsType = {
    graphObject: dataObject;
    setGraphObject: React.Dispatch<React.SetStateAction<dataObject>>
}



function GraphSetButtons({graphObject, setGraphObject}: setPropsType) {


    console.log(datas, "datas here");
    // datas.map((data, index) => {
    //     console.log(data, index, 'Mapping');
    // })
    return (
        <div className = "wrapper" 
        >
            {
                datas.map((data, index) => {

                    return (
                        <div key = {index} >
                            {
                            graphObject && 
                            <ToggleButton 
                            title = {data.title} 
                            dataField = {data.dataField}
                            graphObject = {graphObject}
                            setGraphObject = {setGraphObject}
                        
                            />
                            }
                        </div>
                    )
                    
                })
            }



            <style jsx>
                {`

                .wrapper {

                    color: black;

                    border: 1px solid black;
                    width: 100%;
                    height: 100%;
                    
                    
                }


                `}

            </style>

        </div>

    )
}




export default GraphSetButtons;