import Transaction from "./components/Transaction";
import FormComponent from "./components/FormComponent";
import DataContext from "./data/DataContext";
import ReportComponent from "./components/ReportComponent"
import './App.css'
import { useState, useEffect, useReducer } from "react";
import { BrowserRouter as Router,Switch,Route,Link } from "react-router-dom";


function App() {
  const design = {color:"red",textAlign:"center",fontSize:'1.5rem'}
  const [items,setItems] = useState([])

  const [reportIncome,setReportIncome] = useState(0)
  const [reportExpense,setReportExpense] = useState(0)
  const onAddNewItem = (newItem)=>{
      setItems((prevItem)=>{
        return [newItem,...prevItem]
      })
  }
  useEffect(() => {
      const amounts = items.map(items => items.amount)
      const income = amounts.filter(element => element>0).reduce((result,element)=> result+=element,0)
      const expense = (amounts.filter(element => element<0).reduce((result,element)=> result+=element,0))*-1

      setReportIncome(income.toFixed(2))
      setReportExpense(expense.toFixed(2))
  },[items,reportIncome,reportExpense])

  const [showReport, setShowReport] = useState(true)
  const reducer = (_,action)=> {
    switch(action.type){
      case "SHOW" :
        return setShowReport(true)
      case "HIDE" :
        return setShowReport(false)
    }
  }

  const formatNumber=(num)=>{
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1,')
}

  const [,dispatch] = useReducer(reducer,showReport)
  return (
      <DataContext.Provider value={
        {
          income: reportIncome,
          expense: reportExpense
        }
      }>
        <div className="container">
          <h1 style={design}>แอพบัญชีรายรับ - รายจ่าย</h1>
          <Router>
            <div>
              <ul className="horizontal-menu">
                <li>
                  <Link to="/">ข้อมูลบัญชี</Link>
                </li>
                <li>
                  <Link to="/insert">บันทึกข้อมูล</Link>
                </li>
              </ul>
              <Switch>
                <Route path="/" exact>
                  <ReportComponent formatNumber={formatNumber}/>
                </Route>
                <Route path="/insert">
                  <FormComponent onAddItem={onAddNewItem}/>
                  <div className="show-hide">
                    <button onClick={()=>dispatch({type:"SHOW"})}>แสดง</button>
                    <button onClick={()=>dispatch({type:"HIDE"})}>ซ่อน</button>
                  </div>
                  {showReport && <Transaction items = {items} formatNumber={formatNumber} />}
                </Route>
              </Switch>
            </div>
          </Router>
        </div>  
      </DataContext.Provider>
  );
}

export default App;
