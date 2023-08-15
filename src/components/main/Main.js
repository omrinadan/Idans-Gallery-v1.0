import * as React from "react";
import { useEffect, useState } from "react";
import './main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Row, Col, Container} from "react-bootstrap";
import PicList from "./picList/PicList";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

function Main() {

    const [_, set_] = useState(1);
    const [pics, setPics] = useState([]);
    const [thePic, setThePic] = useState('');
    const [newIMG, setNewIMG] = useState('');
    const [picsForDel, setPicsForDel] = useState([]);


    

    const GetApiData = async () => {
        const response = await fetch(
          "https://picsum.photos/v2/list"
        ).then((response) => response.json());
        let data = []
        response.forEach(element => {
            element.isChecked = false;
            data.push(element);
        });
        setPics(data);
        

      };

    
    const handleClick = (piccc) => {
        setThePic(piccc);
    };
 
    const delClick = (i) => {
        let y = pics;
        y.splice(i,1);
        setPics(y);
        set_(Math.random()*2);
    };

    const delManyClick = (event,piccc,i) => {
        
        if (event.target.checked) {
            let z = picsForDel;
            z.push(JSON.parse(event.target.value));
            setPicsForDel(z);
            console.log('✅ Checkbox is checked');
          } else {
            console.log('⛔️ Checkbox is NOT checked');
            let c = picsForDel;
            c.splice(c.indexOf(piccc), 1);
            setPicsForDel(c);
          }
    };

    const deleteMany = () => {
        let v = pics;
        console.log(picsForDel);
        picsForDel.forEach(element => {
            v.splice(v.indexOf(element), 1);
        })

        setPics(v);
        console.log(v);
        
        setPicsForDel([]);
        
        console.log(picsForDel)
        set_(Math.random()*2);

    };

    const upLoadIMG = () => {
        let x = pics;
        x.push({download_url:newIMG})
        setPics(x);
        console.log(pics);
        set_(Math.random()*2);

    };
  
    useEffect(() => {
      GetApiData();
    }, []);

    return (
        <>
            <Container>
                <Row className="text-center m-5"><strong><u><h1>Title For Gallery</h1></u></strong></Row>
                <Row>
                    <Col lg={5} md={4} sm={4} xs={4}>
                            {pics.map((piccc,i) => {
                                return (
                                    <div className="col-lg-6">
                                    <PicList  key={'PicList'+i} piccc={piccc} i={i} pics={pics} onShowClick={handleClick} delClick={delClick} delManyClick={delManyClick} />    
                                    </div>
                                    )
                                })}
                                </Col>
                    <Col lg={6} md={6} sm={8} xs={8} className="position-fixed pt-2 theCol">
                        <img src={thePic} className="img-fluid" />
                        <h3>To Upload Image Please Enter An url</h3>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Enter url Here"
                            className="mb-3"
                            >
                            <Form.Control 
                            className='floatingPadding'
                            type="text"
                            // required='true' 
                            onChange={(e) => {
                                setNewIMG(e.target.value);
                            }}
                            placeholder="User Name" />
                        </FloatingLabel>
                        <Button onClick={upLoadIMG}>Upload</Button>
                        <Button className="btn-danger" onClick={() => deleteMany()}>Delete All Checked Pictures</Button>
                    </Col>
                </Row>
                <Row><br/><br/><br/><br/></Row>
            </Container>
        </>
    );
}


export default Main;