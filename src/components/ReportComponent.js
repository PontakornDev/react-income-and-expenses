import { useContext } from "react"
import DataContext from "../data/DataContext"
import './ReportComponent.css'

const ReportComponent =(props) => {
    const {income, expense} = useContext(DataContext)
    
    return(
        <div>
            <div className="report-result">
                <h4>ยอดคงเหลือ (บาท)</h4>
                <h1>฿{props.formatNumber((income - expense).toFixed(2))}</h1>
            </div>
            <div className="report-container">
                <div>
                    <h4>ยอดรายรับ</h4>
                    <p className="report plus">฿{props.formatNumber(income)}</p>
                </div>
                <div>
                    <h4>ยอดรายจ่าย</h4>
                    <p className="report minus">฿{props.formatNumber(expense)}</p>
                </div>
            </div>
        </div>
    )
}

export default ReportComponent