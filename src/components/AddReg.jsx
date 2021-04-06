import React from 'react';
import {Redirect} from "react-router-dom";

export class AddReg extends React.Component{
    constructor() {
        super();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.sendForm = this.sendForm.bind(this);
        this.state = {
            title:"",
            text:"",
            autor:"",
            info: "",
            redirect: false,
            submitBtn: "disabled"
        }
    }
    sendForm(event){
        event.preventDefault();
        if(this.state.info === ""){
            const formData = new FormData();
            formData.append("email",this.state.email);
            formData.append("pass",this.state.pass);

            fetch("http://fenderox.beget.tech/php/handlerReg.php",{
                method: "POST",
                body: formData
            }).then(response=>response.json())
                .then(result=>{
                    this.setState({
                        redirect: true
                    })
                })
        }
    }

    handleInputChange(event){
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]:value
        })
        if (name === "email"){
            if (value === "") {
                this.setState({submitBtn: "disabled"});
                return;
            }
            const formData = new FormData();
            formData.append("email",value);
            fetch("http://fenderox.beget.tech/php/checkEmail.php",{
                method: "POST",
                body: formData
            }).then(response=>response.json())
                .then(result=>{
                    if(result.result === "exist"){
                        this.setState({
                            info: "Такой Email уже существует!",
                            submitBtn: "disabled"
                        })
                    }else{
                        this.setState({
                            info: "",
                            submitBtn: "",
                        })
                    }
                });
        }
    }
    render() {
        if(this.state.redirect)
            return <Redirect to="/" />
        else
            return <div className="col-md-5 my-5 mx-auto">
                <h1 className="text-center my-3">Регистрация</h1>
                <form onSubmit={this.sendForm}>
                    <div className="mb-3">
                        <input value={this.state.email} onChange={this.handleInputChange} name="email" type="email" className="form-control" placeholder="Email"/>
                        <p style={{color:"red"}}>{this.state.info}</p>
                    </div>
                    <div className="mb-3">
                        <textarea value={this.state.pass} onChange={this.handleInputChange} name="text" type="text" className="form-control" placeholder="пароль"/>
                    </div>

                    <div className="mb-3">
                        <input type="submit" disabled={this.state.submitBtn}  className="form-control btn btn-primary" value="Добавить"/>
                    </div>
                </form>
            </div>
    }
}

