import React from "react";
import { Button, Dropdown} from 'react-bootstrap'
import { useState, useEffect } from "react";

export default function Home(props) {

    const [message, setMessage] = useState('');
    const [sender, setSender] = useState([]);
    const [receiver, setRecipient] = useState('');
    const [receiverList, setReceiverList] = useState([])


    useEffect(() => {
        
        setSender([{'id': props.uid, 'name': props.uname}]);

    }, []);

    const  senders  = sender;

    let senderList = senders.length > 0
    	&& senders.map((item, i) => {
      return (
        <Dropdown.Item key={i} value={item.id}>{item.name}</Dropdown.Item>
      )
    }, this);


    function handleSendMessage() {
        
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Access-Control-Request-Method': 'POST'
            , 'Access-Control-Request-Headers': '*'},
            body: JSON.stringify({ 
                'sender': sender.name,
                'receiver': receiver,
                'message': message
              })
        };

        fetch('https://3qtp6ozrn9.execute-api.us-east-2.amazonaws.com/default/sendMessage', requestOptions)
        .then(response => {
            if (!response.ok) {
                
                const error = "There was some problem in the request. Please try again."
                return Promise.reject(error);
            }
            return response.json()
        })
        .then(data => {

            console.log(data)
            console.log(data.messageID)

            
        })
        .catch(error => {
            console.error('There was an error!', error);
            alert(error)
        });
    


    }

    function handleMessageChange(e) {

        setMessage(e.target.value)

    }


    function handleSenderList(e) {

        setSender(e.target.innerHTML)

    }

    function handleReceivers(e) {

        setRecipient(e.target.innerHTML)

    }

    function handleReceiversDropdownClicked() {

        const requestOptions = {
            method: 'GET',
            headers: { 'Access-Control-Request-Method': 'GET'
            , 'Access-Control-Request-Headers': '*'}
        };

        fetch('https://0zteh29zqg.execute-api.us-east-2.amazonaws.com/default/getRecipients', requestOptions)
        .then(response => {
            // check for error response
            if (!response.ok) {
                // get error message from body or default to response statusText
                const error = "There was some problem in the request. Please try again."
                return Promise.reject(error);
            }
            return response.json()
        })
        .then(data => {
            if (data.body!==undefined) {
                let recipients = JSON.parse(data.body);
                setReceiverList(recipients);
            }
            else {
                throw "Could not retrieve recipient list";
            }
        })
        .catch(error => {
            console.error('There was an error!', error);
            alert(error)
        });

    }

    const  recipients  = receiverList;

    let recipientsList = recipients.length > 0
    	&& recipients.map((item, i) => {
      return (
        <Dropdown.Item key={i} value={item.emailAddress} onClick={handleReceivers}>{item.displayName}</Dropdown.Item>
      )
    }, this);


    function displaySenderReceiverSelected() {
        if (receiver.name != '' || typeof receiver.name === 'undefined') {
            //alert('true'+receiver.name+'ello')
            return (props.uname + ' - ' + receiver.name)
        }
    }
    

    return(
        <div>
            <div className="p-5 ml-lg-3" align="left">
                    <div className="left marginborder shadow-lg p-3 mb-5 bg-white rounded"><b><h4>Send Message</h4></b>
                    <div className="row" style={{ 'paddingLeft': 17, 'paddingTop':10}}>
                    
  
                        <div className="col-xs-6">
                            <Dropdown >
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                    Sender
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {senderList}
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <div className="col-xs-6">
                            <Dropdown onClick={handleReceiversDropdownClicked}>
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                    Recipient
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {recipientsList}
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div className="col-xs-6">
                            <div className = "col-xs-6">
                                Send Message To : 
                            </div>
                            <div className = "col-xs-6">
                                {receiver}
                            </div>
                        </div>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {/* <div className="col-xs-6">
                            <Dropdown>
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                    Time
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    
                                </Dropdown.Menu>
                            </Dropdown>
                        </div> */}
                        {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <div className="col-xs-6">
                            <Dropdown>
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                    Place
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <div className="col-xs-6">
                            <Dropdown>
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                    Key
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    
                                </Dropdown.Menu>
                            </Dropdown>
                        </div> */}
                        
                    </div>
                    &nbsp;&nbsp;
                    
                    

                    <div className="form-group" style={{ 'paddingBottom': 10}}>
                        <input type="text" className="form-control" id="usr" placeholder="Enter the message..." onChange={handleMessageChange}/>
                    </div>
                        
                    
                        <Button variant="success" type="submit" onClick={handleSendMessage}>
                            Send Message
                        </Button>
                </div>
            </div> 
        </div>    

    ); 
}