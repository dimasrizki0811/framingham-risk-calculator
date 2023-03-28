import React, { useEffect } from "react";
import { useState } from "react";
import "../style/form.css";

const FormInput = () => {
  //State
  const [sex, setSex] = useState("0")
  const [age, setAge] = useState(null)
  const [bpt, setBpt] = useState("0")
  const [sistol, setSistol] = useState("")
  const [cholesterol, setCholesterol] = useState("")
  const [hdl, setHdl] = useState("")
  const [smoker, setSmoker] = useState("0")
  const [result, setResult] = useState("")
  const [deathProp, setdeathProp] = useState("")

  // Convert Variable
  const countAge = Math.log(parseInt(age))
  const countCholesterol = Math.log(parseInt(cholesterol))
  const countHdl = Math.log(parseInt(hdl))
  const countSistol = Math.log(parseInt(sistol))

  // Ordinary variable
  let countResult;
  let countDeath;

    // merubah rumus sesuai jenis kelamin
    useEffect(() => {
      if (sex > 0){
        countResult  = ((31.76 * countAge) + (22.47 * countCholesterol) + (-1.19 * countHdl) + (2.55 * countSistol) + (0.42 * bpt) + (13.08 * smoker) + ((-5.06 * countAge) * countCholesterol) + (-3 * countAge * smoker)) - 146.59
        setResult(countResult.toFixed(2))
      }else{
        countResult  = ((52.01 * countAge) + (20.01 * countCholesterol) + (-0.91 * countHdl) + (1.31 * countSistol) + (0.24 * bpt) + (12.1 * smoker) + ((-4.61 * countAge) * countCholesterol) + (-2.84 * countAge * smoker) + (-2.93 * countAge * countAge)) - 172.30
        setResult(countResult.toFixed(2)) 
      }
    } )

    // Show death probability
    useEffect(() => {
      let expValue = Math.exp(result)
      let factor = Math.pow(0.9402,expValue)
      let percent = (1 - factor) * 100 
      countDeath = percent.toFixed(2)
      setdeathProp(countDeath)
    },[result])

    // Validation
    useEffect(() => {
      if (sistol < 30){
        document.getElementById('blodmin').style.display = ''
        document.getElementById('blodmax').style.display = 'none'
      }else if (sistol > 300){
        document.getElementById('blodmin').style.display = 'none'
        document.getElementById('blodmax').style.display = ''
      }else{
        document.getElementById('blodmin').style.display = 'none'
        document.getElementById('blodmax').style.display = 'none'
      }
    })
    useEffect(() => {
      if (cholesterol < 100){
        document.getElementById('colmin').style.display = ''
        document.getElementById('colmax').style.display = 'none'
      }else if (cholesterol > 900){
        document.getElementById('colmin').style.display = 'none'
        document.getElementById('colmax').style.display = ''
      }else{
        document.getElementById('colmin').style.display = 'none'
        document.getElementById('colmax').style.display = 'none'
      }
    })
    useEffect(()=> {
      if(isNaN(result)){
        document.getElementById('result').style.display = 'none'
        document.getElementById('death').style.display = 'none'
      }else{
        document.getElementById('result').style.display = ''
        document.getElementById('death').style.display = ''
      }
    })
    useEffect(() => {
      if (hdl < 1){
        document.getElementById('hdlmin').style.display = ''
        document.getElementById('hdlmax').style.display = 'none'
      }else if (hdl > 150){
        document.getElementById('hdlmin').style.display = 'none'
        document.getElementById('hdlmax').style.display = ''
      }else{
        document.getElementById('hdlmin').style.display = 'none'
        document.getElementById('hdlmax').style.display = 'none'
      }
    })
    useEffect(() => {
      if (age < 30){
        document.getElementById('age').style.display = ''
      }else if (age > 79){
        document.getElementById('age').style.display = ''
      }else{
        document.getElementById('age').style.display = 'none'
      }
    })

    


  
  return (
    <>
    <div className="container">
      <div className="container h3 mt-3 mb-3 text-center text-white">
      <div className="h2">Framingham Risk Calculator</div>
      </div>
      <table className="table table-performance b">
        <tbody>

         <tr>
            <td>Age</td>
            <td></td>
            <td align="right">
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                min="30"
              />
              Years
            </td>
          </tr>
              <div id="age" className="text-danger">Min age is 30 and Max age is 79</div>

          <tr>
            <td>Sex</td>
            <td></td>
            <td>
            <select
                className="form-select select-sm"
                aria-label="Default select example"
                id="sex"
                value={sex}
                onChange={(e) => setSex(e.target.value)}
              >
                <option value="0">Male</option>
                <option value="1">Female</option>
              </select>
            </td>
          </tr>

          <tr>
            <td>Blood preassure treatment?</td>
            <td></td>
            <td>
              <select
                className="form-select select-sm"
                aria-label="Default select example"
                id="bpt"
                value={bpt}
                onChange={(e) => setBpt(e.target.value)}
              >
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </td>
          </tr>

          <tr>
            <td>Systolic blood preassure</td>
            <td></td>
            <td align="right">
              <input
                type="number"
                value={sistol}
                onChange={(e) => setSistol(e.target.value)}
              />
              mmHg
            </td>
          </tr>
          <div id="blodmin" className="text-danger">Blood Preassure must be greater than or equal to 30mmHg</div>
          <div id="blodmax" className="text-danger">Blood Preassure cannot exceed 300mmHg</div>

          <tr>
            <td>Total cholesterol</td>
            <td></td>
            <td align="right">
              <input
                type="number"
                value={cholesterol}
                onChange={(e) => setCholesterol(e.target.value)}
              />
              mg/dL
            </td>
          </tr>
          <div id="colmin" className="text-danger">Must be greater than or equal to 100 mg/dL</div>
          <div id="colmax" className="text-danger">Cannot exceed 900 mg/dL</div>

          <tr>
            <td>HDL cholesterol</td>
            <td></td>
            <td align="right">
              <input
                type="number"
                value={hdl}
                onChange={(e) => setHdl(e.target.value)}
              />
              mg/dL
            </td>
          </tr>
          <div id="hdlmin" className="text-danger">Must be greater than or equal to 1 mg/dL</div>
          <div id="hdlmax" className="text-danger">Cannot exceed 150 mg/dL</div>
          <tr>
            <td>Smoker</td>
            <td></td>
            <td>
            <select
                className="form-select select-sm"
                aria-label="Default select example"
                id="sex"
                value={smoker}
                onChange={(e) => setSmoker(e.target.value)}
              >
                <option value="0">No</option>
                <option value="1">Smoker</option>
              </select>
            </td>
          </tr>

        </tbody>
      </table>

      <table className="table table-performance b">
        <tbody>

      <tr className="bottom-result">
        <td colSpan={2}>
          <div className="title">Result</div>
        </td>
      </tr>
      <tr>
        <td>Risk Score</td>
        <td align="right"><span id="result">{result}</span> Pts</td>
      </tr>
      <tr>
        <td>Calculated 10-year risk of death due to myocardial infarction or coronary death:</td>
        <td align="right"><span id="death">{deathProp}</span> %</td>
      </tr>
        </tbody>
      </table>
      </div>
    </>
  );
};

export default FormInput;
