import React, { Component } from 'react';
import axios from 'axios';

class Upload extends Component {

    constructor(props) {

        super(props);

          this.state = {

            message: '',
            selectedFile: null,
            uploaded: false,
            fileName: '',
            filePath: null,
            Src: ''
        }
    }

    componentDidMount() {

        console.log( this.state.message );

        axios.get('/s') 
            .then( (res) => {

                alert(`Connecting to Server`);
                this.setState({ message : res.data });
                console.log( this.state.message );
            });
    };

    chooseVideo = ( e ) => {

        this.setState({

            selectedFile : e.target.files[0]
        });
    }       

    clickToUpload = () => {

        const data = new FormData();
        data.append( 'file', this.state.selectedFile );

        axios.post( '/ss', data, {})
            .then( res => {
                
                if( res.status === 200 ) {

                    this.setState({ uploaded : true});
                    console.log( this.state.uploaded );
                    alert( `${ res.status } - ${res.statusText} : Uploaded Succesfully`);
                    this.setState({ fileName : res.data.originalname });
                    console.log( this.state.fileName );
                }
            })
            .catch( err => console.log(err) );  
        document.getElementsByTagName("input").value = null;
    };

    clickToPlay = () => {
        
        if( this.state.uploaded === true ) {        

            alert( `requesting video from Server...` );

            /*axios.post( '/sss', { filename : this.state.fileName } ) 
            .then( res => {
                
                this.setState({ filePath : res.data }) ;
                console.log( this.state.filePath );
            }) */

            this.setState({ Src : "http://localhost:4001/video" });
            console.log( this.state.Src );

            document.getElementById('v').load();
        }

        else {

            alert("First Upload the file..");
        }
    };

    render() {
        return (
            <div>
                
                <h4> If server is connected a message will be shown: </h4> 
                <h1> { this.state.message } </h1> <br/>
                <input type = "file" id = "FileUpload" onChange = { this.chooseVideo } multiple/> 
                <button type = "button" id = "buttonUpload" onClick = { this.clickToUpload } > Upload Video </button> <br/> <br/>
                <h4>Uploaded Video File: <b><i><u> { this.state.fileName } </u></i></b></h4>        
                <button type = "button" id ="buttonPlay" onClick = { this.clickToPlay } > Play Video </button> <br/>
                <br/>
                <video width = "320" height = "200" id = "v" controls loop >
                    <source src = {this.state.Src} type = "video/mp4"/>
                </video>
                
            </div>
        )
    }
}

export default Upload;
