import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { RecoilRoot } from 'recoil'
import "./style/index.css"

ReactDOM.createRoot(document.getElementById('root')).render(
  <RecoilRoot>
    <App />
  </RecoilRoot>
)
