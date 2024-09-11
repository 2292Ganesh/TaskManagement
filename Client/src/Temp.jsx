import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import { Final } from './Final'

export const Temp = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Final/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}
