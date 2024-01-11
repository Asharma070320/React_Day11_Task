import React, { useCallback, useState } from 'react'
import './PasswordGen.css'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const PasswordGen = () => {


    const notify = (txt) => {
        toast.success(txt, {
            position: toast.POSITION.TOP_CENTER
          });
        }

        const error = (txt) =>{
            toast.error(txt, {
                position: toast.POSITION.TOP_CENTER
              });
        }

    let UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let LOWERCASE = "abcdefghijklmnopqrstuvwxyz"
    let NUMBERS = "0123456789"
    let SYMBOLS =  "@$*#"

    let[value,setValue] = useState(8);

    const getValue = (e) => {
        setValue(e.target.value)
    }

    let[upper,setUpper] = useState(false)
    const getUpperTxt = (e) =>{
        setUpper(e.target.checked)
    }

    let[lower,setLower] = useState(false)
    const getLowerTxt = (e) =>{
        setLower(e.target.checked)
    }

    let[num,setNum] = useState(false)
    const getNumbersTxt = (e) =>{
        setNum(e.target.checked)
    }

    let[symb,setSymb] = useState(false)
    const getSymbolsTxt = (e) =>{
        setSymb(e.target.checked)
    }



    let[password,setPassword] = useState("");

    const clickBtn = useCallback(() => {
        let takeValue ="";

        if(upper==false && lower==false && num==false && symb==false){
           error("Choose any one of them🤨")
        }else{

        if(upper){
            takeValue+=UPPERCASE;
        }
        if(lower){
            takeValue+=LOWERCASE;
        }
        if(num){
            takeValue+=NUMBERS;
        }
        if(symb){
            takeValue+=SYMBOLS;
        }
        display(takeValue);
    }
    });


    const display = (takeValue) => {
        // console.log(takeValue);
        let mixUp="";
        for(let i=0;i<value;i++){
            let randomIndex = Math.floor(Math.random()* takeValue.length);
            mixUp+= takeValue.charAt(randomIndex);
            // console.log(randomIndex);
        }
        setPassword(mixUp);
    }

    const copyTxt = () =>{
        if(password===""){
            error("There is nothing to copy..")
        }else{
        navigator.clipboard.writeText(password);
        notify("Successfully Copied😎")
        }
    }


// console.log(password);
  return (
    <div className='container'>
         <ToastContainer />
        <div className='miniContainer'>
            
            <h2 className='mid'>PassWord Generator</h2>

            <div className='inputContainer'>
                <label className='bold' htmlFor="">PassWord :-</label>
                <input className='inputSet' value={password} type="takeValue" disabled />
                <i onClick={copyTxt} className="ri-file-copy-2-line copy"></i>
                <span></span>
            </div>

            <div className='passwordLength'>
                <label htmlFor="" className='bold'>Select the length of your PassWord :-</label>
                <input onChange={getValue} value={value} type="range" className='range' min={8} max={50} />
                <span className='sideColor'>{value}</span>
            </div>

            <div className='allCheckbox'>
                <input type="checkbox" onChange={getUpperTxt} /> <label htmlFor="">Include upper case</label>

                <input type="checkbox" onChange={getLowerTxt} /> <label htmlFor="">Include lower case</label>

                <input type="checkbox" onChange={getNumbersTxt} /> <label htmlFor="">Include numbers</label>

                <input type="checkbox" onChange={getSymbolsTxt} /> <label htmlFor="">Include symbols</label>

            </div>

            <div className="generateBtn">
                <button class="learn-more">
                    <span class="circle" aria-hidden="true">
                    <span class="icon arrow"></span>
                    </span>
                    <span onClick={clickBtn} class="button-text">Generate PassWord</span>
                </button>
            </div>
        </div>

    </div>
  )
}

export default PasswordGen
