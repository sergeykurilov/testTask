import React, {ChangeEvent, useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";
import {Checkbox, Input, Button} from "antd";
import 'antd/dist/antd.css';
import {CheckboxChangeEvent} from "antd/es/checkbox";
function App() {
  const [name, setName] = useState([])

   type UserType =  {
      name: string
       lastname: string
       age: number
       sex: string
   }

  useEffect(() => {
    axios.get("https://venbest-test.herokuapp.com/")
        .then((res) => setName(res.data))
  },[])

    const [searchTerm, setSearchTerm] = React.useState<string>("");

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    let arraytoDisplay = name
    if(searchTerm){
        arraytoDisplay = arraytoDisplay.filter((person:UserType) =>
            person.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }


    const [searchTermByAge, setSearchTermByAge] = React.useState<string>("");

    const handleChangeByAge = (e:ChangeEvent<HTMLInputElement>) => {
        setSearchTermByAge(e.target.value);
    };



    if(searchTermByAge){
        arraytoDisplay = arraytoDisplay.filter((person:UserType) =>{
            return String(person.age).includes(searchTermByAge)
        }
        );
    }

    const [searchTermBySurname, setSearchTermSurname] = React.useState<string>("");

    const handleChangeSurname = (e:ChangeEvent<HTMLInputElement>) => {
        setSearchTermSurname(e.target.value);
    };

    if(searchTermBySurname){
        arraytoDisplay = arraytoDisplay.filter((person:UserType) =>
            person.lastname.toLowerCase().includes(searchTermBySurname.toLowerCase())
        );
    }


    if(searchTermBySurname){
        arraytoDisplay = arraytoDisplay.filter((person:UserType) =>
            person.lastname.toLowerCase().includes(searchTermBySurname.toLowerCase())
        );
    }

    const [searchTermByFemale, setSearchByFemale] = React.useState<boolean>(true);

    if(!searchTermByFemale){
        arraytoDisplay = arraytoDisplay.filter((person:UserType) =>
            person.sex.includes("f")
        );
    }


    const [searchTermByMale, setSearchByMale] = React.useState<boolean>(true);

    if(!searchTermByMale){
        arraytoDisplay = arraytoDisplay.filter((person:UserType) =>
            person.sex.includes("m")
        );
    }

    const onChangeGenderFemale = (e:CheckboxChangeEvent) => {
        setSearchByFemale(e.target.checked);
    }


    const onChangeGenderMale = (e:CheckboxChangeEvent) => {
        setSearchByMale(e.target.checked);
    }


  return (
    <div className="App">
        <table className={"table"}>
            <tr>
                <td>
                    <Input
                        type="text"
                        placeholder="Search by Name"
                        value={searchTerm}
                        onChange={handleChange}
                    />
                </td>
                <td>
                    <Input
                        type="text"
                        placeholder="Search by LastName"
                        value={searchTermBySurname}
                        onChange={handleChangeSurname}
                    />
                </td>
                <td>
                    <Input
                        type="text"
                        placeholder="Search by Age"
                        value={searchTermByAge}
                        onChange={handleChangeByAge}
                    />
                </td>
                <td>
                    <label className={"label"}>
                        <Checkbox type="checkbox" checked={searchTermByFemale} onChange={onChangeGenderFemale}/>male
                    </label>

                    <label className={"label"}>
                        <Checkbox type="checkbox" checked={Boolean(searchTermByMale)} onChange={onChangeGenderMale}/>female
                    </label>
                </td>
            </tr>
            {arraytoDisplay.map((item:UserType) => (
                <tr>
                    <td>{item.name}</td>
                    <td>{item.lastname}</td>
                    <td>{item.age}</td>
                    <td>{item.sex}</td>
                </tr>
            ))}
        </table>


    </div>
  );
}

export default App;
