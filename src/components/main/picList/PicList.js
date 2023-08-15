import * as React from "react";
import { useState } from "react";
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './picList.css';
import { Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';


function PicList({i, piccc, onShowClick, delClick, delManyClick}) {

    const [isChecked, setIsChecked] = useState(false);

    

    const fun = (event,piccc,i) => delManyClick(event,piccc,i);
    const twoFunk = (event,piccc,i) => {
        if (isChecked === false) {
            setIsChecked(true)
        } else {
            setIsChecked(false)
        }
        fun(event,piccc,i);
    };

    return (
        <>
            
                    <div  className="d-flex mt-2" key={'k'+i} >
                        <div >
                            <Button className="btn-danger X btn-sm" onClick={() => delClick(i)}><FontAwesomeIcon className="B" icon={faDeleteLeft} rotation={180} /></Button>
                            <br/><br/><br/>
                            <Form>
                                <div key={`default-checkbox`+i+i} className="mb-3">
                                    <Form.Check 
                                        type='checkbox'
                                        id={`default-checkbox`+i}
                                        value={JSON.stringify(piccc)}
                                        checked={piccc.isChecked === false ? isChecked :false}                 
                                        onChange={(event,piccc,i) => twoFunk(event,piccc,i)}
                                    />
                                </div>
                            </Form> 
                        </div>
                        <img onClick={() => onShowClick(piccc.download_url)} src={piccc.download_url} className="img-fluid m-1"></img>
                    </div>
        </>
    )
}

export default PicList;