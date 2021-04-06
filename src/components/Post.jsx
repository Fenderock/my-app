import React from "react";

export class Post extends React.Component{
    constructor(props) {  // 1
        super(props);
        this.state = {
            title: "",
            text: "",
            date_add: "",
            autor: ""
        }
    }

    componentDidMount() { // 3
        const formData = new FormData();
        formData.append("id",this.props.match.params.id);
        fetch("http://fenderox.beget.tech/php/getPost.php",{
            method: "POST",
            body: formData
        }).then(response=>response.json())
            .then(result=>{
                this.setState({
                    title: result.title,
                    text: result.text,
                    date_add: result.date_add,
                    autor: result.autor
                })
            })
    }

    render() { // 2
        return <div>
            <h1 className="text-center">{this.state.title}</h1>
            <p>{this.state.text}</p>
            <p>Добавлено: {this.state.date_add}</p>
            <p>Автор: {this.state.autor}</p>
        </div>
    }
}