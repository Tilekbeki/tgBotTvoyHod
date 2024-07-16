import "./createPrize.scss";
import React, { useState } from "react";
import MyBackEnd from "../../services/botServices";

const CreatePrize = (props) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [status, setStatus] = useState("promo");
    const {goalId,userId} = props
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };
    const myBackEndInstance = new MyBackEnd();
    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    const handleSubmit = async () => {
        if (selectedFile) {
            const reader = new FileReader();
            reader.readAsArrayBuffer(selectedFile);

            reader.onload = async () => {
                const byteArray = new Uint8Array(reader.result);
                const content = Array.from(byteArray).map(byte => String.fromCharCode(byte)).join('');
                const base64Content = btoa(content);
                
                // const response = await fetch('http://localhost:3000/prize', {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json'
                //     },
                //     body: JSON.stringify({
                //         type: status,
                //         content: base64Content
                //     })
                // });

                // if (response.ok) {
                //     alert('Файл успешно отправлен!');
                // } else {
                //     alert('Ошибка при отправке файла');
                // }

                myBackEndInstance.createPrize(userId, goalId, status, base64Content).then(()=>{alert('Приз создан, перезагрузите страницу!')});
            };

            reader.onerror = () => {
                alert('Ошибка при чтении файла');
            };
        } else {
            alert('Пожалуйста, выберите файл');
        }
    };

    return (
        <div className="create-prize">
            <select name="status" onChange={handleStatusChange}>
                <option>promo</option>
                <option>link</option>
                <option>file</option>
                <option>another</option>
            </select>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleSubmit}>СОЗДАТЬ</button>
        </div>
    );
};

export default CreatePrize;
