
interface dataObject {
    title: string;
    dataField : string;
}


interface ToggleButtonProps {
    title : string;
    dataField: string;
    graphObject: dataObject; 
    setGraphObject: React.Dispatch<React.SetStateAction<dataObject>> 
}


function ToggleButton({title, dataField, graphObject, setGraphObject} : ToggleButtonProps ) {


    return (
        <div className = "wrapper">
            <button className = "button" onClick = {() => {
                setGraphObject({
                    title: title,
                    dataField: dataField,
                })
            }}>{title}</button>
            
            <style jsx>
                {`


                .button {
                    box-sizing: border-box;
                    width: 95%;
                    height: 45px;
                    flex: 1;
                    margin: 5px;
                    background: #B8B8B8;
                    border: 1px solid #111111;
                    box-shadow: 4px 4px 0px #000000;
                    text-align: center;
                    color: black;
                    font-size: 22px;
                    line-height: 20.44px;
                    font-weight: 400;
                    transition: 0.5s;
                    padding: 2px;
                  }

                  .button:disabled {
                    background-color: #CF15F9;
                    pointer-events: none;
                    color: white;
                  }
        
                  .button:hover {
                    background: #04b6bc;
                    color: #6d18f8;
                    transition: 0.2s ease-in-out;
                  }


                `}
            </style>
        </div>
    )
}


export default ToggleButton;