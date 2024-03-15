import {Route,Routes,BroswerRouter} from "react-router-dom"

function App() {

  return (
    <div>
       <BroswerRouter>
       <Routes>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/sendmoney" element={<SendMoney/>}/>
     
       </Routes>
               </BroswerRouter>
    </div>
  )
}

export default App
